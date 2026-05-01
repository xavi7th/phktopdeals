import { apiStatus } from "$lib/stores/apiStatus";
import { browser } from "$app/environment";

/**
 * fetch() wrapper that auto-updates the apiStatus store.
 * Use this for ALL client-side API calls.
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export async function trackedFetch(url, options = {}) {
  if (!browser) return fetch(url, options);

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      apiStatus.setOnline();
    } else if (response.status >= 500) {
      apiStatus.setOffline(`Server error ${response.status}`);
    }
    // 4xx errors (validation, auth) are not API health issues — don't report

    return response;
  } catch (err) {
    apiStatus.setOffline(err?.message ?? "Network error");
    throw err;
  }
}
