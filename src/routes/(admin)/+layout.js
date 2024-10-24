/** @type {import('./$types').LayoutLoad} */
export async function load () {

  /** @type { import('$lib/types').AdminNavMenuItem[] } */
  const admin_routes = [
    {
      name: 'Dashboard',
      uri: '/admin/dashboard',
      icon: 'homeSVG',
    },
    {
      name: 'Product',
      uri: '/admin/product',
      icon: 'productSVG',
    },
    {
      name: 'E-Sim',
      uri: '/admin/e-sim',
      icon: 'eSimSVG',
    },
    {
      name: 'Games',
      uri: '/admin/games',
      icon: 'gamesSVGAlt',
    },
    {
      name: 'Gift Cards',
      uri: '/admin/gift-card',
      icon: 'giftCardSVGAlt',
    },
    {
      name: 'Top Up',
      uri: '/admin/top-up',
      icon: 'topUpSVGAlt',
    },
    {
      name: 'Users',
      uri: '/admin/users',
      icon: 'usersSVG',
    },
  ]

  return { admin_routes };
}
