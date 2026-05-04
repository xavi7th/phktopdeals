import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="product-list"]',
    popover: { title: "Product list", description: "View all products. Click a row to edit or archive.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="create-product-btn"]',
    popover: { title: "Create new product", description: "Add a new product to the store.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="archive-link"]',
    popover: { title: "Archived products", description: "View and restore archived products.", side: "left", align: "start" },
  },
];

export function startAdminProductMgmtTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
