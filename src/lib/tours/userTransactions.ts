import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="transaction-list"]',
    popover: { title: "Transaction history", description: "View all wallet top-up transactions with amounts and timestamps.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="top-up-link"]',
    popover: { title: "Top up wallet", description: "Add funds to your wallet using bank transfer or online payment.", side: "left", align: "start" },
  },
];

export function startUserTransactionsTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
