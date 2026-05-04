import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="order-tabs"]',
    popover: { title: "Filter by status", description: "Click a tab to filter orders by All, Processing, Finished, or Expired.", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="order-list"]',
    popover: { title: "Browse orders", description: "View your past orders with payment details and status.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="voucher-link"]',
    popover: { title: "View voucher codes", description: "Click to see the voucher codes for a processed order.", side: "left", align: "start" },
  },
];

export function startOrderHistoryTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
