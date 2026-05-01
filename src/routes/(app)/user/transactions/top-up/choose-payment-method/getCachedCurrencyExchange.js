import { getShared, setShared } from "$lib/server/cache-store";
import { cachedApiGet } from "$lib/server/cached-api";
import { logWithLocation as serverLog } from "$lib/server/dev-logger";

const EXCHANGE_RATE_KEY = "exchange-rates:USD";
const EXCHANGE_RATE_TTL_MS = 1000 * 60 * 60 * 5; // 5 hours

/** @param {import('./$types').PageServerLoadEvent} event */
export async function getCachedExchangeRate(event) {
  const cached = getShared(EXCHANGE_RATE_KEY);
  if (cached) {
    return { ...cached, fromCache: true };
  }

  const response = await event.fetch("https://api.exchangerate-api.com/v4/latest/USD").catch((err) => {
    serverLog("Exchange rate API unreachable", { error: err.message });
    return { ok: false, error: "Exchange rate API unavailable" };
  });

  if (!response.ok) {
    return {
      rate: null,
      lastUpdated: "Unavailable",
      fromCache: false,
      apiError: true,
    };
  }

  /** @type {import('$lib/types').ExchangeRate} */
  const data = await response.json();

  const rateData = {
    rate: data.rates.NGN + 150,
    lastUpdated: new Date().toLocaleTimeString(),
  };

  setShared(EXCHANGE_RATE_KEY, rateData, EXCHANGE_RATE_TTL_MS);

  return {
    ...rateData,
    fromCache: false,
  };
}

/** @param {import('./$types').PageServerLoadEvent} event */
export async function getNOWAvailableCurrencies(event) {
  const data = await cachedApiGet({
    resource: "user-transactions/available-currencies",
    event,
    cacheKey: "currencies",
  });

  if (!data) return [];
  return data.data;
}
