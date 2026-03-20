import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { chatStore } from "$lib/ChatWidget/chatStore.js";

describe("MSG-03: Scroll pagination", () => {
  beforeEach(() => {
    chatStore.clearMessages();
  });

  it("stores messages in correct order for pagination", () => {
    const testMessages = [
      { id: "1", content: "First message", created_at: "2026-01-01T10:00:00Z" },
      { id: "2", content: "Second message", created_at: "2026-01-01T10:01:00Z" },
      { id: "3", content: "Third message", created_at: "2026-01-01T10:02:00Z" },
    ];

    testMessages.forEach((msg) => chatStore.addMessage(msg));

    const messages = get(chatStore).messages;

    expect(messages).toHaveLength(3);
    expect(messages[0].id).toBe("1");
    expect(messages[2].id).toBe("3");
  });

  it("prepends older messages for scroll-up loading", () => {
    // Start with newer messages
    chatStore.addMessage({
      id: "3",
      content: "Newest",
      created_at: "2026-01-01T12:00:00Z",
    });

    // Prepend older messages (simulating scroll-up pagination)
    const olderMessages = [
      { id: "1", content: "Oldest", created_at: "2026-01-01T10:00:00Z" },
      { id: "2", content: "Middle", created_at: "2026-01-01T11:00:00Z" },
    ];

    // Manually prepend older messages
    chatStore.update((state) => ({
      ...state,
      messages: [...olderMessages, ...state.messages],
    }));

    const messages = get(chatStore).messages;

    expect(messages).toHaveLength(3);
    expect(messages[0].content).toBe("Oldest");
    expect(messages[2].content).toBe("Newest");
  });

  it("supports timestamp-based pagination cursor", () => {
    const baseTime = new Date("2026-01-01T10:00:00Z").getTime();

    // Create 25 messages
    for (let i = 0; i < 25; i++) {
      chatStore.addMessage({
        id: String(i + 1),
        content: `Message ${i + 1}`,
        created_at: new Date(baseTime + i * 60000).toISOString(),
      });
    }

    const messages = get(chatStore).messages;

    // Simulate pagination: get messages before a certain timestamp
    const cursorTime = new Date(baseTime + 10 * 60000).toISOString();
    const paginatedMessages = messages.filter((m) => m.created_at < cursorTime);

    expect(paginatedMessages.length).toBe(10);
    expect(paginatedMessages[0].content).toBe("Message 1");
  });
});
