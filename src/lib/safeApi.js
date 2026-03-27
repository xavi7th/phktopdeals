/**
 * Safe API wrapper with error handling.
 *
 * NOTE: This file uses raw fetch (browser-compatible).
 * The server-only api() helper is in $lib/server/api-helpers.
 */

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
