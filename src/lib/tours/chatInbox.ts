import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="queue-sidebar"]',
    popover: { title: "Conversation queue", description: "View queued and assigned conversations. Click to claim a conversation.", side: "right", align: "start" },
  },
  {
    element: '[data-tour="conversation-panel"]',
    popover: { title: "Reply to customer", description: "Send messages in real-time. Use the action bar to transfer or resolve.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="resolve-btn"]',
    popover: { title: "Resolve conversation", description: "Mark the conversation as resolved when the issue is closed.", side: "top", align: "start" },
  },
];

export function startChatInboxTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
