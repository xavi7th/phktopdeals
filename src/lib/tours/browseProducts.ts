import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="category-sidebar"]',
    popover: { title: "Browse by category", description: "Filter products by gift cards, games, e-sim, or top-up.", side: "right", align: "start" },
  },
  {
    element: '[data-tour="product-grid"]',
    popover: { title: "Product listings", description: "Browse available products. Click any card to view details.", side: "top", align: "start" },
  },
  {
    element: '[data-tour="search-input"]',
    popover: { title: "Search products", description: "Search by name or brand to find specific items.", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="sort-select"]',
    popover: { title: "Sort products", description: "Order products by price, popularity, or newest.", side: "left", align: "start" },
  },
];

export function startBrowseProductsTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
