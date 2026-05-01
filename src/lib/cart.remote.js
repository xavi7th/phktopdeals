/**
 * cart.remote.js
 *
 * SvelteKit remote functions for cart server-side operations.
 * Always runs on the server — safe to import $lib/server modules.
 *
 * Requires svelte.config.js:
 *   kit.experimental.remoteFunctions: true
 *   compilerOptions.experimental.async: true
 */

import { command, getRequestEvent } from "$app/server";
import { api } from "$lib/server/api-helpers";

/**
 * Merge guest cart items (from localStorage) into the auth user's DB cart.
 * Called after login via cartStore.mergeOnLogin().
 *
 * Uses 'unchecked' schema — input is trusted (our own localStorage) and the
 * backend validates each item before persisting it.
 *
 * Uses batch endpoint (POST /api/v1/cart/batch) to send all items in a
 * single request, avoiding N separate HTTP calls and potential rate limiting.
 * Falls back to individual requests if batch endpoint fails.
 *
 * @param {Array<{ product_id: string, unit_price: number, quantity: number }>} items
 * @returns {{ success: boolean, failed: Array, error: string|null }}
 */
export const mergeGuestCart = command("unchecked", async (items) => {
  if (!Array.isArray(items) || items.length === 0) return { success: true, failed: [], error: null };

  const event = getRequestEvent();
  const results = { success: true, failed: [], error: null };

  // Try batch endpoint first (single request for all items)
  try {
    const res = await api({
      method: "post",
      resource: "cart/batch",
      data: { items },
      event,
    });

    if (res?.ok) {
      return results;
    }

    // Batch failed — log and fall through to individual requests
    console.error("Batch merge failed, falling back to individual requests");
  } catch (e) {
    console.error("Batch merge error:", e);
  }

  // Fallback: individual requests with error tracking
  const settled = await Promise.allSettled(
    items.map((item) =>
      api({
        method: "post",
        resource: "cart",
        data: {
          product_id: item.product_id,
          unit_price: item.unit_price,
          quantity: item.quantity,
        },
        event,
      }),
    ),
  );

  // Collect failures
  settled.forEach((result, idx) => {
    if (result.status === "rejected" || !result.value?.ok) {
      results.success = false;
      results.failed.push({
        product_id: items[idx].product_id,
        error: result.reason?.message || "Failed to add item",
      });
    }
  });

  if (!results.success) {
    results.error = `${results.failed.length} item(s) could not be added to your cart.`;
  }

  return results;
});

/**
 * Add an item to the auth user's DB cart, or return guest data for localStorage.
 *
 * Auth users: POST to backend /api/v1/cart
 * Guests: return product data so the client can call cartStore.guestAdd()
 *
 * @param {{ product_id: string, unit_price: number, quantity: number, product_name?: string, product_image_url?: string }} item
 * @returns {{ success: boolean, cartAction: "added" | "guest", message?: string }}
 */
export const addToCart = command("unchecked", async (item) => {
  const event = getRequestEvent();
  const user = event.locals.session.data?.user;

  // Guest: return data for client-side localStorage handling
  if (!user?.email) {
    return {
      success: true,
      cartAction: "guest",
      product_id: item.product_id,
      unit_price: item.unit_price,
      quantity: item.quantity,
      product_name: item.product_name || "",
      product_image_url: item.product_image_url || "",
    };
  }

  // Auth user: POST to the cart API
  const res = await api({
    method: "post",
    resource: "cart",
    data: {
      product_id: item.product_id,
      unit_price: item.unit_price,
      quantity: item.quantity,
    },
    event,
  });

  if (!res?.ok) {
    const errRes = await res.json().catch(() => ({}));
    throw new Error(errRes?.metadata?.message || "Could not add item to cart.");
  }

  return { success: true, cartAction: "added", message: "Item added to your cart!" };
});
