import { writable, derived, get } from "svelte/store";
import { browser } from "$app/environment";
import { getEchoClient, disconnectEcho } from "$lib/stores/echoClient.js";
import * as echoStore from "$lib/stores/echoStore.js";

const STORAGE_KEY = "phk-chat-widget-state";
const BROADCAST_CHANNEL_NAME = "phk-chat-widget-sync";

function createChatStore() {
  // Initial state
  const defaultState = {
    isOpen: false,
    hasUnread: false,
    unreadCount: 0,
    messages: [],
    conversationId: null,
    conversationStatus: null, // 'active' | 'resolved'
    // AI-specific state
    isAiTyping: false,
    aiMessageCount: 0,
    lastUserMessageAt: null,
    showEscalationPrompt: false,
    escalationReason: null,
  };

  // Load from sessionStorage
  function loadFromStorage() {
    if (!browser) return defaultState;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultState, ...parsed };
      }
    } catch (e) {
      console.warn("Failed to load chat state from storage:", e);
    }
    return defaultState;
  }

  // Create the store
  const initialState = loadFromStorage();
  const { subscribe, set, update } = writable(initialState);

  // BroadcastChannel for multi-tab sync
  let broadcastChannel = null;

  function initBroadcastChannel() {
    if (!browser) return;

    try {
      broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      broadcastChannel.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === "STATE_SYNC") {
          // Update store with state from another tab
          set(payload);
        }
      };
    } catch (e) {
      console.warn("BroadcastChannel not supported:", e);
    }
  }

  // Save to sessionStorage
  function saveToStorage(state) {
    if (!browser) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save chat state to storage:", e);
    }
  }

  // Broadcast state to other tabs
  function broadcastState() {
    if (!browser || !broadcastChannel) return;
    const currentState = get({ subscribe });
    broadcastChannel.postMessage({
      type: "STATE_SYNC",
      payload: currentState,
    });
  }

  // Helper to persist and broadcast state
  function persistAndBroadcast(state) {
    saveToStorage(state);
    broadcastState();
  }

  // Initialize BroadcastChannel
  if (browser) {
    initBroadcastChannel();
  }

  // Actions
  function open() {
    update((state) => {
      const newState = { ...state, isOpen: true, hasUnread: false, unreadCount: 0 };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function close() {
    update((state) => {
      const newState = { ...state, isOpen: false };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function toggle() {
    update((state) => {
      const newState = { ...state, isOpen: !state.isOpen };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function setUnread(hasUnread, count = 0) {
    update((state) => {
      const newState = { ...state, hasUnread: hasUnread, unreadCount: count };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function addMessage(message) {
    update((state) => {
      const newMessages = [...state.messages, message];
      // If message is from bot and chat is closed, mark as unread
      const shouldSetUnread = message.sender === "bot" && !state.isOpen;

      // Track AI message count
      let newAiMessageCount = state.aiMessageCount;
      if (message.sender === "ai") {
        newAiMessageCount++;
      }

      // Check if should trigger escalation (30 message cap)
      const shouldEscalate = newAiMessageCount >= 30;

      const newState = {
        ...state,
        messages: newMessages,
        hasUnread: shouldSetUnread ? true : state.hasUnread,
        unreadCount: shouldSetUnread ? state.unreadCount + 1 : state.unreadCount,
        aiMessageCount: newAiMessageCount,
        showEscalationPrompt: shouldEscalate ? true : state.showEscalationPrompt,
        isAiTyping: message.sender === "ai" ? false : state.isAiTyping,
      };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  // AI-specific actions
  function setAiTyping(typing) {
    update((state) => {
      const newState = { ...state, isAiTyping: typing };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function showEscalation(reason) {
    update((state) => {
      const newState = {
        ...state,
        showEscalationPrompt: true,
        escalationReason: reason,
        isAiTyping: false,
      };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function hideEscalation() {
    update((state) => {
      const newState = { ...state, showEscalationPrompt: false, escalationReason: null };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function updateLastUserMessage() {
    update((state) => {
      const newState = { ...state, lastUserMessageAt: Date.now() };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function resetAiState() {
    update((state) => {
      const newState = {
        ...state,
        isAiTyping: false,
        aiMessageCount: 0,
        showEscalationPrompt: false,
        escalationReason: null,
      };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function clearMessages() {
    update((state) => {
      const newState = { ...state, messages: [] };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function setConversation(conversationId, status = "active") {
    update((state) => {
      const newState = { ...state, conversationId, conversationStatus: status };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  // WebSocket connection state
  let echoConnection = null;
  let currentChannel = null;
  let messageQueue = [];

  // WebSocket methods
  async function initEcho() {
    if (!browser) return;

    try {
      echoConnection = getEchoClient();
      await echoConnection.connect();
      console.log("Echo connected");
    } catch (error) {
      console.error("Failed to connect Echo:", error);
    }
  }

  function subscribeToChannel(conversationId) {
    if (!browser || !echoConnection) return;

    currentChannel = `chat.${conversationId}`;
    echoConnection
      .private(currentChannel)
      .listen("MessageSent", (data) => {
        addMessage({
          id: data.message.id,
          content: data.message.content,
          sender: data.message.sender_type,
          sender_id: data.message.sender_id,
          created_at: data.message.created_at,
        });
      })
      .listen("MessageRead", (data) => {
        update((state) => {
          const newMessages = state.messages.map((msg) => (msg.id === data.message_id ? { ...msg, read_at: data.read_at } : msg));
          return { ...state, messages: newMessages };
        });
      })
      .listen("ConversationResolved", (data) => {
        update((state) => {
          const newState = { ...state, conversationStatus: "resolved" };
          persistAndBroadcast(newState);
          return newState;
        });
      });
  }

  function disconnect() {
    if (!browser) return;

    disconnectEcho();
    echoConnection = null;
    currentChannel = null;
  }

  function flushQueue(sendFn) {
    if (messageQueue.length === 0) return;

    for (const message of messageQueue) {
      sendFn(message);
    }
    messageQueue = [];
  }

  function queueMessage(message) {
    messageQueue.push(message);
  }

  return {
    subscribe,
    open,
    close,
    toggle,
    setUnread,
    addMessage,
    clearMessages,
    setConversation,
    initEcho,
    subscribeToChannel: subscribe,
    disconnect,
    flushQueue,
    queueMessage,
    // AI-specific actions
    setAiTyping,
    showEscalation,
    hideEscalation,
    updateLastUserMessage,
    resetAiState,
  };
}

export const chatStore = createChatStore();

// Derived store for convenience
export const isChatOpen = derived(chatStore, ($chat) => $chat.isOpen);
export const hasUnread = derived(chatStore, ($chat) => $chat.hasUnread);
export const unreadCount = derived(chatStore, ($chat) => $chat.unreadCount);
export const messages = derived(chatStore, ($chat) => $chat.messages);
export const conversationStatus = derived(chatStore, ($chat) => $chat.conversationStatus);
export const conversationId = derived(chatStore, ($chat) => $chat.conversationId);

// AI-specific derived stores
export const isAiTyping = derived(chatStore, ($chat) => $chat.isAiTyping);
export const aiMessageCount = derived(chatStore, ($chat) => $chat.aiMessageCount);
export const showEscalationPrompt = derived(chatStore, ($chat) => $chat.showEscalationPrompt);
export const escalationReason = derived(chatStore, ($chat) => $chat.escalationReason);
