import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="verify-step-indicator"]',
    popover: { title: "Verification steps", description: "Complete 3 steps: ID document, proof of address, and done.", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="document-select"]',
    popover: { title: "Select document type", description: "Choose your ID type — ID card or Drivers License.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="file-upload-zone"]',
    popover: { title: "Upload document", description: "Drag and drop or browse to upload a clear image or PDF of your document.", side: "top", align: "start" },
  },
];

export function startVerifyAccountTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
