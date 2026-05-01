import { api } from "$lib/server/api-helpers";

export async function load(event) {
  const isAuthenticated = !!event.locals.session.data?.user?.email;

  const fetchWalletBalance = async () => {
    if (event.locals.session.data?.user?.is_admin) {
      return await new Promise((r) => setTimeout(() => r({ data: { wallet_balance: 0 } }), 2000));
    }

    const res = await api({
      method: "get",
      resource: "user/wallet-balance",
      event,
    });

    if (!res?.ok) {
      return { data: { wallet_balance: null }, error: true };
    }

    return await res?.json();
  };

  const fetchCartCount = async () => {
    // Only fetch for authenticated, non-admin users
    if (!isAuthenticated || event.locals.session.data?.user?.is_admin) {
      return 0;
    }

    const res = await api({
      method: "get",
      resource: "cart",
      event,
    });

    if (!res?.ok) return 0;

    const data = await res.json().catch(() => ({}));
    return data?.metadata?.total ?? 0;
  };

  const [details, cartCount] = await Promise.all([fetchWalletBalance(), fetchCartCount()]);

  return {
    user: event.locals.session.data?.user,
    wallet_balance: details.data?.wallet_balance,
    // Auth users: server-fetched count; Guests: 0 (client will update from localStorage)
    cart_count: isAuthenticated ? (cartCount ?? 0) : 0,
    isAuthenticated,
  };
}
