/**
 * Safe API wrapper with caching and error handling.
 * Use these functions instead of calling api() directly for better resilience.
 */

import { api } from "./helpers";
import { initCache, setCache, getCache, getStaleCache, cacheKey, getTtlForEndpoint, clearCachePattern } from "./cache";
import { apiStatus } from "./stores/apiStatus";
import { ApiError, API_UNAVAILABLE } from "./errors";
import { browser } from "$app/environment";

/**
 * For GET requests - graceful degradation with cache fallback
 * Works on both server-side (no cache) and client-side (with cache)
 *
 * @param {import('$lib/types').ApiParams} params - API parameters
 * @param {any} [fallback=null] - Default value if no cache available
 * @returns {Promise<{data: any, fromCache?: boolean, stale?: boolean, error?: boolean}>}
 */
export async function safeRead(params, fallback = null) {
  const key = cacheKey(params.method, params.resource, params.data);
  const ttl = getTtlForEndpoint(params.resource);

  // On client-side, try fresh cache first
  if (browser && ttl > 0) {
    await initCache();
    const cached = await getCache(key);
    if (cached !== null) {
      // Return cached data, but still fetch fresh in background
      return { data: cached, fromCache: true };
    }
  }

  const res = await api(params);

  if (!res?.ok) {
    // Update API status
    apiStatus.setOffline(res?.statusText || "API error");

    // Try stale cache as fallback (client-side only)
    if (browser && ttl > 0) {
      const stale = await getStaleCache(key);
      if (stale !== null) {
        return { data: stale, fromCache: true, stale: true };
      }
    }

    return { data: fallback, error: true };
  }

  // Success - update status and cache
  apiStatus.setOnline();
  const jsonData = await res.json();
  const data = jsonData?.data ?? jsonData;

  // Cache successful response (client-side only)
  if (browser && ttl > 0 && data) {
    await setCache(key, data, ttl);
  }

  return { data, error: false };
}

/**
 * For mutations - NO queueing, immediate error on failure
 * Use for POST, PUT, DELETE operations
 *
 * @param {import('$lib/types').ApiParams} params - API parameters
 * @returns {Promise<any>}
 * @throws {ApiError} When API is unavailable
 */
export async function safeMutation(params) {
  // Check API health first (client-side only)
  if (browser && !apiStatus.isAvailable()) {
    throw API_UNAVAILABLE;
  }

  const res = await api(params);

  if (!res?.ok) {
    apiStatus.setOffline(res?.statusText || "API error");

    // For 503 specifically, throw our predefined error
    if (res?.status === 503) {
      throw API_UNAVAILABLE;
    }

    throw new ApiError(res?.statusText || "Our service is temporarily unavailable. Please try again later.", res?.status || 503);
  }

  // Success - update status
  apiStatus.setOnline();

  // Invalidate related cache on success (client-side only)
  if (browser) {
    const resource = params.resource || "";

    // Invalidate purchase-related caches
    if (resource.includes("purchase") || resource.includes("order")) {
      await clearCachePattern("api:get:purchase-invoices");
      await clearCachePattern("api:get:store");
      await clearCachePattern("api:get:products");
    }

    // Invalidate wallet/top-up caches
    if (resource.includes("wallet") || resource.includes("top-up")) {
      await clearCachePattern("api:get:wallet");
      await clearCachePattern("api:get:user/wallet");
    }

    // Invalidate user caches
    if (resource.includes("user") && !resource.includes("wallet")) {
      await clearCachePattern("api:get:user");
    }
  }

  return res.json();
}

/**
 * Background refresh - fetch fresh data without blocking
 * Use after returning cached data to update it
 *
 * @param {import('$lib/types').ApiParams} params - API parameters
 * @returns {Promise<void>}
 */
export async function backgroundRefresh(params) {
  if (!browser) return;

  try {
    const res = await api({ ...params, logResponse: false });
    if (res?.ok) {
      apiStatus.setOnline();
      const jsonData = await res.json();
      const data = jsonData?.data ?? jsonData;
      const key = cacheKey(params.method, params.resource, params.data);
      const ttl = getTtlForEndpoint(params.resource);
      if (ttl > 0 && data) {
        await setCache(key, data, ttl);
      }
    }
  } catch {
    // Silently fail - this is background refresh
  }
}

/**
 * Generic safe wrapper for raw fetch callbacks
 * Use for staff/internal calls that use raw fetch (not the api() helper)
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
 * Prefetch data into cache
 * Call this when you know user will need data soon
 *
 * @param {import('$lib/types').ApiParams} params - API parameters
 * @returns {Promise<void>}
 */
export async function prefetch(params) {
  if (!browser) return;

  const key = cacheKey(params.method, params.resource, params.data);
  const ttl = getTtlForEndpoint(params.resource);

  if (ttl === 0) return; // Don't prefetch non-cacheable data

  await initCache();

  // Check if already cached
  const cached = await getCache(key);
  if (cached !== null) return; // Already cached

  // Fetch and cache
  try {
    const res = await api({ ...params, logResponse: false });
    if (res?.ok) {
      const jsonData = await res.json();
      const data = jsonData?.data ?? jsonData;
      if (data) {
        await setCache(key, data, ttl);
      }
    }
  } catch {
    // Silently fail - prefetch is optional
  }
}
