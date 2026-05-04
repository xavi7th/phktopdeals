export { startPurchaseProductTour } from './purchaseProduct';
export { startOrderHistoryTour } from './orderHistory';
export { startWalletTopupTour } from './walletTopup';
export { startWishlistTour } from './wishlist';
export { startBulkOrderTour } from './bulkOrder';
export { startVerifyAccountTour } from './verifyAccount';
export { startAdminDashboardTour } from './adminDashboard';
export { startChatInboxTour } from './chatInbox';

export const customerTours = [
  { id: 'purchase-product', label: 'Purchase Product', start: startPurchaseProductTour },
  { id: 'order-history', label: 'Order History', start: startOrderHistoryTour },
  { id: 'wallet-topup', label: 'Wallet Top-up', start: startWalletTopupTour },
  { id: 'wishlist', label: 'Wishlist', start: startWishlistTour },
  { id: 'bulk-order', label: 'Bulk Order', start: startBulkOrderTour },
  { id: 'verify-account', label: 'Verify Account', start: startVerifyAccountTour },
];

export const staffTours = [
  { id: 'admin-dashboard', label: 'Admin Dashboard', start: startAdminDashboardTour },
  { id: 'chat-inbox', label: 'Chat Inbox', start: startChatInboxTour },
];
