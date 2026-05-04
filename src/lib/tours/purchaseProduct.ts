import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="denomination-grid"]',
    popover: { title: "Choose denomination", description: "Pick the voucher denomination you want to purchase.", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="email-input"]',
    popover: { title: "Enter recipient email", description: "The voucher code will be sent to this email address.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="quantity-input"]',
    popover: { title: "Set quantity", description: "Choose how many units to purchase.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="add-to-cart-btn"]',
    popover: { title: "Add to cart", description: "Add this item to your cart before paying.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="pay-with-wallet-btn"]',
    popover: { title: "Pay with wallet", description: "Use your wallet balance to complete the purchase instantly.", side: "top", align: "start" },
  },
];

export function startPurchaseProductTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
