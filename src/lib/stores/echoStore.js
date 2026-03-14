import { writable, get } from "svelte/store";
import { getEchoClient, disconnectEcho } from "./echoClient.js";
import type { ChatMessage } from "$lib/types.d";

// Connection state
export const connectionStatus = writable("disconnected");
export const reconnectAttempts = writable(0);

// Message queue for offline scenarios
export const messageQueue = writable<ChatMessage[]>([]);

// Actions
export const connect = async (): Promise<void> => {
  connectionStatus.set("connecting");
  reconnectAttempts.set(0);

  try {
    const echo = getEchoClient();
    await echo.connect();
    connectionStatus.set("connected");
    reconnectAttempts.set(0);
  } catch (error) {
    console.error("Echo connection failed:", error);
    connectionStatus.set("disconnected");
    throw error;
  }
};

export const disconnect = (): void => {
  disconnectEcho();
  connectionStatus.set("disconnected");
  messageQueue.set([]);
};

export const subscribe = (channel: string, callback: (data: ChatMessage) => void): void => {
  const echo = getEchoClient();
  if (echo) {
    echo.private(channel)
      .listen(callback)
      .error((err: Error) => {
        console.error("Echo subscription failed:", err);
      });
  }
};

export const unsubscribe = (channel: string): void => {
  const echo = getEchoClient();
  if (echo) {
    echo.private(channel).stop();
  }
};

export const sendMessage = async (conversationId: string, message: ChatMessage): Promise<void> => {
  const echo = getEchoClient();
  if (!echo) {
    console.error("Echo not connected");
    return;
  }

  const channel = `chat.${conversationId}`;
  echo.private(channel).whisper("message", message);
};

// Queue message for later sending
export const queueMessage = (message: ChatMessage): void => {
  messageQueue.update((msgs) => [...msgs, message]);
};

// Process queued messages on reconnect
export const processQueue = async (): Promise<void> => {
  const queue = get(messageQueue);

  for (const message of queue) {
    await sendMessage(message.conversationId, message);
  }
  messageQueue.set([]);
};
