/**
 * cartStore.js
 *
 * Manages cart state for PHK Hot Deals.
 *
 * Auth users:   cart lives in the DB (loaded via server in +page.server.js).
 *               The store is initialized from server-loaded data.
 *               Mutations use SvelteKit form actions (see +page.server.js).
 *               After each mutation, the layout re-fetches cart count automatically
 *               because SvelteKit calls invalidateAll() on form action success.
 *
 * Guest users:  cart lives in localStorage (key: 'phk_guest_cart').
 *               Store is initialized from localStorage on page load.
 *               Mutations update localStorage and the store in sync.
 *               Guests cannot checkout — they see a "Login to checkout" prompt.
 *
 * Guest→Auth Merge: When a guest logs in, call cartStore.mergeOnLogin()
 *               to sync localStorage items to DB cart and clear localStorage.
 *
 * Usage (in a Svelte component):
 *   import { cartStore, cartCount, cartTotal } from '$stores/cartStore.js';
 *
 *   // Initialize for auth user (pass server-loaded items):
 *   onMount(() => cartStore.initialize(data.cartItems));
 *
 *   // Initialize for guest (pass no argument):
 *   onMount(() => cartStore.initialize());
 *
 *   // Reactive: $cartCount, $cartTotal
 */

import { writable, derived } from "svelte/store";
import { browser } from "$app/environment";
import { mergeGuestCart } from "$lib/cart.remote.js";

const GUEST_CART_KEY = "phk_guest_cart";

function createCartStore() {
  const { subscribe, set, update } = writable({ items: [], loading: false });

  // ─── Private helpers (localStorage) ───────────────────────────────

  function _readStorage() {
    if (!browser) return [];
    try {
      const raw = localStorage.getItem(GUEST_CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function _writeStorage(items) {
    if (!browser) return;
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  }

  // ─── Public API ────────────────────────────────────────────────────

  return {
    subscribe,

    /**
     * Initialize the store.
     * @param {Array|undefined} serverItems
     *   - Pass server-fetched items array for auth users.
     *   - Pass nothing (or undefined) for guests → loads from localStorage.
     */
    initialize(serverItems) {
      if (Array.isArray(serverItems)) {
        // Auth user: trust server data
        set({ items: serverItems, loading: false });
      } else {
        // Guest: load from localStorage (only in browser)
        set({ items: _readStorage(), loading: false });
      }
    },

    /**
     * Sync store with new server data after a form action completes.
     * Called from +page.svelte after invalidateAll() re-runs the load function.
     * @param {Array} items - Fresh items from the server.
     */
    syncFromServer(items) {
      set({ items: Array.isArray(items) ? items : [], loading: false });
    },

    /**
     * Merge guest cart into DB cart after login.
     * Reads localStorage, calls the mergeGuestCart remote function (server-side),
     * which uses the api() helper with the current session cookie to POST items to
     * the backend cart API. Clears localStorage on success.
     *
     * Uses a SvelteKit remote function (command) from $lib/cart.remote.js so that
     * the api() helper (server-only) runs on the server — no CSRF token handling
     * needed on the client side.
     *
     * @returns {Promise<boolean>} - True if merge completed
     */
    async mergeOnLogin() {
      if (!browser) return false;
      const guestItems = _readStorage();
      if (guestItems.length === 0) return true;

      update((state) => ({ ...state, loading: true }));

      try {
        const result = await mergeGuestCart(guestItems);
        _writeStorage([]);
        update((state) => ({ ...state, loading: false }));

        if (!result.success) {
          console.warn("Some items failed to merge:", result.failed);
          // Items that failed can be re-attempted by the user
        }

        return result.success;
      } catch (e) {
        console.error("Failed to merge guest cart:", e);
        update((state) => ({ ...state, loading: false }));
        return false;
      }
    },

    /**
     * Clear expired guest cart items (older than 7 days).
     * Call this periodically or on store initialization.
     * Match OpenCode review suggestion of 7-day TTL.
     */
    clearExpiredItems() {
      if (!browser) return;
      const items = _readStorage();
      const now = Date.now();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      const validItems = items.filter((item) => {
        if (!item.addedAt) return true; // No timestamp, keep it
        return now - new Date(item.addedAt).getTime() < sevenDays;
      });
      if (validItems.length !== items.length) {
        _writeStorage(validItems);
      }
    },

    // ─── Guest-only mutations (localStorage) ────────────────────────

    /**
     * Add or update an item in the guest cart (localStorage).
     * @param {{ product_id: string, product_name: string, product_image_url: string, unit_price: number, quantity: number }} item
     */
    guestAdd(item) {
      update((state) => {
        const idx = state.items.findIndex((i) => i.product_id === item.product_id && i.unit_price === item.unit_price);
        let items;
        if (idx >= 0) {
          items = state.items.map((i, index) => (index === idx ? { ...i, quantity: i.quantity + item.quantity } : i));
        } else {
          items = [
            ...state.items,
            {
              id: crypto.randomUUID(),
              product_id: item.product_id,
              product_name: item.product_name,
              image_url: item.product_image_url || "",
              unit_price: item.unit_price,
              quantity: item.quantity,
              subtotal: item.unit_price * item.quantity,
              addedAt: new Date().toISOString(), // For TTL cleanup
            },
          ];
        }
        _writeStorage(items);
        return { ...state, items };
      });
    },

    /**
     * Remove a guest cart item by its localStorage UUID.
     * @param {string} id
     */
    guestRemove(id) {
      update((state) => {
        const items = state.items.filter((i) => i.id !== id);
        _writeStorage(items);
        return { ...state, items };
      });
    },

    /**
     * Update quantity for a guest cart item.
     * @param {string} id
     * @param {number} quantity
     */
    guestUpdateQty(id, quantity) {
      update((state) => {
        const items = state.items.map((i) => (i.id === id ? { ...i, quantity, subtotal: i.unit_price * quantity } : i));
        _writeStorage(items);
        return { ...state, items };
      });
    },

    /**
     * Clear the guest cart from localStorage and store.
     */
    guestClear() {
      _writeStorage([]);
      set({ items: [], loading: false });
    },
  };
}

export const cartStore = createCartStore();

/** Reactive total item count (sum of all quantities). */
export const cartCount = derived(cartStore, ($cart) => $cart.items.reduce((total, item) => total + item.quantity, 0));

/** Reactive total price (sum of unit_price * quantity for all items). */
export const cartTotal = derived(cartStore, ($cart) => $cart.items.reduce((total, item) => total + Number(item.unit_price) * item.quantity, 0));
