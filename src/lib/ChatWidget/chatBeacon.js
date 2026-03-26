import { browser } from "$app/environment";
import { PUBLIC_VITE_BASE_API } from "$env/static/public";

/**
 * Abandon conversation using beacon API (reliable for page unload).
 * This is fire-and-forget - backend timeout is the authority.
 *
 * NOTE: sendBeacon doesn't support custom headers, so we include
 * the guest token in the request body instead.
 *
 * @param {string} conversationId - The conversation ID
 * @param {string} [guestToken] - Optional guest token for unauthenticated users
 * @returns {boolean} True if beacon was queued successfully
 */
export function abandonConversationBeacon(conversationId, guestToken) {
  if (!browser) return false;

  const url = `${PUBLIC_VITE_BASE_API}chat/${conversationId}/abandon`;

  const payload = {};

  // Include guest token in body (not URL) for security
  if (guestToken) {
    payload.guest_token = guestToken;
  }

  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });

  // sendBeacon returns true if queued successfully
  return navigator.sendBeacon(url, blob);
}
