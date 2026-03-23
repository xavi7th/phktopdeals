/**
 * Guest session store with localStorage persistence and 2-day expiry.
 */
import { writable } from "svelte/store";

const STORAGE_KEY = "phk_guest_chat";
const EXPIRY_DAYS = 2;

/**
 * @typedef {Object} GuestData
 * @property {string} email - Guest email address
 * @property {string} token - Guest token for session
 * @property {string} conversationId - Obfuscated conversation ID
 * @property {number} timestamp - When the session was created
 */

/**
 * Load guest data from localStorage, checking expiry.
 * @returns {GuestData|null}
 */
function loadGuestData() {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const isExpired = Date.now() - data.timestamp > expiryMs;

    if (isExpired) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * Save guest data to localStorage.
 * @param {GuestData} data
 */
function saveGuestData(data) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...data,
        timestamp: Date.now(),
      }),
    );
  } catch {
    // Storage might be full or disabled
  }
}

/**
 * Clear guest data from localStorage.
 */
function clearGuestData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Initialize store with existing data
const initialData = loadGuestData();

/**
 * @type {import('svelte/store').Writable<GuestData|null>}
 */
export const guestStore = writable(initialData);

/**
 * Set guest email and session data.
 * @param {string} email
 * @param {string} token
 * @param {string} conversationId
 */
export function setGuestEmail(email, token, conversationId) {
  const data = { email, token, conversationId, timestamp: Date.now() };
  saveGuestData(data);
  guestStore.set(data);
}

/**
 * Get current guest email.
 * @returns {string|null}
 */
export function getGuestEmail() {
  let currentData = null;
  guestStore.subscribe((v) => (currentData = v))();
  return currentData?.email ?? null;
}

/**
 * Get current guest token.
 * @returns {string|null}
 */
export function getGuestToken() {
  let currentData = null;
  guestStore.subscribe((v) => (currentData = v))();
  return currentData?.token ?? null;
}

/**
 * Clear guest session.
 */
export function clearGuest() {
  clearGuestData();
  guestStore.set(null);
}

/**
 * Get current guest conversation ID.
 * @returns {string|null}
 */
export function getGuestConversationId() {
  let currentData = null;
  guestStore.subscribe((v) => (currentData = v))();
  return currentData?.conversationId ?? null;
}

/**
 * Check if guest session is valid (not expired).
 * @returns {boolean}
 */
export function isGuestSessionValid() {
  const data = loadGuestData();
  return data !== null;
}

export default guestStore;
