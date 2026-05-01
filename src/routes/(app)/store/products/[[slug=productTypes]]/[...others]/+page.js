import { browser } from "$app/environment";
import { getCache, getStaleCache, setCache, cacheKey, CACHE_TTL } from "$lib/cache";

export async function load({ data, url }) {
  if (!browser) return {};

  // Build a cache key that includes slug + query params
  const slug = url.pathname;
  const params = Object.fromEntries(url.searchParams);
  const key = cacheKey("GET", "products", { slug, ...params });

  if (data?.products) {
    Promise.resolve(data.products).then((resolved) => {
      if (resolved && !resolved.error) setCache(key, resolved, CACHE_TTL.PRODUCTS);
    });
    return {};
  }

  const fresh = await getCache(key);
  if (fresh) return { products: Promise.resolve(fresh) };

  const stale = await getStaleCache(key);
  if (stale) return { products: Promise.resolve(stale) };

  return {};
}
