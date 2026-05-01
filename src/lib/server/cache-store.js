/** Server-side cache infrastructure */
import { dev } from "$app/environment";

// User cache (per-session, 2 min TTL)
const userCache = new Map();
const USER_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

// Shared cache (user-agnostic, 1 hour TTL)
const sharedCache = new Map();
const SHARED_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const MAX_SHARED_CACHE_SIZE = 1000;

let lastEviction = 0;

/**
 * Evict stale entries from both caches.
 * Runs at most once per minute to avoid overhead.
 */
export function evictStaleCache() {
  const now = Date.now();
  if (now - lastEviction < 60_000) return;
  lastEviction = now;

  for (const [key, entry] of userCache) {
    if (now - entry.cachedAt > USER_CACHE_TTL_MS) {
      userCache.delete(/** @type {string} */ (key));
    }
  }

  for (const [key, entry] of sharedCache) {
    if (now - entry.cachedAt > entry.ttlMs) {
      sharedCache.delete(/** @type {string} */ (key));
    }
  }
}

// User cache methods
/**
 * @param {string} sessionKey
 */
export function getUserCache(sessionKey) {
  const entry = userCache.get(sessionKey);
  if (!entry || Date.now() - entry.cachedAt > USER_CACHE_TTL_MS) return null;
  return entry.user;
}

/**
 * @param {string} sessionKey
 * @param {any} user
 */
export function setUserCache(sessionKey, user) {
  userCache.set(sessionKey, { user, cachedAt: Date.now() });
}

/**
 * @param {string} sessionKey
 */
export function clearUserCache(sessionKey) {
  userCache.delete(sessionKey);
}

// Shared cache methods
/**
 * @param {string} key
 */
export function getShared(key) {
  const entry = sharedCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > entry.ttlMs) {
    sharedCache.delete(key);
    return null;
  }
  return entry.data;
}

/**
 * @param {string} key
 * @param {any} data
 * @param {number} [ttlMs] - Optional custom TTL in ms (defaults to 1 hour)
 */
export function setShared(key, data, ttlMs = SHARED_CACHE_TTL_MS) {
  if (sharedCache.size >= MAX_SHARED_CACHE_SIZE) {
    // Evict oldest entry (Map preserves insertion order)
    sharedCache.delete(sharedCache.keys().next().value);
  }
  sharedCache.set(key, { data, cachedAt: Date.now(), ttlMs });
}

/**
 * @param {string} key
 */
export function invalidateShared(key) {
  sharedCache.delete(key);
}

/**
 * @param {string} pattern
 */
export function invalidateSharedPattern(pattern) {
  const re = new RegExp(pattern);
  for (const key of sharedCache.keys()) {
    if (re.test(key)) {
      sharedCache.delete(key);
    }
  }
}

export function clearAllShared() {
  sharedCache.clear();
}
