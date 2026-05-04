import { driver, type DriveStep } from 'driver.js';

const steps: DriveStep[] = [
  {
    element: '[data-tour="stat-cards"]',
    popover: { title: 'Key metrics', description: 'View total users, sessions, click rate, and pageviews at a glance.', side: 'bottom', align: 'start' },
  },
  {
    element: '[data-tour="orders-table"]',
    popover: { title: 'Recent orders', description: 'See the latest orders with user info, transaction details, and status.', side: 'top', align: 'start' },
  },
];

export function startAdminDashboardTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
