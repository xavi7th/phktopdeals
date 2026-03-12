import { describe, it, expect, beforeEach, vi } from "vitest";
import { chatStore, isChatOpen, hasUnread, unreadCount, messages } from "$lib/ChatWidget/chatStore.js";

describe("chatStore", () => {
	beforeEach(() => {
		// Reset store state between tests
		sessionStorage.clear();
	});

	describe("initial state", () => {
		it("should have isOpen false by default", () => {
			expect($isOpen).toBe(false);
		});

		it("should have hasUnread false by default", () => {
			expect($hasUnread).toBe(false);
		});

		it("should have unreadCount 0 by default", () => {
			expect($unreadCount).toBe(0);
		});

		it("should have empty messages array by default", () => {
			expect($messages).toEqual([]);
		});
	});

	describe("open/close", () => {
		it("should open chat", () => {
			chatStore.open();
			expect($isOpen).toBe(true);
		});

		it("should close chat", () => {
			chatStore.open();
			chatStore.close();
			expect($isOpen).toBe(false);
		});

		it("should toggle chat", () => {
			expect($isOpen).toBe(false);
			chatStore.toggle();
			expect($isOpen).toBe(true);
			chatStore.toggle();
			expect($isOpen).toBe(false);
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
			expect($messages).toHaveLength(1);
			expect($messages[0].text).toBe("Hello");
		});

		it("should clear messages", () => {
			chatStore.addMessage({
				id: "1",
				text: "Hello",
				sender: "user",
				timestamp: Date.now(),
			});
			chatStore.clearMessages();
			expect($messages).toHaveLength(0);
		});
	});

	describe("unread", () => {
		it("should set unread", () => {
			chatStore.setUnread(true, 5);
			expect($hasUnread).toBe(true);
			expect($unreadCount).toBe(5);
		});

		it("should clear unread when chat is opened", () => {
			chatStore.setUnread(true, 3);
			expect($hasUnread).toBe(true);
			chatStore.open();
			expect($hasUnread).toBe(false);
			expect($unreadCount).toBe(0);
		});
	});
});
