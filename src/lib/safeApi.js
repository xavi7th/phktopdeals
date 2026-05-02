/**
 * Safe API wrapper with error handling and cache fallback.
 *
 * NOTE: This file uses raw fetch (browser-compatible).
 * The server-only api() helper is in $lib/server/api-helpers.
 */

import { browser } from "$app/environment";
import { api } from "$lib/helpers";
import { initCache, setCache, getCache, getStaleCache, cacheKey, getTtlForEndpoint, clearCachePattern } from "./cache";
import { apiStatus } from "./stores/apiStatus";
import { ApiError, API_UNAVAILABLE } from "./errors";

/**
 * Generic safe wrapper for raw fetch callbacks.
 * Use for staff/internal calls that use raw fetch (not the api() helper).
 *
 * @param {() => Promise<any>} fn - Callback returning a fetch promise (pre-parsed)
 * @param {string} [errorMessage] - Message to log on failure
 * @returns {Promise<any>}
 */
export async function safeApiCall(fn, errorMessage = "API call failed") {
  try {
    return await fn();
  } catch (err) {
    console.error(errorMessage, err);
    return null;
  }
}

/**
 * For GET requests - graceful degradation with cache fallback.
 * Uses api() helper (server-side) for built-in retry logic.
 *
 * @param {object} params - API params (resource, data, etc.)
 * @param {any} [fallback=null] - Value to return if API fails and no cache
 * @returns {Promise<{data: any, error?: boolean, fromCache?: boolean, stale?: boolean}>}
 */
export async function safeRead(params, fallback = null) {
  if (!browser) {
    // Server-side: just call api directly (retry already built-in)
    const res = await api(params);
    if (!res?.ok) {
      apiStatus.setOffline?.(res?.statusText || "API error");
      return { data: fallback, error: true };
    }
    apiStatus.setOnline?.();
    return { data: (await res.clone?.().json?.()) ?? fallback, error: false };
  }

  // Client-side: use cache
  const key = cacheKey(params.method || "GET", params.resource, params.data);
  const ttl = getTtlForEndpoint(params.resource);

  // Try fresh cache first
  if (ttl > 0) {
    await initCache();
    const cached = await getCache(key);
    if (cached) {
      return { data: cached, fromCache: true };
    }
  }

  try {
    const res = await api(params);

    if (!res?.ok) {
      apiStatus.setOffline?.(res?.statusText || "API error");

      // Try stale cache as fallback
      if (ttl > 0) {
        const stale = await getStaleCache(key);
        if (stale) {
          return { data: stale, fromCache: true, stale: true };
        }
      }

      return { data: fallback, error: true };
    }

    apiStatus.setOnline?.();
    const json = await res.clone?.().json?.();
    const data = json?.data ?? json;

    // Cache successful response
    if (ttl > 0 && data) {
      await setCache(key, data, ttl);
    }

    return { data, error: false };
  } catch {
    apiStatus.setOffline?.("Network error");

    // Try stale cache as fallback
    if (ttl > 0) {
      const stale = await getStaleCache(key);
      if (stale) {
        return { data: stale, fromCache: true, stale: true };
      }
    }

    return { data: fallback, error: true };
  }
}

/**
 * For mutations - NO queueing, immediate error on failure.
 *
 * @param {object} params - API params (resource, method, data, etc.)
 * @returns {Promise<any>}
 * @throws {ApiError} When API is unavailable or request fails
 */
export async function safeMutation(params) {
  // Check API health first (client-side check)
  if (browser && !apiStatus.isAvailable?.()) {
    throw API_UNAVAILABLE;
  }

  const res = await api(params);

  if (!res?.ok) {
    apiStatus.setOffline?.(res?.statusText || "API error");
    throw new ApiError(res?.statusText || "Our service is temporarily unavailable. Please try again later.", res?.status || 503);
  }

  apiStatus.setOnline?.();

  // Invalidate related cache on success
  const resource = params.resource || "";
  if (resource.includes("purchase")) {
    await clearCachePattern("api:get:purchase-invoices");
    await clearCachePattern("api:get:store");
  }

  return res.clone?.().json?.();
}
