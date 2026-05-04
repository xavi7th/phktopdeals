import { driver, type DriveStep } from 'driver.js';

const steps: DriveStep[] = [
  {
    element: '[data-tour="bulk-order-download"]',
    popover: { title: 'Download template', description: 'Get the Excel template to fill in your bulk order details.', side: 'bottom', align: 'start' },
  },
  {
    element: '[data-tour="file-upload"]',
    popover: { title: 'Upload completed file', description: 'Drag and drop or browse to upload your completed order sheet.', side: 'top', align: 'start' },
  },
];

export function startBulkOrderTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
