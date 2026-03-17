import { writable, derived } from "svelte/store";

// Staff inbox store
function createStaffInboxStore() {
  const { subscribe, set, update } = writable({
    queue: [], // Unassigned pending conversations
    myChats: [], // Conversations claimed by current staff
    otherActiveChats: [], // Conversations claimed by other staff
    waitingHandoffs: [], // Conversations waiting for staff (handoff queue)
    pendingEmailChats: [], // Conversations pending email (unreachable)
    selectedConversationId: null,
    selectedConversation: null,
    messages: [],
    customer: null,
    pagination: null, // Message pagination cursor info
    isLoading: false,
    isLoadingMessages: false,
    error: null,
    isOnline: true,
    staffList: [],
    // AI escalation metadata
    aiEscalation: null, // { ai_summary, flagged_topics, message_count, escalated_at }
  });

  return {
    subscribe,
    setInbox: (data) =>
      update((state) => ({
        ...state,
        queue: data.queue || [],
        myChats: data.my_chats || [],
        otherActiveChats: data.other_active_chats || [],
        isLoading: false,
        error: null,
      })),
    setWaitingHandoffs: (handoffs) =>
      update((state) => ({
        ...state,
        waitingHandoffs: handoffs || [],
      })),
    setPendingEmailChats: (chats) =>
      update((state) => ({
        ...state,
        pendingEmailChats: chats || [],
      })),
    addWaitingHandoff: (conversation) =>
      update((state) => ({
        ...state,
        waitingHandoffs: [conversation, ...state.waitingHandoffs],
      })),
    removeWaitingHandoff: (conversationId) =>
      update((state) => ({
        ...state,
        waitingHandoffs: state.waitingHandoffs.filter((c) => c.id !== conversationId),
      })),
    addToPendingEmailChats: (conversation) =>
      update((state) => ({
        ...state,
        pendingEmailChats: [conversation, ...state.pendingEmailChats],
      })),
    removeFromPendingEmailChats: (conversationId) =>
      update((state) => ({
        ...state,
        pendingEmailChats: state.pendingEmailChats.filter((c) => c.id !== conversationId),
      })),
    selectConversation: (conversationId, conversation) =>
      update((state) => ({
        ...state,
        selectedConversationId: conversationId,
        selectedConversation: conversation,
        messages: [],
        customer: null,
        pagination: null,
      })),
    setMessages: (data) =>
      update((state) => ({
        ...state,
        messages: data.messages || [],
        customer: data.customer,
        conversation: data.conversation,
        pagination: data.pagination || null,
        isLoadingMessages: false,
      })),
    // Append older messages when loading more
    appendMessages: (data) =>
      update((state) => ({
        ...state,
        messages: [...(data.messages || []), ...state.messages],
        pagination: data.pagination || null,
        isLoadingMessages: false,
      })),
    addMessage: (message) =>
      update((state) => ({
        ...state,
        messages: [...state.messages, message],
      })),
    setLoading: (isLoading) => update((state) => ({ ...state, isLoading })),
    setLoadingMessages: (isLoadingMessages) => update((state) => ({ ...state, isLoadingMessages })),
    setError: (error) => update((state) => ({ ...state, error, isLoading: false })),
    setOnline: (isOnline) => update((state) => ({ ...state, isOnline })),
    setStaffList: (staffList) => update((state) => ({ ...state, staffList })),
    // AI escalation methods
    setAiEscalation: (escalationData) => update((state) => ({ ...state, aiEscalation: escalationData })),
    clearAiEscalation: () => update((state) => ({ ...state, aiEscalation: null })),
    removeFromQueue: (conversationId) =>
      update((state) => ({
        ...state,
        queue: state.queue.filter((c) => c.id !== conversationId),
      })),
    addToMyChats: (conversation) =>
      update((state) => ({
        ...state,
        myChats: [conversation, ...state.myChats],
      })),
    removeFromMyChats: (conversationId) =>
      update((state) => ({
        ...state,
        myChats: state.myChats.filter((c) => c.id !== conversationId),
      })),
    reset: () =>
      set({
        queue: [],
        myChats: [],
        otherActiveChats: [],
        waitingHandoffs: [],
        pendingEmailChats: [],
        selectedConversationId: null,
        selectedConversation: null,
        messages: [],
        customer: null,
        pagination: null,
        isLoading: false,
        isLoadingMessages: false,
        error: null,
        isOnline: true,
        staffList: [],
        aiEscalation: null,
      }),
  };
}

export const staffInboxStore = createStaffInboxStore();

// Derived stores for convenience
export const selectedConversation = derived(staffInboxStore, ($store) => $store.selectedConversation);

export const isConversationSelected = derived(staffInboxStore, ($store) => !!$store.selectedConversationId);
