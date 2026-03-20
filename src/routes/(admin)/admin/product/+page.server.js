import { api } from "$lib/helpers";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const fetchProducts = async () => {
    const res = await api({
      method: "get",
      resource: "products",
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [productsData] = await Promise.all([fetchProducts()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    products: productsData.data,
    meta: productsData.metadata,
    apiError: productsData.apiError,
  };
}
