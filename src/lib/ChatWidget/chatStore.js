import { writable, derived, get } from "svelte/store";
import { browser } from "$app/environment";

const STORAGE_KEY = "phk-chat-widget-state";
const BROADCAST_CHANNEL_NAME = "phk-chat-widget-sync";

function createChatStore() {
	// Initial state
	const defaultState = {
		isOpen: false,
		hasUnread: false,
		unreadCount: 0,
		messages: [],
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
			const newState = { ...state, isOpen: true };
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
			const newState = {
				...state,
				messages: [...state.messages, message],
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

	return {
		subscribe,
		open,
		close,
		toggle,
		setUnread,
		addMessage,
		clearMessages,
	};
}

export const chatStore = createChatStore();

// Derived store for convenience
export const isChatOpen = derived(chatStore, ($chat) => $chat.isOpen);
export const hasUnread = derived(chatStore, ($chat) => $chat.hasUnread);
export const unreadCount = derived(chatStore, ($chat) => $chat.unreadCount);
export const messages = derived(chatStore, ($chat) => $chat.messages);
