/**
 * This hook fires on EVERY request handled by the server side router.
 *
 * The request goes from here to the load functions and then back here and from here the response is sent back to the client
 *
 * So this is more like a controller in Laravel that is responsible for receiving the request, forwarding it to processors and then sending it back to the browsr
 */

import { parse } from "cookie";
import { api } from "$lib/helpers";
import scp from "set-cookie-parser";
import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handleSession } from "svelte-kit-cookie-session";
import { PUBLIC_VITE_BASE_API } from "$env/static/public";
import { handleDeviceDetector } from "sveltekit-device-detector";
import { VITE_SESSION_NAME, APP_SESSION_KEY } from "$env/static/private";

/**
 * In-memory cache for authenticated user details.
 * Avoids hitting the API on every single request.
 *
 * @type {Map<string, { user: import('$lib/types').AppUser, cachedAt: number }>}
 */
const userCache = new Map();
const USER_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

/**
 * Evict stale entries periodically to prevent memory leaks.
 * Runs at most once per minute.
 */
let lastEviction = 0;
function evictStaleCache() {
  const now = Date.now();
  if (now - lastEviction < 60_000) return;
  lastEviction = now;
  for (const [key, entry] of userCache) {
    if (now - entry.cachedAt > USER_CACHE_TTL_MS) {
      userCache.delete(key);
    }
  }
}

/**
 * Clear a specific user from cache (e.g. on logout or role change).
 * @param {string} sessionKey
 */
export function clearUserCache(sessionKey) {
  userCache.delete(sessionKey);
}

const sessionHandler = handleSession({
  secret: APP_SESSION_KEY,
  expires: 10, // 160 minutes
  expires_in: "minutes",
  saveUninitialized: true,
  rolling: 90, // 1 - 100 representing the percentage time that should have passed before renewing the expires time or true to refresh expires on every request
  init: () => ({ user: { is_active: false }, recently_purchased: false }),
});

async function logger({ event, resolve }) {
  const start_time = Date.now();

  //Await here. Run other hooks AND LOAD FUNCTIONS then come back here to continue
  const response = await resolve(event);

  if (dev && !event.request.url.includes("assets")) {
    console.log(`
      INTERNAL REQUEST: ${Date.now() - start_time}ms ${event.locals.deviceName} ${event.request.method} ${event.url.pathname}
    `);
  }
  return response;
}

async function getUserDetails({ event, resolve }) {
  const cookies = parse(event.request.headers.get("cookie") || "");
  const apiSessionKey = cookies[VITE_SESSION_NAME];
  await event.locals.session.update(() => ({ api_session: apiSessionKey }));

  if (!event.locals.session.data?.user?.email && !event.request.url.includes("assets")) {
    evictStaleCache();

    // Check cache first — avoid hitting the API on every request
    const cached = apiSessionKey ? userCache.get(apiSessionKey) : null;
    if (cached && Date.now() - cached.cachedAt < USER_CACHE_TTL_MS) {
      await event.locals.session.update(() => ({ user: cached.user }));
    } else {
      try {
        const response = await api({
          method: "get",
          resource: "user",
          event,
        });

        if (response?.ok) {
          const user = (await response?.json())?.data || { is_active: false };
          await event.locals.session.update(() => ({ user }));

          // Cache the user for subsequent requests
          if (apiSessionKey && user?.email) {
            userCache.set(apiSessionKey, { user, cachedAt: Date.now() });
          }
        }
      } catch (error) {
        // API unavailable - continue without user details, don't block the request
        console.error("Failed to get user details:", error.message);
      }
    }
  }

  event.locals.deviceName = event.locals.deviceType.isDesktop
    ? `${event.locals.deviceType?.mobileVendor || ""} ${event.locals.deviceType?.mobileModel || ""}`
    : `${event.locals.deviceType?.mobileVendor || ""} ${event.locals.deviceType?.mobileModel || ""} ${event.locals.deviceType?.osVersion || ""}`;

  return resolve(event);
}

async function authorize({ event, resolve }) {
  const user = event.locals.session.data?.user;
  const isAuthenticated = !!user?.email;
  const isAdmin = !!user?.is_admin;
  const path = event.url.pathname;

  /**
   * @auth Protect routes that need authentication
   * NOTE: 303 will always redirect with GET, 307 will redirect with the original request method, while 302 is just 303 made popular
   */
  if (["/user", "/admin"].some((prefix) => path.startsWith(prefix)) && !isAuthenticated) {
    redirect(303, "/login");
  }

  /**
   * @guest Protect guest routes — redirect authenticated users away
   */
  if (["/login", "/register"].some((route) => event.route.id?.includes(route)) && isAuthenticated) {
    redirect(303, isAdmin ? "/admin/dashboard" : "/store/products");
  }

  /**
   * @authorize Admin accessing user routes → force logout & re-login
   * Admins must not operate under user context. Destroy session so they
   * re-authenticate with the correct role/account.
   */
  if (path.startsWith("/user") && isAdmin) {
    const apiSessionKey = event.locals.session.data?.api_session;
    if (apiSessionKey) clearUserCache(apiSessionKey);
    await event.locals.session.destroy();
    event.cookies.delete(VITE_SESSION_NAME, { path: "/" });
    redirect(303, "/login");
  }

  /**
   * @authorize User accessing admin routes → redirect to user area
   * Regular users are silently bounced back to the store.
   */
  if (path.startsWith("/admin") && !isAdmin) {
    redirect(303, "/store/products");
  }

  return resolve(event);
}

async function addSecurityHeaders({ event, resolve }) {
  const securityHeaders = {
    //@see https://edoverflow.com/2023/sveltekit-security-headers/
    "Cross-Origin-Embedder-Policy": "credentialless",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    // 'Content-Security-Policy': 'script-src \'self\' \'nonce-Y70QFNhAVmer2wdobT8YoQ==\'',
    // 'Referrer-Policy': 'no-referrer',
    // 'Strict-transport-security': 'max-age=15552000; includeSubDomains',
    // 'X-Content-Type-Options': 'nosniff',
    // 'X-DNS-Prefetch-Control': 'off',
    // 'X-Download-Options': 'noopen',
    // 'X-Permitted-Cross-Domain-Policies': 'none',
    "X-Frame-Options": "SAMEORIGIN",
    "X-XSS-Protection": "0",
  };
  const response = await resolve(event);

  Object.entries(securityHeaders).forEach(([header, value]) => response.headers.set(header, value));

  /**
   * Centralized Cache-Control headers.
   * Individual routes should NOT set their own Cache-Control.
   *
   * - Vite hashed assets (/_app/immutable/): cache forever — filenames change on rebuild
   * - Other static files (.js, .css, images, fonts): short cache with revalidation
   * - HTML pages: always revalidate so new deploys are picked up immediately
   */
  const path = event.url.pathname;
  if (path.startsWith("/_app/immutable/")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/.test(path)) {
    response.headers.set("Cache-Control", "public, max-age=3600");
  } else if (!response.headers.has("Cache-Control") || response.headers.get("Cache-Control")?.includes("public")) {
    // Override any per-route public caching on HTML pages
    response.headers.set("Cache-Control", "private, no-cache");
  }

  return response;
}

export const handleFetch = async ({ request, fetch, event }) => {
  const response = await fetch(request);

  /**
   * @csrf Handle expired tokens and csrf expiry
   */
  if (response?.status == 419 && event.url.pathname.startsWith(PUBLIC_VITE_BASE_API)) {
    redirect(303, "/logout");
  }

  /**
   * @unauthenticated Handle expired authentication from the API
   */
  if ([401, 403].includes(response?.status)) {
    if (["wallet-balance", "api/v1/user"].every((url) => !response.url.includes(url))) {
      console.log("----------HOOKS------------", response.url, response);
    }

    if (["logout", "api/v1/user"].every((url) => !response.url.includes(url))) {
      const apiSessionKey = event.locals.session.data?.api_session;
      if (apiSessionKey) clearUserCache(apiSessionKey);
      await event.locals.session.destroy();

      redirect(303, "/logout");
    }
  }

  /** @type {import('set-cookie-parser').Cookie[]} */
  let cookies = scp.parse(response);

  // using a try catch block because when streaming data from the backend, cookies cannot be set after the response has started streaming and this throws an error
  try {
    //This will take care of updating the csrf cookies from our backend for us.
    if (cookies.length) {
      cookies.forEach((cookie) => {
        event.cookies.set(cookie.name, cookie.value, {
          ...cookie,
          sameSite: cookie.sameSite || "Lax",
          secure: !dev,
          httpOnly: cookie.httpOnly ?? true,
        });
      });
    }
  } catch (error) {
    // console.log(error);
  }

  return response;
};

export const handleError = async ({ event, error, message, status }) => {
  if (!event.url.pathname.includes("assets")) {
    console.log("------------SERVER ERROR-----------");
    console.error({
      error,
      event: {
        url: event.url.href,
        userEmail: event.locals.session.data?.user?.email || "anonymous",
      },
      message,
      status,
    });

    return {
      message,
      code: status ?? 500,
    };
  }
};

export const handle = sequence(sessionHandler, handleDeviceDetector({}), logger, getUserDetails, authorize, addSecurityHeaders);
