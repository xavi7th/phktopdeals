import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="payment-method-select"]',
    popover: { title: "Choose payment method", description: "Pick Manual Bank Deposit or Online Payment (Paystack).", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="process-payment-btn"]',
    popover: { title: "Proceed to payment", description: "Click to open the payment modal and complete your top-up.", side: "top", align: "start" },
  },
];

export function startWalletTopupTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
