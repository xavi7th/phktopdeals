/**
 * This hook fires on EVERY request made on the client side router.
 *
 * The request goes from here to the load functions and then back here and from here the response is sent back to the client
 *
 * So this is more like a controller in Laravel that is responsible for receiving the request, forwarding it to processors and then sending it back to the browsr
 */

import { dev } from "$app/environment";
import { initCache, cleanExpiredCache } from "$lib/cache";
import { browser } from "$app/environment";
import { registerServiceWorker } from "$lib/registerServiceWorker";

// Initialize cache on client-side load
if (browser) {
  registerServiceWorker();

  initCache().then(() => {
    if (dev) console.log("IndexedDB cache initialized");

    // Clean expired entries every 5 minutes
    setInterval(
      () => {
        cleanExpiredCache();
      },
      5 * 60 * 1000,
    );
  });
}

/** @type {import('@sveltejs/kit').HandleClientError} */
export const handleError = ({ event, error, message, status }) => {
  if (dev) {
    console.log("------------CLIENT ROUTING ERROR-----------");
    console.error({ event, error, message, status });
  }
  if (!event.url.pathname.includes("assets")) {
    return {
      message: message ?? "Oops",
      code: status ?? 500,
    };
  }
};
