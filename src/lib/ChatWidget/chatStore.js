import { writable, derived, get } from "svelte/store";
import { browser } from "$app/environment";
import { getEchoClient, disconnectEcho } from "$lib/stores/echoClient.js";
import * as echoStore from "$lib/stores/echoStore.js";
import { playStaffJoinedPing } from "$lib/ChatWidget/audioService.js";
import { requestHandoff as requestHandoffApi } from "$lib/ChatWidget/chat.remote.js";
import { getGuestToken } from "$lib/ChatWidget/guestStore.js";

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
    // Handoff state
    handoffStatus: null, // null | 'waiting' | 'staff_joined' | 'timeout'
    waitingStartedAt: null,
    staffJoinedAt: null,
    aiSummary: null,
    flaggedTopics: [],
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

  // Handoff actions
  async function requestHandoff() {
    const currentState = get(chatStore);
    const conversationId = currentState.conversationId;

    if (!conversationId) {
      console.error("Cannot request handoff: no conversation ID");
      return { success: false, error: "No active conversation" };
    }

    // Get guest token if available (for guest users)
    const guestToken = getGuestToken();
    console.log("[DEBUG] Guest token from store:", guestToken ? "present" : "null");
    console.log("[DEBUG] Conversation ID:", conversationId);

    // Optimistically update UI
    update((state) => {
      const newState = {
        ...state,
        handoffStatus: "waiting",
        waitingStartedAt: Date.now(),
        isAiTyping: false, // AI stops when handoff requested
        showEscalationPrompt: false, // Hide escalation prompt
        escalationReason: null,
      };
      persistAndBroadcast(newState);
      return newState;
    });

    // Call API
    try {
      const result = await requestHandoffApi({ conversationId, guestToken: guestToken || undefined });
      if (!result.success) {
        // Revert on failure
        update((state) => {
          const newState = {
            ...state,
            handoffStatus: null,
            waitingStartedAt: null,
          };
          persistAndBroadcast(newState);
          return newState;
        });
        console.error("Handoff request failed:", result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (error) {
      // Revert on error
      update((state) => {
        const newState = {
          ...state,
          handoffStatus: null,
          waitingStartedAt: null,
        };
        persistAndBroadcast(newState);
        return newState;
      });
      console.error("Handoff request error:", error);
      return { success: false, error: "Failed to request handoff" };
    }
  }

  function setHandoffStaffJoined(staffName) {
    update((state) => {
      const newState = {
        ...state,
        handoffStatus: "staff_joined",
        staffJoinedAt: Date.now(),
      };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function setHandoffTimeout() {
    update((state) => {
      const newState = {
        ...state,
        handoffStatus: "timeout",
      };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function setHandoffContext(aiSummary, flaggedTopics) {
    update((state) => {
      const newState = {
        ...state,
        aiSummary,
        flaggedTopics: flaggedTopics || [],
      };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  function resetHandoffState() {
    update((state) => {
      const newState = {
        ...state,
        handoffStatus: null,
        waitingStartedAt: null,
        staffJoinedAt: null,
        aiSummary: null,
        flaggedTopics: [],
      };
      persistAndBroadcast(newState);
      return newState;
    });
  }

  /**
   * Handle abandoned conversation - clear all state.
   * Called when conversation is marked as abandoned (from server event).
   */
  function handleAbandoned() {
    // Clear session storage
    if (browser) {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn("Failed to clear chat storage:", e);
      }
    }

    // Reset to default state
    set(defaultState);
  }

  // Add system message (for notifications)
  function addSystemMessage(content) {
    update((state) => {
      const systemMessage = {
        id: `system-${Date.now()}`,
        content,
        sender: "system",
        created_at: new Date().toISOString(),
      };
      const newMessages = [...state.messages, systemMessage];
      const newState = { ...state, messages: newMessages };
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
      })
      .listen("StaffJoined", (data) => {
        // Staff joined - show notification, play audio, and update state
        addSystemMessage("A staff member has joined the chat");
        playStaffJoinedPing(); // Play audio ping (always, per CONTEXT.md)
        setHandoffStaffJoined(data.staff?.name);
      })
      .listen("HandoffTimeout", (data) => {
        // Handoff timed out - show notification
        addSystemMessage("Unfortunately no agents are available at the moment. We've sent an email to follow up.");
        setHandoffTimeout();
      })
      .listen("ConversationAbandoned", (data) => {
        // Conversation was abandoned (user inactive)
        handleAbandoned();
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
    // Handoff actions
    requestHandoff,
    setHandoffStaffJoined,
    setHandoffTimeout,
    setHandoffContext,
    resetHandoffState,
    addSystemMessage,
    // Abandoned conversation
    handleAbandoned,
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

// Handoff-specific derived stores
export const handoffStatus = derived(chatStore, ($chat) => $chat.handoffStatus);
export const isWaitingForStaff = derived(chatStore, ($chat) => $chat.handoffStatus === "waiting");
export const hasStaffJoined = derived(chatStore, ($chat) => $chat.handoffStatus === "staff_joined");
export const isHandoffTimeout = derived(chatStore, ($chat) => $chat.handoffStatus === "timeout");
export const waitingStartedAt = derived(chatStore, ($chat) => $chat.waitingStartedAt);
export const aiSummary = derived(chatStore, ($chat) => $chat.aiSummary);
export const flaggedTopics = derived(chatStore, ($chat) => $chat.flaggedTopics);
