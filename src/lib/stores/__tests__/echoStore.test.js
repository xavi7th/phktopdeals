import { describe, it, expect, beforeEach, vi } from "vitest";
import { get } from "svelte/store";
import { connectionStatus, reconnectAttempts, messageQueue, connect, disconnect, subscribe, unsubscribe, sendMessage, queueMessage, processQueue } from "$lib/stores/echoStore.js";

// Mock Echo client
vi.mock("$lib/stores/echoClient.js", () => ({
  getEchoClient: vi.fn(() => ({
    connect: vi.fn().mockResolvedValue(undefined),
    disconnect: vi.fn(),
    private: vi.fn(() => ({
      listen: vi.fn(() => ({
        error: vi.fn(),
      })),
      stop: vi.fn(),
      whisper: vi.fn(),
    })),
  })),
  disconnectEcho: vi.fn(),
}));

describe("echoStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    disconnect();
  });

  describe("connectionStatus", () => {
    it("should have disconnected status by default", () => {
      expect(get(connectionStatus)).toBe("disconnected");
    });

    it("should set connecting status when connecting", async () => {
      const connectPromise = connect();
      expect(get(connectionStatus)).toBe("connecting");
      await connectPromise;
    });

    it("should set connected status after successful connection", async () => {
      await connect();
      expect(get(connectionStatus)).toBe("connected");
    });

    it("should set disconnected status on error", async () => {
      const { getEchoClient } = await import("$lib/stores/echoClient.js");
      getEchoClient.mockImplementation(() => ({
        connect: vi.fn().mockRejectedValue(new Error("Connection failed")),
      }));

      await expect(connect()).rejects.toThrow();
      expect(get(connectionStatus)).toBe("disconnected");
    });
  });

  describe("reconnectAttempts", () => {
    it("should have 0 attempts by default", () => {
      expect(get(reconnectAttempts)).toBe(0);
    });

    it("should reset attempts on successful connection", async () => {
      await connect();
      expect(get(reconnectAttempts)).toBe(0);
    });
  });

  describe("messageQueue", () => {
    it("should have empty queue by default", () => {
      expect(get(messageQueue)).toEqual([]);
    });

    it("should add message to queue", () => {
      queueMessage({ content: "Test message", conversationId: "1" });
      expect(get(messageQueue)).toHaveLength(1);
    });

    it("should process queue on reconnect", async () => {
      const { getEchoClient } = await import("$lib/stores/echoClient.js");
      const whisperMock = vi.fn();
      getEchoClient.mockReturnValue({
        connect: vi.fn().mockResolvedValue(undefined),
        private: vi.fn(() => ({
          listen: vi.fn(() => ({ error: vi.fn() })),
          stop: vi.fn(),
          whisper: whisperMock,
        })),
      });

      queueMessage({ content: "Test 1", conversationId: "1" });
      queueMessage({ content: "Test 2", conversationId: "1" });

      await processQueue();

      expect(whisperMock).toHaveBeenCalledTimes(2);
      expect(get(messageQueue)).toEqual([]);
    });
  });

  describe("subscribe", () => {
    it("should call echo.private().listen()", async () => {
      const { getEchoClient } = await import("$lib/stores/echoClient.js");
      const listenMock = vi.fn(() => ({ error: vi.fn() }));
      getEchoClient.mockReturnValue({
        private: vi.fn(() => ({
          listen: listenMock,
          error: vi.fn(),
        })),
      });

      const callback = vi.fn();
      subscribe("chat.1", callback);

      expect(getEchoClient).toHaveBeenCalled();
    });
  });

  describe("unsubscribe", () => {
    it("should call echo.private().stop()", async () => {
      const { getEchoClient } = await import("$lib/stores/echoClient.js");
      const stopMock = vi.fn();
      getEchoClient.mockReturnValue({
        private: vi.fn(() => ({
          stop: stopMock,
        })),
      });

      unsubscribe("chat.1");

      expect(stopMock).toHaveBeenCalled();
    });
  });

  describe("sendMessage", () => {
    it("should send message via whisper", async () => {
      const { getEchoClient } = await import("$lib/stores/echoClient.js");
      const whisperMock = vi.fn();
      getEchoClient.mockReturnValue({
        private: vi.fn(() => ({
          whisper: whisperMock,
        })),
      });

      await sendMessage("1", { content: "Hello" });

      expect(whisperMock).toHaveBeenCalledWith("message", { content: "Hello" });
    });

    it("should log error if not connected", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { getEchoClient } = await import("$lib/stores/echoClient.js");
      getEchoClient.mockReturnValue(null);

      await sendMessage("1", { content: "Hello" });

      expect(consoleSpy).toHaveBeenCalledWith("Echo not connected");
      consoleSpy.mockRestore();
    });
  });
});
