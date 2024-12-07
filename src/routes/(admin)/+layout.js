export async function load() {
  /** @type { import('$lib/types').AdminNavMenuItem[] } */
  const admin_routes = [
    {
      name: "Dashboard",
      uri: "/admin/dashboard",
      icon: "homeSVG",
      reload: false,
    },
    {
      name: "All Products",
      uri: "/admin/product",
      icon: "productSVG",
      reload: false,
    },
    {
      name: "Voucher Management",
      uri: "/admin/vouchers",
      icon: "topUpSVGAlt",
      reload: false,
    },
    {
      name: "Brands",
      uri: "/admin/brands",
      icon: "eSimSVG",
      reload: false,
    },
    {
      name: "E-Sim",
      uri: "/admin/e-sim",
      icon: "eSimSVG",
      reload: false,
    },
    {
      name: "Games",
      uri: "/admin/games",
      icon: "gamesSVGAlt",
      reload: false,
    },
    {
      name: "Gift Cards",
      uri: "/admin/gift-card",
      icon: "giftCardSVGAlt",
      reload: false,
    },
    {
      name: "Top Up",
      uri: "/admin/top-up",
      icon: "topUpSVGAlt",
      reload: false,
    },
    {
      name: "Email Templates",
      uri: "/admin/emails",
      icon: "topUpSVGAlt",
      reload: false,
    },
    {
      name: "Users",
      uri: "/admin/users",
      icon: "usersSVG",
      reload: false,
    },
  ];

  return { admin_routes };
}
