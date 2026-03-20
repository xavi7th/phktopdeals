import { describe, it, expect, beforeEach, vi } from "vitest";
import { get } from "svelte/store";
import { guestStore, setGuestEmail, getGuestEmail, getGuestToken, clearGuest, isGuestSessionValid } from "../guestStore.js";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("guestStore", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("2-day expiry", () => {
    it("persists data to localStorage", () => {
      setGuestEmail("test@example.com", "token123", "conv123");

      expect(localStorageMock.setItem).toHaveBeenCalledWith("phk_guest_chat", expect.stringContaining("test@example.com"));
    });

    it("clears expired data after 2 days", () => {
      const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000 - 1000;

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          email: "old@example.com",
          token: "oldtoken",
          conversationId: "oldconv",
          timestamp: twoDaysAgo,
        }),
      );

      expect(isGuestSessionValid()).toBe(false);
    });

    it("keeps valid data within 2 days", () => {
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          email: "valid@example.com",
          token: "validtoken",
          conversationId: "validconv",
          timestamp: oneDayAgo,
        }),
      );

      expect(isGuestSessionValid()).toBe(true);
    });
  });

  describe("setGuestEmail", () => {
    it("sets email, token, and conversationId", () => {
      setGuestEmail("user@example.com", "newtoken", "newconv");

      expect(getGuestEmail()).toBe("user@example.com");
      expect(getGuestToken()).toBe("newtoken");
    });
  });

  describe("clearGuest", () => {
    it("removes guest data from store and localStorage", () => {
      setGuestEmail("clear@example.com", "cleartoken", "clearconv");
      clearGuest();

      expect(get(guestStore)).toBeNull();
      expect(getGuestEmail()).toBeNull();
      expect(getGuestToken()).toBeNull();
    });
  });
});
