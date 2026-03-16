import { safeApiCall } from "$lib/safeApi.js";

/**
 * Fetch staff inbox data
 */
export async function fetchStaffInbox() {
  return safeApiCall(
    () =>
      fetch("/api/staff/inbox", {
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to fetch staff inbox",
  );
}

/**
 * Fetch messages for a conversation
 */
export async function fetchConversationMessages(conversationId) {
  return safeApiCall(
    () =>
      fetch(`/api/staff/chat/${conversationId}/messages`, {
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to fetch conversation messages",
  );
}

/**
 * Claim a conversation
 */
export async function claimConversation(conversationId) {
  return safeApiCall(
    () =>
      fetch(`/api/staff/chat/${conversationId}/claim`, {
        method: "POST",
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to claim conversation",
  );
}

/**
 * Transfer a conversation to another staff
 */
export async function transferConversation(conversationId, staffId) {
  return safeApiCall(
    () =>
      fetch(`/api/staff/chat/${conversationId}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ staff_id: staffId }),
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to transfer conversation",
  );
}

/**
 * Resolve a conversation
 */
export async function resolveConversation(conversationId) {
  return safeApiCall(
    () =>
      fetch(`/api/staff/chat/${conversationId}/resolve`, {
        method: "POST",
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to resolve conversation",
  );
}

/**
 * Toggle staff presence (online/offline)
 */
export async function togglePresence(isOnline) {
  return safeApiCall(
    () =>
      fetch("/api/staff/presence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_online: isOnline }),
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to update presence",
  );
}

/**
 * Get list of available staff for transfer
 */
export async function fetchStaffList() {
  return safeApiCall(
    () =>
      fetch("/api/staff", {
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to fetch staff list",
  );
}

/**
 * Send a message to a conversation (staff reply)
 */
export async function sendStaffMessage(conversationId, content) {
  return safeApiCall(
    () =>
      fetch(`/api/chat/${conversationId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
        credentials: "include",
      }).then((res) => res.json()),
    "Failed to send message",
  );
}
