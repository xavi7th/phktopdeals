import { api } from "$lib/helpers";

export async function load(event) {
  const fetchWalletBalance = async () => {
    const res = await api({
      method: "get",
      resource: "user/wallet-balance",
      event,
    });
    return await res?.json();
  };

  const [details] = await Promise.all([fetchWalletBalance()]);

  return {
    user: event.locals.session.data?.user,
    wallet_balance: details.data?.wallet_balance,
  };
}
