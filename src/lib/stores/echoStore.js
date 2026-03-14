import { writable } from 'svelte/store';
import { echoClient } from './echoClient.js';

// Connection state
export const connectionStatus = writable('disconnected');
export const reconnectAttempts = writable(0);

// Message queue for offline scenarios
export const messageQueue = writable<Message[]>([]);

// Actions
export const connect = async () => {
  if (echoClient) {
    return;
  }

  connectionStatus.set('connecting');
  reconnectAttempts.update(0);

  try {
    await echoClient.connect();
    connectionStatus.set('connected');
    reconnectAttempts.set(0);
  } catch (error) {
    console.error('Echo connection failed:', error);
    connectionStatus.set('disconnected');
    throw error;
  }
};

export const disconnect = () => {
  if (echoClient) {
    echoClient.disconnect();
    echoClient = null;
    connectionStatus.set('disconnected');
    messageQueue.set([]);
  }
};

export const subscribe = (channel, callback) => {
  if (echoClient) {
    echoClient.private(channel)
      .listen(callback)
      .error((err) => {
        console.error('Echo subscription failed:', err);
      });
  }
};

export const unsubscribe = (channel) => {
  if (echoClient) {
    echoClient.private(channel)
      .stop();
  }
};

export const sendMessage = async (conversationId, message) => {
  if (!echoClient) {
    console.error('Echo not connected');
    return;
  }
  const channel = `chat.${conversationId}`;
  echoClient.private(channel)
      .whisper('message', message)
      .listen((data) => {
        callback?.(data);
      })
      .error((err) => {
        console.error('Failed to send message:', err);
      });
  }
};

// Queue message for later sending
export const queueMessage = (conversationId, message) => {
  messageQueue.update(msgs => [...msgs, message]);
};

// Process queued messages on reconnect
export const processQueue = async () => {
  for (const message of messageQueue) {
    await sendMessage(message.conversationId, message);
  }
  messageQueue.set([]);
};
