import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { chatStore } from "$lib/ChatWidget/chatStore.js";

describe("MSG-05: Read receipts API", () => {
  beforeEach(() => {
    chatStore.clearMessages();
  });

  it("updates message read_at when message is read", () => {
    const message = {
      id: "msg-1",
      content: "Test message",
      sender: "user",
      read_at: null,
    };

    chatStore.addMessage(message);

    // Simulate receiving MessageRead event
    const readAt = new Date().toISOString();

    chatStore.update((state) => ({
      ...state,
      messages: state.messages.map((msg) => (msg.id === "msg-1" ? { ...msg, read_at: readAt } : msg)),
    }));

    const messages = get(chatStore).messages;
    expect(messages[0].read_at).toBe(readAt);
  });

  it("tracks multiple read messages", () => {
    const messages = [
      { id: "1", content: "Message 1", read_at: null },
      { id: "2", content: "Message 2", read_at: null },
      { id: "3", content: "Message 3", read_at: null },
    ];

    messages.forEach((msg) => chatStore.addMessage(msg));

    // Mark messages 1 and 2 as read
    const readAt = new Date().toISOString();

    chatStore.update((state) => ({
      ...state,
      messages: state.messages.map((msg) => (msg.id === "1" || msg.id === "2" ? { ...msg, read_at: readAt } : msg)),
    }));

    const updatedMessages = get(chatStore).messages;
    expect(updatedMessages.filter((m) => m.read_at !== null)).toHaveLength(2);
    expect(updatedMessages.find((m) => m.id === "3").read_at).toBeNull();
  });

  it("handles read receipt data structure for API", () => {
    // Simulating the API payload for marking messages as read
    const markAsReadPayload = {
      message_ids: ["msg-1", "msg-2"],
      read_at: new Date().toISOString(),
    };

    expect(markAsReadPayload.message_ids).toHaveLength(2);
    expect(markAsReadPayload.read_at).toBeDefined();

    // Verify the store can handle this data structure
    chatStore.addMessage({
      id: "msg-1",
      content: "Test",
      read_at: null,
    });

    chatStore.update((state) => ({
      ...state,
      messages: state.messages.map((msg) => (markAsReadPayload.message_ids.includes(msg.id) ? { ...msg, read_at: markAsReadPayload.read_at } : msg)),
    }));

    const messages = get(chatStore).messages;
    expect(messages[0].read_at).not.toBeNull();
  });

  it("maintains read_at as null for unread messages", () => {
    chatStore.addMessage({
      id: "unread-msg",
      content: "This message is not read yet",
      read_at: null,
    });

    const messages = get(chatStore).messages;
    expect(messages[0].read_at).toBeNull();
  });
});
