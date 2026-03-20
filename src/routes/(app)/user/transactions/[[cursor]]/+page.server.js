import { api } from "$lib/helpers";

export async function load(event) {
  const fetchWalletBalance = async () => {
    const res = await api({
      method: "get",
      resource: "user/wallet-balance",
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: { wallet_balance: null }, apiError: true };
    }

    return await res.json();
  };

  const fetchTopUpTransactions = async () => {
    const res = await api({
      method: "get",
      resource: "user-transactions?cursor=" + event.params.cursor,
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [details] = await Promise.all([fetchWalletBalance()]);

  return {
    wallet_balance: details.data?.wallet_balance,
    transactions: fetchTopUpTransactions(),
    redirectStatus: event.url.searchParams.get("status"),
    apiError: details.apiError,
  };
}
