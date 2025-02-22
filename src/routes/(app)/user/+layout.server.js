import { api } from '$lib/helpers';

export async function load(event) {
  /** @type { import('$lib/types').AdminNavMenuItem[] } */
  const user_routes = [
    {
      name: "My Orders",
      description: "View and track your purchases",
      uri: "/user/orders",
      icon: "shoppingBagSVG",
      reload: false,
    },
    {
      name: "Wallet",
      description: "Monitor your transactions",
      uri: "/user/wallet",
      icon: "walletSVG",
      reload: true,
    },
    // {
    //     name: 'Wishlists',
    //     description: 'Track your desired items',
    //     uri: '/user/wishlist',
    //     icon: 'heartSVG',
    // },
    // {
    //     name: 'Referrals',
    //     description: 'Invite friends and track rewards',
    //     uri: '/user/referrals',
    //     icon: 'shareSVG',
    // },
    // {
    //     name: 'Redeem Balance Card',
    //     description: 'Top-up your balance wallet',
    //     uri: '/user/wishlist',
    //     icon: 'creditCardSVG',
    // },
    // {
    //     name: 'Bulk Order',
    //     description: 'Quick Bulk Purchase Submission',
    //     uri: '/user/bulk-order',
    //     icon: 'dollarCircleSVG',
    // },
    // {
    //     name: 'Verify Account',
    //     description: 'Submit for unrestricted shopping',
    //     uri: '/user/verify-account',
    //     icon: 'shieldTickSVG',
    // },
    {
      name: "Gift Cards",
      description: "Variety of Gift Cards",
      uri: "/store/products/gift-card",
      icon: "giftCardSVGAlt",
      reload: true,
    },
    {
      name: "eSims",
      description: "Purchase your global e-sims",
      uri: "/store/products/eSims",
      icon: "eSimSVG",
      reload: true,
    },
    {
      name: "Top Up",
      description: "Purchase your top up cards",
      uri: "/store/products/top-up",
      icon: "topUpSVGAlt",
      reload: true,
    },
    {
      name: "Settings",
      description: "Personalize your preferences",
      uri: "/user/settings",
      icon: "gearsSVG",
      reload: false,
    },
  ];

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
    /** @type { import('$lib/types').AppUser } */
    user: event.locals.session.data?.user || {},
    user_routes,
    wallet_balance: details.data?.wallet_balance,
  };
}
