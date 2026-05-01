import { browser } from "$app/environment";
import { getCache, getStaleCache, setCache, cacheKey, CACHE_TTL } from "$lib/cache";
import { cartStore } from "$stores/cartStore.js";

const HOME_KEY = cacheKey("GET", "", {});

export async function load({ data }) {
  if (!browser) return {};

  // Check if user just logged in — merge guest cart if so
  if (sessionStorage.getItem("phk_just_logged_in")) {
    sessionStorage.removeItem("phk_just_logged_in");
    // Fire and forget — don't block page load
    cartStore.mergeOnLogin().then((success) => {
      if (success) {
        // Trigger a reactive update so cart badge refreshes
        cartStore.syncFromServer(data?.cartItems ?? []);
      }
    });
  }

  // If server data arrived and no API error, cache it in the background
  if (data?.pageData && !data?.apiError) {
    Promise.resolve(data.pageData).then((resolved) => {
      if (resolved && !resolved.error) {
        setCache(HOME_KEY, resolved, CACHE_TTL.STATIC);
      }
    });
    return {};
  }

  // Server load failed (API down) — try IndexedDB
  const fresh = await getCache(HOME_KEY);
  if (fresh) return { pageData: Promise.resolve(fresh) };

  const stale = await getStaleCache(HOME_KEY);
  if (stale) return { pageData: Promise.resolve(stale) };

  return {};
}
