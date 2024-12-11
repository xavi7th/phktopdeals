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
import { env } from "$env/dynamic/public";
import { sequence } from "@sveltejs/kit/hooks";
import { handleSession } from "svelte-kit-cookie-session";
import { handleDeviecDetector } from "sveltekit-device-detector";
import { VITE_SESSION_NAME, APP_SESSION_KEY } from "$env/static/private";

const sessionHandler = handleSession({
  secret: APP_SESSION_KEY,
  expires: 10, // 160 minutes
  expires_in: "minutes",
  saveUninitialized: true,
  rolling: 90, // 1 - 100 representing the percentage time that should have passed before renewing the expires time or true to refresh expires on every request
  init: () => ({ user: {}, recently_purchased: false }),
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
  await event.locals.session.update(({ api_session }) => ({ api_session: cookies[VITE_SESSION_NAME] }));

  // console.log({reqUrl: event.url.pathname, user: event.locals.session.data, gettingDetails: !event.locals.session.data?.user?.email && !event.request.url.includes("assets")});
  if (!event.locals.session.data?.user?.email && !event.request.url.includes("assets")) {
    const getUserDetails = await api({
      method: "get",
      resource: "user",
      event,
    });

    if (getUserDetails?.status == 200) {
      //TODO: Set a localStorage with key user and expiration time for 5mins. If that key is present, no need to getUserDetails. @see https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
      await event.locals.session.update(async ({ user }) => ({ user: (await getUserDetails?.json())?.data || {} })); //use this to determine auth on frontend. Before accessing auth routes if this is null redirect to login page
    }
  }

  event.locals.deviceName = event.locals.deviceType.isDesktop
    ? `${event.locals.deviceType?.mobileVendor || ""} ${event.locals.deviceType?.mobileModel || ""}`
    : `${event.locals.deviceType?.mobileVendor || ""} ${event.locals.deviceType?.mobileModel || ""} ${event.locals.deviceType?.osVersion || ""}`;

  return resolve(event);
}

function authorize({ event, resolve }) {
  /**
   * @auth Protect routes that need authentication
   * NOTE: 303 will always redirect with GET, 307 will redirect with the original request method, while 302 is just 303 made popular
   */
  if (["/user", "/admin"].some((forbiddenUrlPattern) => event.url.pathname.startsWith(forbiddenUrlPattern)) && !event.locals.session.data?.user?.full_name) {
    redirect(303, "/login");
  }

  /**
   * @guest Protect guest routes
   */
  if (["/login", "/register"].some((guestRoutes) => event.route.id?.includes(guestRoutes)) && event.locals.session.data?.user?.full_name) {
    if (event.locals.session.data?.user?.is_admin) {
      redirect(303, "/admin/dashboard");
    }
    redirect(303, "/store/products");
  }
    /**
   * @authorize Protect User routes from admins
   */
    if (event.url.pathname.startsWith("/user") && event.locals.session.data?.user?.is_admin) {
      redirect(303, "/admin/dashboard");
    }
  
    /**
     * @authorize Protect Admin routes
     */
    if (event.url.pathname.startsWith("/admin") && !event.locals.session.data?.user?.is_admin) {
      redirect(303, "/logout");
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
  
    return response;
  }

export const handleFetch = async ({ request, fetch, event }) => {
  const response = await fetch(request);

  /**
   * @csrf Handle expired tokens and csrf expiry
   */
  if (response?.status == 419 && event.url.pathname.startsWith(env.PUBLIC_VITE_BASE_API)) {
    redirect(303, "/logout");
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
          sameSite: cookie.sameSite,
          secure: !dev,
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
        locals: JSON.stringify(event.locals, null, 4),
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

export const handle = sequence(sessionHandler, handleDeviecDetector({}), logger, getUserDetails, authorize, addSecurityHeaders);
