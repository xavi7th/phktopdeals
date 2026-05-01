import { browser } from "$app/environment";
import { getCache, getStaleCache, setCache, cacheKey, CACHE_TTL } from "$lib/cache";

export async function load({ data, params }) {
  if (!browser) return {};

  const key = cacheKey("GET", `products/${params.productId}`, {});

  if (data?.product) {
    Promise.resolve(data.product).then((resolved) => {
      if (resolved && !resolved.error) setCache(key, resolved, CACHE_TTL.PRODUCTS);
    });
    return {};
  }

  const fresh = await getCache(key);
  if (fresh) return { product: Promise.resolve(fresh) };

  const stale = await getStaleCache(key);
  if (stale) return { product: Promise.resolve(stale) };

  return {};
}
