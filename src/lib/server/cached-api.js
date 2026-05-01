import { getShared, setShared } from "$lib/server/cache-store";
import { api } from "$lib/server/api-helpers";

/**
 * GET from API with server-side in-memory cache.
 * Only use for public, user-agnostic endpoints.
 *
 * @param {{ resource: string, event: any, cacheKey?: string }} opts
 * @returns {Promise<any|null>}
 */
export async function cachedApiGet({ resource, event, cacheKey }) {
  const key = cacheKey ?? resource;
  const hit = getShared(key);
  if (hit !== null) return hit;

  const res = await api({ method: "get", resource, event });

  if (!res?.ok) return null;

  const data = await res.json();
  setShared(key, data);
  return data;
}
