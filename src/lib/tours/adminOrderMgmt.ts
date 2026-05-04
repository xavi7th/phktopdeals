import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="order-list"]',
    popover: { title: "Order list", description: "Browse all orders. Use cursor pagination to load more.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="order-search"]',
    popover: { title: "Search orders", description: "Search by order ID or customer email.", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="archived-orders-link"]',
    popover: { title: "Archived orders", description: "View orders that have expired or been archived.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="order-details-link"]',
    popover: { title: "View order details", description: "Click any order to see full transaction and customer details.", side: "left", align: "start" },
  },
];

export function startAdminOrderMgmtTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
