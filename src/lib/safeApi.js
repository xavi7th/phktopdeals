/**
 * Safe API wrapper with error handling and cache fallback.
 *
 * Browser-only. All requests go through SvelteKit endpoints — never directly
 * to the Laravel API. For SSR data loading, use api() from $lib/server/api-helpers
 * in +page.server.js load functions instead.
 *
 * params.resource must be a SvelteKit endpoint path, e.g. "/api/products/featured"
 */

import { browser } from "$app/environment";
import { trackedFetch } from "$lib/api/clientFetch";
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
 * Browser-only — returns fallback immediately on server.
 *
 * @param {{ resource: string, method?: string, data?: any }} params - resource must be a SvelteKit endpoint path
 * @param {any} [fallback=null] - Value to return if API fails and no cache
 * @returns {Promise<{data: any, error?: boolean, fromCache?: boolean, stale?: boolean}>}
 */
export async function safeRead(params, fallback = null) {
  if (!browser) {
    // safeRead is browser-only. For SSR, use api() from $lib/server/api-helpers in +page.server.js.
    return { data: fallback, error: false };
  }

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
    const method = (params.method || "GET").toUpperCase();
    const res = await trackedFetch(params.resource, {
      method,
      credentials: "include",
      headers: { "content-type": "application/json", accept: "application/json" },
      ...(method !== "GET" && params.data ? { body: JSON.stringify(params.data) } : {}),
    });

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
 * @param {{ resource: string, method?: string, data?: any }} params - resource must be a SvelteKit endpoint path
 * @returns {Promise<any>}
 * @throws {ApiError} When API is unavailable or request fails
 */
export async function safeMutation(params) {
  if (browser && !apiStatus.isAvailable?.()) {
    throw API_UNAVAILABLE;
  }

  const isFormData = params.data instanceof FormData;
  const res = await trackedFetch(params.resource, {
    method: params.method || "POST",
    credentials: "include",
    headers: isFormData ? { accept: "application/json" } : { "content-type": "application/json", accept: "application/json" },
    body: params.data ? (isFormData ? params.data : JSON.stringify(params.data)) : undefined,
  });

  if (!res?.ok) {
    apiStatus.setOffline?.(res?.statusText || "API error");
    throw new ApiError(res?.statusText || "Our service is temporarily unavailable. Please try again later.", res?.status || 503);
  }

  apiStatus.setOnline?.();

  // Invalidate related cache on success
  // NOTE: resource is a SvelteKit endpoint path — patterns must match cacheKey() output
  const resource = params.resource || "";
  if (resource.includes("purchase")) {
    await clearCachePattern("api:get:/api/purchase-invoices");
    await clearCachePattern("api:get:/api/store");
  }

  return res.clone?.().json?.();
}
