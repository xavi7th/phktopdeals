import { api } from "$lib/server/api-helpers";

export async function load(event) {
  const fetchWalletBalance = async () => {
    if (event.locals.session.data?.user?.is_admin) {
      return await new Promise((r) => setTimeout(() => r({ data: { wallet_balance: 0 } }), 2000));
    }

    const res = await api({
      method: "get",
      resource: "user/wallet-balance",
      event,
    });

    // Handle API unavailable - return null balance instead of throwing
    if (!res?.ok) {
      return { data: { wallet_balance: null }, error: true };
    }

    return await res?.json();
  };

  const [details] = await Promise.all([fetchWalletBalance()]);

  return {
    user: event.locals.session.data?.user,
    wallet_balance: details.data?.wallet_balance,
  };
}
