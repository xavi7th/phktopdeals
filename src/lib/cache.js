import { browser } from "$app/environment";

const DB_NAME = "phk_api_cache";
const STORE_NAME = "responses";
const DB_VERSION = 1;

/** @type {IDBDatabase|null} */
let db = null;

/**
 * Initialize IndexedDB. Call this on client-side mount.
 * @returns {Promise<IDBDatabase|null>}
 */
export async function initCache() {
  if (!browser) return null;
  if (db) return db;

  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error("Failed to open IndexedDB:", request.error);
        resolve(null);
      };

      request.onsuccess = () => {
        db = request.result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const target = /** @type {IDBOpenDBRequest} */ (event.target);
        const database = target?.result;
        if (database && !database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: "key" });
        }
      };
    } catch (error) {
      console.error("IndexedDB not available:", error);
      resolve(null);
    }
  });
}

/**
 * Generate cache key from API params
 * @param {string} method - HTTP method
 * @param {string} resource - API resource path
 * @param {any} [params] - Request params/body hash
 * @returns {string}
 */
export function cacheKey(method, resource, params = null) {
  const hash = params ? JSON.stringify(params) : "";
  return `api:${method}:${resource}:${hash.length > 50 ? hash.slice(0, 50) : hash}`;
}

/**
 * Store data with TTL
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} [ttlSeconds=300] - Time to live in seconds
 * @returns {Promise<void>}
 */
export async function setCache(key, data, ttlSeconds = 300) {
  if (!browser || !db) return;

  const expiresAt = Date.now() + ttlSeconds * 1000;

  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put({
        key,
        data,
        expiresAt,
        cachedAt: Date.now(),
      });

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error("Failed to set cache:", request.error);
        resolve();
      };
    } catch (error) {
      resolve();
    }
  });
}

/**
 * Get cached data (returns null if expired or missing)
 * @param {string} key - Cache key
 * @returns {Promise<any|null>}
 */
export async function getCache(key) {
  if (!browser || !db) return null;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        if (!result) return resolve(null);

        // Check if expired
        if (Date.now() > result.expiresAt) {
          resolve(null); // Expired, but don't delete yet (getStale can use it)
        } else {
          resolve(result.data);
        }
      };

      request.onerror = () => {
        console.error("Failed to get cache:", request.error);
        resolve(null);
      };
    } catch (error) {
      resolve(null);
    }
  });
}

/**
 * Get stale (expired) cache data as fallback
 * @param {string} key - Cache key
 * @returns {Promise<any|null>}
 */
export async function getStaleCache(key) {
  if (!browser || !db) return null;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result?.data ?? null);
      };

      request.onerror = () => {
        console.error("Failed to get stale cache:", request.error);
        resolve(null);
      };
    } catch (error) {
      resolve(null);
    }
  });
}

/**
 * Clear specific key
 * @param {string} key - Cache key
 * @returns {Promise<void>}
 */
export async function clearCache(key) {
  if (!browser || !db) return;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error("Failed to clear cache:", request.error);
        resolve();
      };
    } catch (error) {
      resolve();
    }
  });
}

/**
 * Clear all keys matching pattern
 * @param {string} pattern - Regex pattern to match
 * @returns {Promise<void>}
 */
export async function clearCachePattern(pattern) {
  if (!browser || !db) return;

  const regex = new RegExp(pattern);

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();

      request.onsuccess = (event) => {
        const cursor = /** @type {IDBCursorWithValue|null} */ (event.target.result);
        if (cursor) {
          if (regex.test(cursor.value.key)) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };

      request.onerror = () => {
        console.error("Failed to clear cache pattern:", request.error);
        resolve();
      };
    } catch (error) {
      resolve();
    }
  });
}

/**
 * Clear all cache
 * @returns {Promise<void>}
 */
export async function clearAllCache() {
  if (!browser || !db) return;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error("Failed to clear all cache:", request.error);
        resolve();
      };
    } catch (error) {
      resolve();
    }
  });
}

/**
 * Get cache statistics
 * @returns {Promise<{count: number, size: number}>}
 */
export async function getCacheStats() {
  if (!browser || !db) return { count: 0, size: 0 };

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();

      let count = 0;
      let size = 0;

      request.onsuccess = (event) => {
        const cursor = /** @type {IDBCursorWithValue|null} */ (event.target.result);
        if (cursor) {
          count++;
          size += JSON.stringify(cursor.value).length;
          cursor.continue();
        } else {
          resolve({ count, size });
        }
      };

      request.onerror = () => {
        resolve({ count: 0, size: 0 });
      };
    } catch (error) {
      resolve({ count: 0, size: 0 });
    }
  });
}

// TTL constants by endpoint type
export const CACHE_TTL = {
  STATIC: 3600, // 1 hour - sliders, categories, brands
  PRODUCTS: 300, // 5 min - product listings
  USER_DATA: 60, // 1 min - wallet balance, profile
  NONE: 0, // No cache - orders, transactions
};

/**
 * Determine TTL for a given API resource
 * @param {string} [resource] - API resource path
 * @returns {number} TTL in seconds
 */
export function getTtlForEndpoint(resource) {
  if (!resource) return CACHE_TTL.STATIC;

  // Static content - cache for 1 hour
  if (
    resource.includes("sliders") ||
    resource.includes("categories") ||
    resource.includes("brands") ||
    resource === "" // Home page
  ) {
    return CACHE_TTL.STATIC;
  }

  // User-specific data - cache for 1 min
  if (resource.includes("wallet") || resource.includes("user")) {
    return CACHE_TTL.USER_DATA;
  }

  // Orders and transactions - no cache
  if (resource.includes("purchase-invoices") || resource.includes("orders") || resource.includes("transactions")) {
    return CACHE_TTL.NONE;
  }

  // Default - products and other listings
  return CACHE_TTL.PRODUCTS;
}

/**
 * Clean up expired cache entries
 * @returns {Promise<number>} Number of entries removed
 */
export async function cleanExpiredCache() {
  if (!browser || !db) return 0;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();
      const now = Date.now();
      let removed = 0;

      request.onsuccess = (event) => {
        const cursor = /** @type {IDBCursorWithValue|null} */ (event.target.result);
        if (cursor) {
          if (cursor.value.expiresAt < now) {
            cursor.delete();
            removed++;
          }
          cursor.continue();
        } else {
          resolve(removed);
        }
      };

      request.onerror = () => resolve(0);
    } catch (error) {
      resolve(0);
    }
  });
}
