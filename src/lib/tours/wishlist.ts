import { driver, type DriveStep } from 'driver.js';

const steps: DriveStep[] = [
  {
    element: '[data-tour="wishlist-header"]',
    popover: { title: 'Your wishlist', description: 'Products you save here can be purchased later.', side: 'bottom', align: 'start' },
  },
  {
    element: '[data-tour="add-wishlist-btn"]',
    popover: { title: 'Add to wishlist', description: 'Save a product to your wishlist for future purchase.', side: 'left', align: 'start' },
  },
  {
    element: '[data-tour="wishlist-item-card"]',
    popover: { title: 'Manage saved items', description: 'Purchase now or remove items from your wishlist.', side: 'top', align: 'start' },
  },
];

export function startWishlistTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
