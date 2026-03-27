import { writable, derived } from "svelte/store";

/**
 * Notification store - tracks unviewed conversations and notification queue
 */

/** @type {import("svelte/store").Writable<number>} */
export const unviewedCount = writable(0);

/** @type {import("svelte/store").Writable<Array<{id: string, title: string, message: string, type: string, conversationId: string, timestamp: Date}>>} */
export const notificationQueue = writable([]);

/** @type {import("svelte/store").Writable<boolean>} */
export const hasNewNotifications = writable(false);

// Maximum notifications to display at once
const MAX_VISIBLE_NOTIFICATIONS = 3;

/** @type {import("svelte/store").Readable<Array>} */
export const visibleNotifications = derived(notificationQueue, ($queue) => $queue.slice(0, MAX_VISIBLE_NOTIFICATIONS));

/**
 * Add a new notification to the queue
 * @param {Object} notification
 * @param {string} notification.id - Unique ID
 * @param {string} notification.title - Notification title
 * @param {string} notification.message - Notification message
 * @param {string} notification.type - Type: info, success, warning, error, urgent
 * @param {string} [notification.conversationId] - Optional conversation ID for navigation
 */
export function addNotification({ id, title, message, type = "info", conversationId = null }) {
  const notification = {
    id,
    title,
    message,
    type,
    conversationId,
    timestamp: new Date(),
  };

  notificationQueue.update((queue) => {
    const newQueue = [...queue, notification];
    // Keep only last 10 notifications in queue
    return newQueue.slice(-10);
  });

  hasNewNotifications.set(true);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeNotification(id);
  }, 5000);
}

/**
 * Remove a notification from the queue
 * @param {string} id - Notification ID
 */
export function removeNotification(id) {
  notificationQueue.update((queue) => queue.filter((n) => n.id !== id));
}

/**
 * Update the unviewed conversation count
 * @param {number} count
 */
export function setUnviewedCount(count) {
  unviewedCount.set(count);
}

/**
 * Increment unviewed count (for real-time updates)
 * @param {number} amount
 */
export function incrementUnviewed(amount = 1) {
  unviewedCount.update((count) => count + amount);
}

/**
 * Decrement unviewed count (when user views a conversation)
 * @param {number} amount
 */
export function decrementUnviewed(amount = 1) {
  unviewedCount.update((count) => Math.max(0, count - amount));
}

/**
 * Clear all notifications
 */
export function clearNotifications() {
  notificationQueue.set([]);
  hasNewNotifications.set(false);
}

/**
 * Clear unviewed count (when user views all)
 */
export function clearUnviewed() {
  unviewedCount.set(0);
}

/**
 * Handle new conversation notification from WebSocket
 * @param {Object} data
 * @param {string} data.conversationId
 * @param {string} data.customerName
 * @param {string} data.messagePreview
 */
export function handleNewConversation({ conversationId, customerName, messagePreview }) {
  incrementUnviewed();
  addNotification({
    id: `conversation-${conversationId}-${Date.now()}`,
    title: "New Chat",
    message: `${customerName}: ${messagePreview.substring(0, 80)}`,
    type: "info",
    conversationId,
  });
}

/**
 * Handle AI escalation notification
 * @param {Object} data
 * @param {string} data.conversationId
 * @param {string} data.summary
 */
export function handleAiEscalation({ conversationId, summary }) {
  incrementUnviewed();
  addNotification({
    id: `escalation-${conversationId}-${Date.now()}`,
    title: "URGENT: AI Escalation",
    message: summary.substring(0, 80),
    type: "urgent",
    conversationId,
  });
}
