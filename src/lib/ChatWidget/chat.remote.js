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
