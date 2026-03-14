import { writable, get } from "svelte/store";
import * as echoStore from "./echoStore.js";

interface ChatMessage {
  id?: string;
  conversation_id?: string;
  content: string;
  sender_type?: string;
  sender_id?: string;
  created_at?: string;
  read_at?: string;
}

// Chat state
export const messages = writable<ChatMessage[]>([]);
export const conversation = writable<string | null>(null);
export const typing = writable(false);
export const unreadCount = writable(0);

// Actions
export const initConversation = async (conversationId: string): Promise<void> => {
  conversation.set(conversationId);
  messages.set([]);
  typing.set(false);
  unreadCount.set(0);

  // Subscribe to conversation channel
  echoStore.subscribe(`chat.${conversationId}`, (data: ChatMessage) => {
    messages.update((msgs) => [...msgs, data]);
    unreadCount.update((count) => count + 1);
  });
};

export const addMessage = (message: ChatMessage): void => {
  messages.update((msgs) => [...msgs, message]);
  unreadCount.update((count) => count + 1);
};

export const setTyping = (isTyping: boolean): void => {
  typing.set(isTyping);
};

export const markAsRead = (messageId: string): void => {
  messages.update((msgs) =>
    msgs.map((msg) =>
      msg.id === messageId ? { ...msg, read_at: new Date().toISOString() } : msg
    )
  );
  unreadCount.set(0);
};

export const reset = (): void => {
  conversation.set(null);
  messages.set([]);
  typing.set(false);
  unreadCount.set(0);
};

// Export for external use
export const getMessages = (): ChatMessage[] => {
  return get(messages);
};

export const getConversation = (): string | null => {
  return get(conversation);
};
