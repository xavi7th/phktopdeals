import { api } from "$lib/helpers";

let lastFetchTime = 0;
let cachedData = null;
let cachedCurrencies = null;
const CACHE_DURATION = 1000 * 60 * 60 * 5; // 5 hours in milliseconds

/** @param {import('./$types').PageServerLoadEvent} event */
export async function getCachedExchangeRate(event) {
  const now = Date.now();

  if (cachedData && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return {
      ...cachedData,
      fromCache: true,
    };
  }

  const response = await event.fetch("https://api.exchangerate-api.com/v4/latest/USD").catch((error) => {
    console.error("api.exchangerate-api NOT AVAILABLE AT THE MOMENT", error);
    return { ok: false, error: "Exchange rate API unavailable" };
  });

  if (!response.ok) {
    // Return fallback instead of throwing
    return {
      rate: null,
      fromCache: false,
      lastUpdated: "Unavailable",
      apiError: true,
    };
  }

  /** @type {import('$lib/types').ExchangeRate} */
  const data = await response.json();

  cachedData = {
    rate: data.rates.NGN + 150,
    lastUpdated: new Date().toLocaleTimeString(),
  };

  lastFetchTime = now;

  return {
    ...cachedData,
    fromCache: false,
  };
}

/** @param {import('./$types').PageServerLoadEvent} event */
export async function getNOWAvailableCurrencies(event) {
  const now = Date.now();

  if (cachedCurrencies && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return cachedCurrencies.data;
  }

  const res = await api({
    method: "get",
    resource: "user-transactions/available-currencies",
    event,
  });

  // Handle API unavailable - return empty array instead of throwing
  if (!res?.ok) {
    return [];
  }

  const currencies = await res.json();

  lastFetchTime = now;
  cachedCurrencies = currencies;

  return currencies.data;
}
