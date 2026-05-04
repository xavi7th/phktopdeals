export { startAdminOrderMgmtTour } from "./adminOrderMgmt";
export { startAdminProductMgmtTour } from "./adminProductMgmt";
export { startBrowseProductsTour } from "./browseProducts";
export { startLoginTour } from "./login";
export { startPurchaseProductTour } from "./purchaseProduct";
export { startOrderHistoryTour } from "./orderHistory";
export { startWalletTopupTour } from "./walletTopup";
export { startWishlistTour } from "./wishlist";
export { startBulkOrderTour } from "./bulkOrder";
export { startVerifyAccountTour } from "./verifyAccount";
export { startAdminDashboardTour } from "./adminDashboard";
export { startChatInboxTour } from "./chatInbox";
export { startUserTransactionsTour } from "./userTransactions";
export { startCartCheckoutTour } from "./cartCheckout";

export const customerTours = [
  { id: "login", label: "Login & Register", start: startLoginTour },
  { id: "browse-products", label: "Browse Products", start: startBrowseProductsTour },
  { id: "purchase-product", label: "Purchase Product", start: startPurchaseProductTour },
  { id: "order-history", label: "Order History", start: startOrderHistoryTour },
  { id: "wallet-topup", label: "Wallet Top-up", start: startWalletTopupTour },
  { id: "wishlist", label: "Wishlist", start: startWishlistTour },
  { id: "bulk-order", label: "Bulk Order", start: startBulkOrderTour },
  { id: "verify-account", label: "Verify Account", start: startVerifyAccountTour },
  { id: "cart-checkout", label: "Cart & Checkout", start: startCartCheckoutTour },
  { id: "user-transactions", label: "Transactions", start: startUserTransactionsTour },
];

export const staffTours = [
  { id: "admin-dashboard", label: "Admin Dashboard", start: startAdminDashboardTour },
  { id: "admin-product-mgmt", label: "Product Management", start: startAdminProductMgmtTour },
  { id: "admin-order-mgmt", label: "Order Management", start: startAdminOrderMgmtTour },
  { id: "chat-inbox", label: "Chat Inbox", start: startChatInboxTour },
];
