import { api } from "$lib/server/api-helpers";
import { setFlash, redirect } from "sveltekit-flash-message/server";
import { fail } from "@sveltejs/kit";

export async function load(event) {
  const user = event.locals.session.data?.user;

  // Guests: no server cart. Show empty state with login prompt.
  if (!user?.email) {
    return {
      user: null,
      cartItems: [],
      cartTotal: 0,
      walletBalance: 0,
      isGuest: true,
    };
  }

  const fetchCart = async () => {
    const res = await api({ method: "get", resource: "cart", event });
    if (!res?.ok) return { data: [], metadata: { total: 0 } };
    return await res.json().catch(() => ({ data: [], metadata: { total: 0 } }));
  };

  const fetchWallet = async () => {
    if (user.is_admin) return 0;
    const res = await api({ method: "get", resource: "user/wallet-balance", event });
    if (!res?.ok) return 0;
    const json = await res.json().catch(() => ({}));
    return json?.data?.wallet_balance ?? 0;
  };

  const [cart, walletBalance] = await Promise.all([fetchCart(), fetchWallet()]);

  const cartItems = cart.data ?? [];

  // Re-verify: detect items whose price/denomination is no longer valid.
  // Shows a warning on the cart page so the user can remove+re-add before checkout.
  // The backend CheckoutCartRequest also validates this — this is UI-only feedback.
  const recalculatedItems = cartItems.map((item) => {
    if (!item.product) return item;

    const denominations = item.product.price_denominations ?? [];
    const unitPrice = Number(item.unit_price);
    const minPrice = Number(item.product.product_min_price || 0);

    // For variable-denomination products: price is valid if >= product_min_price.
    // For fixed-denomination products: price is valid if still in the denominations list.
    const isStillValid = item.product.type === "variable" ? unitPrice >= minPrice : denominations.includes(unitPrice);

    return {
      ...item,
      price_changed: !isStillValid,
    };
  });

  // Calculate total using stored prices — always use item.unit_price.
  // The backend will reject changed prices at checkout; frontend just warns the user.
  const cartTotal = recalculatedItems.reduce((sum, item) => {
    return sum + Number(item.unit_price) * item.quantity;
  }, 0);

  return {
    user,
    cartItems: recalculatedItems,
    cartTotal,
    walletBalance,
    isGuest: false,
  };
}

export const actions = {
  // Remove a single cart item by its obfuscated ID
  removeItem: async (event) => {
    const data = await event.request.formData();
    const itemId = data.get("item_id");

    if (!itemId) return { success: false };

    await api({
      method: "delete",
      resource: `cart/${itemId}`,
      event,
    });

    // No redirect — page re-loads with updated data via invalidateAll in enhance
    return { success: true, action: "removed" };
  },

  // Update quantity of a specific cart item
  updateQty: async (event) => {
    const data = await event.request.formData();
    const itemId = data.get("item_id");
    const quantity = Number(data.get("quantity"));

    if (!itemId || quantity < 1) return { success: false };

    const res = await api({
      method: "patch",
      resource: `cart/${itemId}`,
      data: { quantity },
      event,
    });

    return { success: res?.ok ?? false, action: "updated" };
  },

  // Clear all cart items
  clearCart: async (event) => {
    await api({ method: "delete", resource: "cart", event });
    return { success: true, action: "cleared" };
  },

  // Checkout all cart items
  checkout: async (event) => {
    const res = await api({
      method: "post",
      resource: "cart/checkout",
      event,
    });

    if (res?.status === 503) {
      setFlash({ type: "error", msg: "Service temporarily unavailable. Please try again." }, event);
      return fail(503, { checkoutError: true });
    }

    if (!res?.ok) {
      const errRes = await res.json().catch(() => ({}));
      const msg = errRes?.errors?.wallet?.[0] || errRes?.errors?.cart?.[0] || errRes?.metadata?.message || "Checkout failed. Please try again.";
      setFlash({ type: "error", msg }, event);
      return fail(res?.status || 422, { checkoutError: true, errorMsg: msg });
    }

    const resJson = await res.json();
    const itemCount = resJson?.metadata?.total_items ?? 0;

    await event.locals.session.update(async () => ({ recently_purchased: resJson }));

    redirect("/store/successful", { type: "success", msg: resJson?.metadata?.message || `${itemCount} item(s) purchased successfully!` }, event.cookies);
  },
};
