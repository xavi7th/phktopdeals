import { writable, derived } from "svelte/store";
import { browser } from "$app/environment";

/**
 * @typedef {'online' | 'degraded' | 'offline'} ApiStatusType
 */

/**
 * @typedef {Object} ApiStatusState
 * @property {ApiStatusType} status - Current API health status
 * @property {number} lastSuccessfulPing - Timestamp of last successful API call
 * @property {number} failedAttempts - Consecutive failure count
 * @property {string|null} lastError - Last error message
 * @property {number|null} recoveryAttemptAt - Timestamp when we should try recovery
 */

const DEGRADED_THRESHOLD = 2; // failures before showing degraded banner
const OFFLINE_THRESHOLD = 4; // failures before showing offline banner
const RECOVERY_TIMEOUT = 30000; // ms before auto-retry after going offline

/** @type {ApiStatusState} */
const defaultStatus = {
  status: "online",
  lastSuccessfulPing: Date.now(),
  failedAttempts: 0,
  lastError: null,
  recoveryAttemptAt: null,
};

function createApiStatusStore() {
  // Try to restore from sessionStorage for SSR compatibility
  let initial = defaultStatus;
  if (browser) {
    try {
      const stored = sessionStorage.getItem("apiStatus");
      if (stored) {
        initial = JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors
    }
  }

  const { subscribe, set, update } = writable(initial);

  // Persist to sessionStorage on changes
  if (browser) {
    subscribe((state) => {
      try {
        sessionStorage.setItem("apiStatus", JSON.stringify(state));
      } catch {
        // Storage full or unavailable
      }
    });
  }

  return {
    subscribe,

    /**
     * Mark API as online (successful response received)
     */
    setOnline: () =>
      update((s) => ({
        ...s,
        status: "online",
        lastSuccessfulPing: Date.now(),
        failedAttempts: 0,
        lastError: null,
        recoveryAttemptAt: null,
      })),

    /**
     * Mark API as having issues (failed response)
     * @param {string} [error] - Error message
     */
    setOffline: (error) =>
      update((s) => {
        const failedAttempts = s.failedAttempts + 1;
        let newStatus = s.status;

        if (failedAttempts >= OFFLINE_THRESHOLD) {
          newStatus = "offline";
        } else if (failedAttempts >= DEGRADED_THRESHOLD) {
          newStatus = "degraded";
        }

        return {
          ...s,
          status: newStatus,
          failedAttempts,
          lastError: error || "Connection failed",
          recoveryAttemptAt: newStatus === "offline" ? Date.now() + RECOVERY_TIMEOUT : null,
        };
      }),

    /**
     * Check if API is currently available
     * @returns {boolean}
     */
    isAvailable: () => {
      /** @type {ApiStatusState|undefined} */
      let current;
      subscribe((s) => (current = s))();
      return current?.status !== "offline";
    },

    /**
     * Reset status to online (manual retry)
     */
    reset: () => set(defaultStatus),
  };
}

export const apiStatus = createApiStatusStore();

/**
 * Derived store - true if API is available for operations
 */
export const isApiAvailable = derived(apiStatus, ($s) => $s.status !== "offline");

/**
 * Derived store - true if we should show the status banner
 */
export const shouldShowBanner = derived(apiStatus, ($s) => $s.status !== "online");

/**
 * Derived store - current status for use in components
 */
export const apiStatusText = derived(apiStatus, ($s) => {
  switch ($s.status) {
    case "offline":
      return "Service Unavailable";
    case "degraded":
      return "Experiencing Issues";
    default:
      return "Online";
  }
});
