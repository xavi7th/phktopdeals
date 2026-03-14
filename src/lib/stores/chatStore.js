import { writable } from 'svelte/store';
import { echoClient } from './echoClient.js';
import type { Message } from './types';
import { echoStore } from './echoStore.js';

// Chat state
export const messages = writable<Message[]>([]);
export const conversation = writable(null);
export const typing = writable(false);
export const unreadCount = writable(0);

// Actions
export const initConversation = async (conversationId: string) => {
  conversation.set(conversationId);
  messages.set([]);
  typing.set(false);
  unreadCount.set(0);

  // Subscribe to conversation channel
  echoStore.subscribe(conversationId, (data) => {
    messages.update(msgs => [...msgs, data]);
    unreadCount.set(msgs.length);
  });
};

  echoStore.on('message', (data) => {
    messages.update(msgs => [...msgs, data]);
    unreadCount.set(prev => unreadCount);
  });
};

  echoStore.on('message.read', (data) => {
    const message = messages.find(m => m.id === data.message_id);
    if (message) {
      messages.update(msgs => (msg);
      unreadCount.set(unreadCount);
    }
  });
};

export const addMessage = (message: Message) => {
  messages.update(msgs => [...msgs, message]);
  unreadCount.set(messages.length);
    scrollToBottom();

 }
};

export const setTyping = (isTyping: boolean) => {
  typing.set(isTyping);
}

}

export const reset = () => {
  conversation.set(null);
  messages.set([]);
  typing.set(false);
  unreadCount.set(0);
};
