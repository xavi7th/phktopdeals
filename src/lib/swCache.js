import { browser } from "$app/environment";

/**
 * Clear the SW pages cache (phk-pages-v2).
 * Call this on logout to prevent one user's data leaking to the next user on a shared device.
 */
export async function clearSwPageCache() {
  if (!browser || !("caches" in window)) return;
  try {
    await caches.delete("phk-pages-v2");
  } catch {
    // Ignore — SW not available or cache API blocked
  }
}

/**
 * Clear SW pages cache by messaging the SW.
 * Use this as an alternative if caches.delete() isn't available.
 */
export async function clearSwPageCacheViaMessage() {
  if (!browser || !navigator.serviceWorker?.controller) return;
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => resolve();
    navigator.serviceWorker.controller.postMessage({ type: "CLEAR_PAGES_CACHE" }, [channel.port2]);
    setTimeout(resolve, 1000); // don't block logout if SW doesn't respond
  });
}
