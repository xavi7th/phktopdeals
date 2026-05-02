import { api } from "$lib/server/api-helpers";
import { assertAdmin } from "$lib/server/auth";
import { apiStatus } from "$lib/stores/apiStatus";

export async function load(event) {
  assertAdmin(event);
  const dateFrom = event.url.searchParams.get("date_from");
  const dateTo = event.url.searchParams.get("date_to");
  const queryParams = dateFrom && dateTo ? `?date_from=${dateFrom}&date_to=${dateTo}` : "";

  const fetchProducts = async () => {
    const res = await api({
      method: "get",
      resource: "products" + queryParams,
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
