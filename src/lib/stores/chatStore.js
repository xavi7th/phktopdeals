import { writable, get } from "svelte/store";
import * as echoStore from "./echoStore.js";

// Chat state
export const messages = writable([]);
export const conversation = writable(null);
export const typing = writable(false);
export const unreadCount = writable(0);

// Actions
export const initConversation = async (conversationId) => {
  conversation.set(conversationId);
  messages.set([]);
  typing.set(false);
  unreadCount.set(0);

  // Subscribe to conversation channel
  echoStore.subscribe(`chat.${conversationId}`, (data) => {
    messages.update((msgs) => [...msgs, data]);
    unreadCount.update((count) => count + 1);
  });
};

export const addMessage = (message) => {
  messages.update((msgs) => [...msgs, message]);
  unreadCount.update((count) => count + 1);
};

export const setTyping = (isTyping) => {
  typing.set(isTyping);
};

export const markAsRead = (messageId) => {
  messages.update((msgs) => msgs.map((msg) => (msg.id === messageId ? { ...msg, read_at: new Date().toISOString() } : msg)));
  unreadCount.set(0);
};

export const reset = () => {
  conversation.set(null);
  messages.set([]);
  typing.set(false);
  unreadCount.set(0);
};

// Export for external use
export const getMessages = () => {
  return get(messages);
};

export const getConversation = () => {
  return get(conversation);
};
