import { writable, derived } from "svelte/store";

// Staff inbox store
function createStaffInboxStore() {
  const { subscribe, set, update } = writable({
    queue: [], // Unassigned pending conversations
    myChats: [], // Conversations claimed by current staff
    otherActiveChats: [], // Conversations claimed by other staff
    selectedConversationId: null,
    selectedConversation: null,
    messages: [],
    customer: null,
    isLoading: false,
    isLoadingMessages: false,
    error: null,
    isOnline: true,
    staffList: [],
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
    selectConversation: (conversationId, conversation) =>
      update((state) => ({
        ...state,
        selectedConversationId: conversationId,
        selectedConversation: conversation,
        messages: [],
        customer: null,
      })),
    setMessages: (data) =>
      update((state) => ({
        ...state,
        messages: data.messages || [],
        customer: data.customer,
        conversation: data.conversation,
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
        selectedConversationId: null,
        selectedConversation: null,
        messages: [],
        customer: null,
        isLoading: false,
        isLoadingMessages: false,
        error: null,
        isOnline: true,
        staffList: [],
      }),
  };
}

export const staffInboxStore = createStaffInboxStore();

// Derived stores for convenience
export const selectedConversation = derived(staffInboxStore, ($store) => $store.selectedConversation);

export const isConversationSelected = derived(staffInboxStore, ($store) => !!$store.selectedConversationId);
