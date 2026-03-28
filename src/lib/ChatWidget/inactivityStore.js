/**
 * Inactivity tracking store with tab coordination.
 * Tracks user activity, sends heartbeats, and handles browser close events.
 * @module inactivityStore
 */
import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { recordActivity } from "./chat.remote.js";
import { abandonConversationBeacon } from "./chatBeacon.js";
import { conversationId, handoffStatus } from "./chatStore.js";
import { getGuestToken } from "./guestStore.js";
import { get } from "svelte/store";

// Configuration
const HEARTBEAT_INTERVAL_MS = 60_000; // 60 seconds
const MAX_BACKOFF_MS = 300_000; // Max 5 minutes backoff
const DEDUP_WINDOW_MS = 15_000; // Don't send heartbeat if sent < 15s ago

// Module-level variables (NOT in store state)
/** @type {ReturnType<typeof setInterval> | null} */
let heartbeatInterval = null;
/** @type {number} */
let heartbeatBackoff = HEARTBEAT_INTERVAL_MS;
/** @type {number} */
let consecutiveFailures = 0;
/** @type {boolean} */
let isTracking = false;
/** @type {number} */
let lastHeartbeatAt = 0;

// BroadcastChannel for multi-tab coordination
const HEARTBEAT_CHANNEL = "chat-heartbeat";
/** @type {BroadcastChannel | null} */
let heartbeatChannel = null;
/** @type {boolean} */
let isLeaderTab = false;
/** @type {string | null} */
let tabId = null;

// Store bound listener references for cleanup
/** @type {EventListener | null} */
let boundHandleUserInteraction = null;
/** @type {EventListener | null} */
let boundHandleVisibilityChange = null;
/** @type {EventListener | null} */
let boundHandleBrowserClose = null;
/** @type {EventListener | null} */
let boundHandleTyping = null;

/**
 * @typedef {Object} InactivityState
 * @property {number | null} lastActivityAt - Timestamp of last activity
 * @property {'connected' | 'degraded' | 'disconnected'} connectionStatus - Connection status
 */

function createInactivityStore() {
  /** @type {import('svelte/store').Writable<InactivityState>} */
  const { subscribe, set, update } = writable({
    lastActivityAt: null,
    connectionStatus: "connected",
  });

  /**
   * Start tracking user activity.
   * @returns {void}
   */
  function startTracking() {
    if (!browser || isTracking) return;

    isTracking = true;

    // Initialize tab coordination
    initTabCoordination();

    // Update state
    update((state) => ({
      ...state,
      lastActivityAt: Date.now(),
      connectionStatus: "connected",
    }));

    // Create bound listeners (store references for cleanup)
    boundHandleUserInteraction = handleUserInteraction;
    boundHandleVisibilityChange = handleVisibilityChange;
    boundHandleBrowserClose = handleBrowserClose;
    // Note: boundHandleTyping is set inside setupTypingDetection()

    // Start heartbeat interval (only leader tab sends)
    heartbeatInterval = setInterval(() => {
      if (isLeaderTab) {
        sendHeartbeat();
      }
    }, HEARTBEAT_INTERVAL_MS);

    // Set up browser close handler
    setupBrowserCloseHandler();

    // Set up visibility change handler
    setupVisibilityHandler();

    // Set up user interaction listeners
    setupInteractionListeners();

    // Set up typing detection
    setupTypingDetection();
  }

  /**
   * Stop tracking user activity.
   * @returns {void}
   */
  function stopTracking() {
    if (!browser) return;

    isTracking = false;

    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }

    // Remove event listeners (must use same references)
    removeEventListeners();

    // Close broadcast channel
    if (heartbeatChannel) {
      heartbeatChannel.close();
      heartbeatChannel = null;
    }

    // Reset state
    isLeaderTab = false;
    tabId = null;
    consecutiveFailures = 0;
    heartbeatBackoff = HEARTBEAT_INTERVAL_MS;
    lastHeartbeatAt = 0;

    update((state) => ({
      ...state,
      lastActivityAt: null,
      connectionStatus: "connected",
    }));
  }

  /**
   * Initialize tab coordination via BroadcastChannel.
   * @returns {void}
   */
  function initTabCoordination() {
    if (!browser) return;

    tabId = crypto.randomUUID();

    try {
      heartbeatChannel = new BroadcastChannel(HEARTBEAT_CHANNEL);

      // Leader election
      heartbeatChannel.onmessage = (/** @type {MessageEvent} */ event) => {
        if (event.data.type === "election") {
          // Lower tabId wins
          if (tabId && event.data.tabId < tabId) {
            isLeaderTab = false;
          }
        } else if (event.data.type === "heartbeat") {
          // Another tab sent heartbeat, we can skip
          heartbeatBackoff = HEARTBEAT_INTERVAL_MS;
        }
      };

      // Announce presence
      if (tabId) {
        heartbeatChannel.postMessage({ type: "election", tabId });
      }

      // Assume leader until we hear from another tab
      setTimeout(() => {
        if (heartbeatChannel) {
          isLeaderTab = true;
        }
      }, 1000);
    } catch {
      // BroadcastChannel not supported, act as single tab
      isLeaderTab = true;
    }
  }

  /**
   * Send heartbeat to server with exponential backoff on failure.
   * @returns {Promise<void>}
   */
  async function sendHeartbeat() {
    const currentConversationId = get(conversationId);
    if (!currentConversationId || !browser) return;

    // Deduplication - don't send if recently sent
    const now = Date.now();
    if (now - lastHeartbeatAt < DEDUP_WINDOW_MS) {
      return;
    }
    lastHeartbeatAt = now;

    const guestToken = getGuestToken();

    try {
      const result = await recordActivity({
        conversationId: currentConversationId,
        guestToken: guestToken || undefined,
      });

      if (result.success) {
        // Reset on success
        heartbeatBackoff = HEARTBEAT_INTERVAL_MS;
        consecutiveFailures = 0;

        update((state) => ({ ...state, connectionStatus: "connected" }));

        // Notify other tabs
        if (heartbeatChannel && tabId) {
          heartbeatChannel.postMessage({ type: "heartbeat", tabId });
        }
      } else if (result.status === 404 || result.status === 403) {
        // Conversation no longer valid — stop tracking and notify UI
        stopTracking();
        if (browser) {
          window.dispatchEvent(new CustomEvent("conversation:invalid"));
        }
      } else {
        handleHeartbeatFailure();
      }
    } catch {
      handleHeartbeatFailure();
    }
  }

  /**
   * Handle heartbeat failure with exponential backoff.
   * @returns {void}
   */
  function handleHeartbeatFailure() {
    consecutiveFailures++;
    heartbeatBackoff = Math.min(heartbeatBackoff * 2, MAX_BACKOFF_MS);

    console.warn("[InactivityStore] Heartbeat failed, backoff:", heartbeatBackoff);

    // Update connection status
    const status = consecutiveFailures >= 3 ? "disconnected" : "degraded";
    update((state) => ({ ...state, connectionStatus: status }));

    // Reschedule with backoff
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }
    heartbeatInterval = setInterval(() => {
      if (isLeaderTab) {
        sendHeartbeat();
      }
    }, heartbeatBackoff);
  }

  /**
   * Handle browser close (best-effort abandon).
   * @returns {void}
   */
  function handleBrowserClose() {
    const currentConversationId = get(conversationId);
    if (!currentConversationId || !browser) return;

    // Only abandon if conversation is active or waiting for staff
    const currentHandoffStatus = get(handoffStatus);
    if (currentHandoffStatus === "staff_joined") {
      // Don't abandon if staff is actively chatting
      return;
    }

    const guestToken = getGuestToken();
    abandonConversationBeacon(currentConversationId, guestToken || undefined);
  }

  /**
   * Set up browser close handler.
   * @returns {void}
   */
  function setupBrowserCloseHandler() {
    if (!browser || !boundHandleBrowserClose) return;

    // Use pagehide (more reliable on mobile) and beforeunload
    window.addEventListener("pagehide", boundHandleBrowserClose, { capture: true });
    window.addEventListener("beforeunload", boundHandleBrowserClose, { capture: true });
  }

  /**
   * Set up visibility change handler.
   * @returns {void}
   */
  function setupVisibilityHandler() {
    if (!browser || !boundHandleVisibilityChange) return;
    document.addEventListener("visibilitychange", boundHandleVisibilityChange, { passive: true });
  }

  /**
   * Handle visibility change.
   * @this {Document}
   * @returns {void}
   */
  function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
      // User returned - record activity and send immediate heartbeat
      recordLocalActivity();
      if (isLeaderTab) {
        sendHeartbeat();
      }
    }
  }

  /**
   * Set up user interaction listeners.
   * @returns {void}
   */
  function setupInteractionListeners() {
    if (!browser || !boundHandleUserInteraction) return;

    const interactionEvents = /** @type {const} */ (["mousedown", "keydown", "touchstart"]);

    interactionEvents.forEach((eventType) => {
      document.addEventListener(eventType, boundHandleUserInteraction, { passive: true });
    });

    // Scroll needs explicit passive for performance
    document.addEventListener("scroll", boundHandleUserInteraction, { passive: true });
  }

  /**
   * Remove event listeners (must match addEventListener options).
   * @returns {void}
   */
  function removeEventListeners() {
    if (!browser) return;

    if (boundHandleBrowserClose) {
      window.removeEventListener("pagehide", boundHandleBrowserClose, { capture: true });
      window.removeEventListener("beforeunload", boundHandleBrowserClose, { capture: true });
    }

    if (boundHandleVisibilityChange) {
      document.removeEventListener("visibilitychange", boundHandleVisibilityChange, { passive: true });
    }

    if (boundHandleUserInteraction) {
      const interactionEvents = ["mousedown", "keydown", "touchstart", "scroll"];
      interactionEvents.forEach((eventType) => {
        document.removeEventListener(eventType, boundHandleUserInteraction, { passive: true });
      });
    }

    if (boundHandleTyping) {
      document.removeEventListener("keydown", boundHandleTyping, { passive: true });
    }

    // Clear references
    boundHandleUserInteraction = null;
    boundHandleVisibilityChange = null;
    boundHandleBrowserClose = null;
    boundHandleTyping = null;
  }

  /**
   * Handle user interaction.
   * @this {Document}
   * @returns {void}
   */
  function handleUserInteraction() {
    recordLocalActivity();
  }

  /**
   * Set up typing detection to extend timeout during long messages.
   * @returns {void}
   */
  function setupTypingDetection() {
    if (!browser) return;

    /** @type {ReturnType<typeof setTimeout> | null} */
    let typingTimer = null;

    boundHandleTyping = (/** @type {Event} */ event) => {
      // Only track typing in input/textarea
      const target = /** @type {HTMLElement} */ (event.target);
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        if (typingTimer) clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          recordLocalActivity();
        }, 5000); // Record activity 5 seconds after last keystroke
      }
    };

    document.addEventListener("keydown", boundHandleTyping, { passive: true });
  }

  /**
   * Record local activity.
   * @returns {void}
   */
  function recordLocalActivity() {
    update((state) => ({
      ...state,
      lastActivityAt: Date.now(),
    }));
  }

  return {
    subscribe,
    startTracking,
    stopTracking,
    recordLocalActivity,
  };
}

export const inactivityStore = createInactivityStore();
