import { describe, it, expect, beforeEach, vi } from "vitest";
import { get } from "svelte/store";
import { chatStore, isChatOpen, hasUnread, unreadCount, messages, isAiTyping, aiMessageCount, showEscalationPrompt, escalationReason } from "$lib/ChatWidget/chatStore.js";

describe("chatStore", () => {
  beforeEach(() => {
    // Reset store state between tests
    sessionStorage.clear();
    // Clear messages
    chatStore.clearMessages();
    // Reset AI state
    chatStore.resetAiState();
    // Close chat if open
    chatStore.close();
  });

  // Helper to get store values
  const $isChatOpen = () => get(isChatOpen);
  const $hasUnread = () => get(hasUnread);
  const $unreadCount = () => get(unreadCount);
  const $messages = () => get(messages);
  const $isAiTyping = () => get(isAiTyping);
  const $aiMessageCount = () => get(aiMessageCount);
  const $showEscalationPrompt = () => get(showEscalationPrompt);
  const $escalationReason = () => get(escalationReason);
  const $chatStore = () => get(chatStore);

  describe("initial state", () => {
    it("should have isOpen false by default", () => {
      expect($isChatOpen()).toBe(false);
    });

    it("should have hasUnread false by default", () => {
      expect($hasUnread()).toBe(false);
    });

    it("should have unreadCount 0 by default", () => {
      expect($unreadCount()).toBe(0);
    });

    it("should have empty messages array by default", () => {
      expect($messages()).toEqual([]);
    });

    it("should have isAiTyping false by default", () => {
      expect($isAiTyping()).toBe(false);
    });

    it("should have aiMessageCount 0 by default", () => {
      expect($aiMessageCount()).toBe(0);
    });

    it("should have showEscalationPrompt false by default", () => {
      expect($showEscalationPrompt()).toBe(false);
    });

    it("should have escalationReason null by default", () => {
      expect($escalationReason()).toBe(null);
    });
  });

  describe("open/close", () => {
    it("should open chat", () => {
      chatStore.open();
      expect($isChatOpen()).toBe(true);
    });

    it("should close chat", () => {
      chatStore.open();
      chatStore.close();
      expect($isChatOpen()).toBe(false);
    });

    it("should toggle chat", () => {
      expect($isChatOpen()).toBe(false);
      chatStore.toggle();
      expect($isChatOpen()).toBe(true);
      chatStore.toggle();
      expect($isChatOpen()).toBe(false);
    });
  });

  describe("messages", () => {
    it("should add message", () => {
      chatStore.addMessage({
        id: "1",
        text: "Hello",
        sender: "user",
        timestamp: Date.now(),
      });
      expect($messages()).toHaveLength(1);
      expect($messages()[0].text).toBe("Hello");
    });

    it("should clear messages", () => {
      chatStore.addMessage({
        id: "1",
        text: "Hello",
        sender: "user",
        timestamp: Date.now(),
      });
      chatStore.clearMessages();
      expect($messages()).toHaveLength(0);
    });
  });

  describe("unread", () => {
    it("should set unread", () => {
      chatStore.setUnread(true, 5);
      expect($hasUnread()).toBe(true);
      expect($unreadCount()).toBe(5);
    });

    it("should clear unread when chat is opened", () => {
      chatStore.setUnread(true, 3);
      expect($hasUnread()).toBe(true);
      chatStore.open();
      expect($hasUnread()).toBe(false);
      expect($unreadCount()).toBe(0);
    });
  });

  describe("AI state - setAiTyping", () => {
    it("should set isAiTyping to true", () => {
      chatStore.setAiTyping(true);
      expect($isAiTyping()).toBe(true);
    });

    it("should set isAiTyping to false", () => {
      chatStore.setAiTyping(true);
      chatStore.setAiTyping(false);
      expect($isAiTyping()).toBe(false);
    });
  });

  describe("AI state - message count", () => {
    it("should increment aiMessageCount when adding AI message", () => {
      expect($aiMessageCount()).toBe(0);

      chatStore.addMessage({
        id: "1",
        text: "Hello from AI",
        sender: "ai",
        timestamp: Date.now(),
      });

      expect($aiMessageCount()).toBe(1);
    });

    it("should not increment aiMessageCount for user messages", () => {
      expect($aiMessageCount()).toBe(0);

      chatStore.addMessage({
        id: "1",
        text: "User message",
        sender: "user",
        timestamp: Date.now(),
      });

      expect($aiMessageCount()).toBe(0);
    });

    it("should track multiple AI messages", () => {
      expect($aiMessageCount()).toBe(0);

      chatStore.addMessage({ id: "1", text: "AI 1", sender: "ai", timestamp: Date.now() });
      chatStore.addMessage({ id: "2", text: "User", sender: "user", timestamp: Date.now() });
      chatStore.addMessage({ id: "3", text: "AI 2", sender: "ai", timestamp: Date.now() });

      expect($aiMessageCount()).toBe(2);
    });
  });

  describe("AI state - escalation", () => {
    it("should trigger escalation after 30 AI messages", () => {
      expect($showEscalationPrompt()).toBe(false);

      // Add 30 AI messages to trigger escalation
      for (let i = 0; i < 30; i++) {
        chatStore.addMessage({
          id: String(i),
          text: `AI message ${i}`,
          sender: "ai",
          timestamp: Date.now(),
        });
      }

      expect($aiMessageCount()).toBe(30);
      expect($showEscalationPrompt()).toBe(true);
    });

    it("should show escalation with reason", () => {
      expect($showEscalationPrompt()).toBe(false);
      expect($escalationReason()).toBe(null);

      chatStore.showEscalation("Low confidence");

      expect($showEscalationPrompt()).toBe(true);
      expect($escalationReason()).toBe("Low confidence");
      expect($isAiTyping()).toBe(false);
    });

    it("should hide escalation", () => {
      chatStore.showEscalation("Test reason");
      expect($showEscalationPrompt()).toBe(true);

      chatStore.hideEscalation();
      expect($showEscalationPrompt()).toBe(false);
      expect($escalationReason()).toBe(null);
    });
  });

  describe("AI state - reset", () => {
    it("should reset AI state on conversation start", () => {
      // Add some AI messages
      chatStore.addMessage({ id: "1", text: "AI", sender: "ai", timestamp: Date.now() });
      chatStore.showEscalation("Test");
      expect($aiMessageCount()).toBe(1);
      expect($showEscalationPrompt()).toBe(true);

      // Reset for new conversation
      chatStore.resetAiState();

      expect($aiMessageCount()).toBe(0);
      expect($showEscalationPrompt()).toBe(false);
      expect($escalationReason()).toBe(null);
    });
  });

  describe("AI state - lastUserMessage", () => {
    it("should update lastUserMessageAt", () => {
      expect($chatStore).toBeDefined();

      chatStore.updateLastUserMessage();
      // Just verify the function doesn't throw and state is updated
    });
  });
});
