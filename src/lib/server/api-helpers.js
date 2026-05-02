/**
 * Server-side API helpers.
 *
 * Import this directly in server-side files (.server.js, +page.server.js, hooks.server.js).
 * For client-safe helpers, use `import { ... } from "$lib/helpers"`.
 */

import { dev } from "$app/environment";
import { APP_LOG_API_RESPONSES_BY_DEFAULT } from "$env/static/private";
import { PUBLIC_APP_COMMISSION_AMOUNT, PUBLIC_VITE_BASE_API, PUBLIC_VITE_BASE_DOMAIN, PUBLIC_VITE_FRONT_END_DOMAIN } from "$env/static/public";
import { hasFile, toCurrency } from "$lib/helpers";
import { getLogger } from "./dev-logger";

export { hasFile, toCurrency };

// Retry configuration for GET requests
const RETRY_DELAYS = [1000, 2000, 4000, 8000];
const FIXED_DELAY = 30000;
const MAX_EXPONENTIAL_RETRIES = 4;
const retryTracker = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelay(url) {
  const count = retryTracker.get(url) || 0;
  if (count >= MAX_EXPONENTIAL_RETRIES) return FIXED_DELAY;
  return RETRY_DELAYS[count] || FIXED_DELAY;
}

function incrementRetry(url) {
  retryTracker.set(url, (retryTracker.get(url) || 0) + 1);
}

function resetRetry(url) {
  retryTracker.delete(url);
}

/**
 * Custom function to set API headers and make API calls.
 * Uses the file logger for all dev-mode output.
 *
 * @param {import('$lib/types').ApiParams} params
 * @returns {Promise<Response|undefined>}
 */
export async function api({ toBaseDomain, resource, event, method, data, logResponse = JSON.parse(APP_LOG_API_RESPONSES_BY_DEFAULT), ignoreErrors = false, extraHeaders = {} }) {
  const base = PUBLIC_VITE_BASE_DOMAIN;
  const baseApi = PUBLIC_VITE_BASE_API;
  let fullurl = toBaseDomain ? base : baseApi;

  /** @type {import('$lib/types').ApiHeaders} */
  let headers = {
    accept: "application/json",
    "accept-encoding": event.request?.headers?.get("accept-encoding") || "",
    "accept-language": event.request?.headers?.get("accept-language") || "",
    connection: event.request?.headers?.get("connection") || "",
    cookie: event.request?.headers?.get("cookie") || "",
    host: event.request?.headers?.get("host") || "",
    referer: event.request?.headers?.get("referer") || event.request?.url || "",
    origin: event.request?.headers?.get("origin") || PUBLIC_VITE_FRONT_END_DOMAIN,
    "x-xsrf-token": event.cookies?.get("XSRF-TOKEN") || "",
    "sec-ch-ua": event.cookies?.get("sec-ch-ua") || "",
    "sec-ch-ua-mobile": event.cookies?.get("sec-ch-ua-mobile") || "",
    "sec-ch-ua-platform": event.cookies?.get("sec-ch-ua-platform") || "",
    "user-agent": event.cookies?.get("user-agent") || "",
    "x-sveltekit-action": event.cookies?.get("x-sveltekit-action") || false,
    ...extraHeaders,
  };

  const isFormData = data instanceof FormData;
  const hasFiles = isFormData && hasFile(data);

  if (!hasFiles) {
    headers["content-type"] = "application/json";
    data = data ? JSON.stringify(isFormData ? Object.fromEntries(data) : data) : null;
  }

  if (resource) {
    fullurl += resource;
  }

  const log = getLogger();
  if (dev && logResponse) {
    if (log) {
      log.info("API Request", { method: method.toUpperCase(), url: fullurl });
    } else {
      if (dev) {
        console.error("--------------- API Request: " + method.toUpperCase() + " " + fullurl);
      }
    }
  }

  let response;
  const isGetRequest = method?.toUpperCase() === "GET";

  const attemptFetch = async () => {
    return await event?.fetch(fullurl, {
      method: method,
      headers,
      body: data || null,
    });
  };

  try {
    if (isGetRequest) {
      // Retry loop for GET requests
      let attempt = 0;
      let lastError;

      while (attempt <= MAX_EXPONENTIAL_RETRIES) {
        try {
          response = await attemptFetch();

          // Don't retry on 4xx errors
          if (response?.status >= 400 && response?.status < 500) {
            break;
          }

          // Retry on network errors (response is undefined) or 5xx errors
          if (!response?.ok) {
            lastError = response;
            const delay = getRetryDelay(fullurl);

            if (log) {
              log.warning("API request failed, retrying", {
                url: fullurl,
                status: response?.status,
                attempt: attempt + 1,
                delay,
              });
            }

            incrementRetry(fullurl);
            attempt++;
            await sleep(delay);
            continue;
          }

          // Success - reset retry counter and break
          resetRetry(fullurl);
          break;
        } catch (err) {
          lastError = err;
          const delay = getRetryDelay(fullurl);

          if (log) {
            log.warning("API request error, retrying", {
              url: fullurl,
              error: err.message,
              attempt: attempt + 1,
              delay,
            });
          }

          incrementRetry(fullurl);
          attempt++;
          await sleep(delay);
        }
      }

      // If all retries failed, use the last error response
      if (!response?.ok && lastError) {
        response = lastError;
      }
    } else {
      // Non-GET requests: no retry (mutations should fail fast)
      response = await attemptFetch();
    }
  } catch (err) {
    if (ignoreErrors) {
      return undefined;
    }

    if (log) {
      log.warning("API unreachable", { url: fullurl, error: err.message });
    } else {
      if (dev) console.error("--------------- API Error: " + err.message);
    }

    return {
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: async () => ({ error: "API server is unavailable", message: err.message }),
      text: async () => JSON.stringify({ error: "API server is unavailable", message: err.message }),
      url: fullurl,
    };
  }

  if (dev && logResponse) {
    const rsp = await response?.clone();
    const body = [205, 204].includes(rsp?.status) ? null : await rsp?.text();
    if (log) {
      log.info("API Response", { status: rsp?.status, url: fullurl, body });
    } else {
      if (dev) {
        console.error("--------------- API Response: ");
        console.error({ status: rsp?.status, body }, "\n\n");
      }
    }
  }

  return response;
}

/**
 * Full server-side percentage calculation with PUBLIC_APP_COMMISSION_AMOUNT support.
 *
 * @param {number | string} unit_price
 * @param {number | string} quantity
 * @param {number | string} commission
 * @param {number | string} discount
 * @param {boolean} numeric - if true, return raw number instead of currency string
 * @param {boolean} shouldTopUp
 * @returns {string | number}
 */
export const percentageCalculation = (unit_price = 0, quantity = 1, commission = 0, discount = 0, numeric = false, shouldTopUp = false) => {
  let amount_to_pay = Number(unit_price) * Number(quantity);

  if (commission <= 0) {
    amount_to_pay = (Number(unit_price) + (shouldTopUp ? Number(PUBLIC_APP_COMMISSION_AMOUNT) : 0)) * Number(quantity);
  } else {
    amount_to_pay = (Number(unit_price) + (shouldTopUp ? Number(commission) : 0)) * Number(quantity);
  }

  if (discount) {
    amount_to_pay = Number(amount_to_pay) - (amount_to_pay * discount) / 100;
  }

  return numeric ? amount_to_pay : toCurrency(amount_to_pay);
};
