import { command, query, getRequestEvent } from "$app/server";
import { api } from "$lib/helpers";
import * as v from "valibot";

/**
 * Start a guest chat session.
 * Uses the api() helper which handles CSRF tokens automatically.
 */
export const startGuestChat = command(
  v.object({
    email: v.pipe(v.string(), v.email()),
  }),
  async ({ email }) => {
    const event = getRequestEvent();
    const response = await api({
      resource: "chat/guest/start",
      method: "post",
      data: { email },
      event,
    });

    if (!response?.ok) {
      const result = await response?.json();
      return {
        success: false,
        error: result?.message || "Failed to start chat",
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
    };
  }
);

/**
 * Send a message and get an AI response.
 */
export const sendAiMessage = command(
  v.object({
    conversationId: v.pipe(v.string(), v.minLength(1)),
    message: v.pipe(v.string(), v.minLength(1), v.maxLength(2000)),
  }),
  async ({ conversationId, message }) => {
    const event = getRequestEvent();
    const response = await api({
      resource: `chat/${conversationId}/ai/respond`,
      method: "post",
      data: { message },
      event,
    });

    if (!response?.ok) {
      return {
        success: false,
        error: "Sorry, something went wrong. Please try again.",
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      metadata: result.metadata,
    };
  }
);

/**
 * Submit a conversation rating.
 */
export const submitRating = command(
  v.object({
    conversationId: v.pipe(v.string(), v.minLength(1)),
    stars: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(5)),
    comment: v.optional(v.string()),
  }),
  async ({ conversationId, stars, comment }) => {
    const event = getRequestEvent();
    const response = await api({
      resource: `chat/conversations/${conversationId}/rate`,
      method: "post",
      data: { stars, comment: comment || null },
      event,
    });

    if (!response?.ok) {
      const result = await response?.json();
      return {
        success: false,
        error: result?.message || "Failed to submit rating",
      };
    }

    return { success: true };
  }
);

/**
 * Check if user is authenticated.
 */
export const checkAuth = query(async () => {
  const event = getRequestEvent();
  const response = await api({
    resource: "user",
    method: "get",
    event,
  });

  return response?.ok ?? false;
});

/**
 * Request handoff from AI to human agent.
 * Supports both authenticated users and guests (via guestToken parameter).
 */
export const requestHandoff = command(
  v.object({
    conversationId: v.pipe(v.string(), v.minLength(1)),
    guestToken: v.optional(v.string()),
  }),
  async ({ conversationId, guestToken }) => {
    const event = getRequestEvent();

    console.log("[DEBUG] requestHandoff remote - guestToken:", guestToken ? "present" : "null");

    /** @type {Record<string, string>} */
    const extraHeaders = {};

    // Add guest token header if provided
    if (guestToken) {
      extraHeaders["X-Guest-Token"] = guestToken;
    }

    console.log("[DEBUG] requestHandoff remote - extraHeaders:", Object.keys(extraHeaders));

    const response = await api({
      resource: `chat/${conversationId}/handoff/request`,
      method: "post",
      data: { trigger_type: "customer_request" },
      event,
      extraHeaders: Object.keys(extraHeaders).length > 0 ? extraHeaders : undefined,
    });

    if (!response?.ok) {
      const result = await response?.json();
      return {
        success: false,
        error: result?.message || "Failed to request handoff",
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
    };
  }
);

/**
 * Record user activity (heartbeat).
 * Called periodically to indicate user is still active.
 * Supports both authenticated users and guests (via guestToken parameter).
 */
export const recordActivity = command(
  v.object({
    conversationId: v.pipe(v.string(), v.minLength(1)),
    guestToken: v.optional(v.string()),
  }),
  async ({ conversationId, guestToken }) => {
    const event = getRequestEvent();

    /** @type {Record<string, string>} */
    const extraHeaders = {};

    if (guestToken) {
      extraHeaders["X-Guest-Token"] = guestToken;
    }

    const response = await api({
      resource: `chat/${conversationId}/activity`,
      method: "post",
      data: {},
      event,
      extraHeaders: Object.keys(extraHeaders).length > 0 ? extraHeaders : undefined,
    });

    if (!response?.ok) {
      return { success: false };
    }

    return { success: true };
  }
);

/**
 * Abandon conversation using fetch with keepalive (alternative to beacon).
 * Use this when you need response confirmation.
 */
export const abandonConversation = command(
  v.object({
    conversationId: v.pipe(v.string(), v.minLength(1)),
    guestToken: v.optional(v.string()),
  }),
  async ({ conversationId, guestToken }) => {
    const event = getRequestEvent();

    /** @type {Record<string, string>} */
    const extraHeaders = {};

    if (guestToken) {
      extraHeaders["X-Guest-Token"] = guestToken;
    }

    const response = await api({
      resource: `chat/${conversationId}/abandon`,
      method: "post",
      data: guestToken ? { guest_token: guestToken } : {},
      event,
      extraHeaders: Object.keys(extraHeaders).length > 0 ? extraHeaders : undefined,
    });

    if (!response?.ok) {
      return { success: false };
    }

    const result = await response.json();
    return {
      success: true,
      abandoned: result.data?.abandoned ?? false,
    };
  }
);
