/** @type {import('./$types').LayoutServerLoad} */
export async function load ( { locals } ) {

  /** @type { import('$lib/types').AdminNavMenuItem[] } */
  const user_routes = [
    {
        name: 'My Order',
        description: 'View and track your purchases',
        uri: '/user/order',
        icon: 'shoppingBagSVG',
    },
    {
        name: 'Wallet',
        description: 'Monitor your transactions',
        uri: '/user/wallet',
        icon: 'walletSVG',
    },
    {
        name: 'Wishlists',
        description: 'Track your desired items',
        uri: '/user/wishlist',
        icon: 'heartSVG',
    },
    {
        name: 'Referrals',
        description: 'Invite friends and track rewards',
        uri: '/user/referrals',
        icon: 'shareSVG',
    },
    {
        name: 'Redeem Balance Card',
        description: 'Top-up your balance wallet',
        uri: '/user/wishlist',
        icon: 'creditCardSVG',
    },
    {
        name: 'Bulk Order',
        description: 'Quick Bulk Purchase Submission',
        uri: '/user/bulk-order',
        icon: 'dollarCircleSVG',
    },
    {
        name: 'Verify Account',
        description: 'Submit for unrestricted shopping',
        uri: '/user/verify-account',
        icon: 'shieldTickSVG',
    },
    {
        name: 'Settings',
        description: 'Personalize your preferences',
        uri: '/user/settings',
        icon: 'gearsSVG',
    },
  ]

  return {
    /** @type { import('$lib/types').AppUser } */
    user: locals.user,
    user_routes
   };
}
