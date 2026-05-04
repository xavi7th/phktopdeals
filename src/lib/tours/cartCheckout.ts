import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="cart-items"]',
    popover: { title: "Cart items", description: "Review items in your cart. Update quantity or remove items.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="quantity-select"]',
    popover: { title: "Change quantity", description: "Use the dropdown to change how many units you want.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="remove-item-btn"]',
    popover: { title: "Remove item", description: "Remove an item from your cart entirely.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="order-summary"]',
    popover: { title: "Order summary", description: "See subtotal, wallet balance, and total before checking out.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="checkout-btn"]',
    popover: { title: "Proceed to checkout", description: "Complete your purchase using your wallet balance.", side: "top", align: "start" },
  },
];

export function startCartCheckoutTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
