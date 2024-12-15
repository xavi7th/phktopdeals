import { api } from "$lib/helpers";

export async function load(event) {
  const fetchProducts = async () => {
    const res = await api({
      method: "get",
      resource: "products?cursor=" + event.params.slug,
      event,
    });

    return await res?.json();
  };

  event.setHeaders({
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });

  const [productsData] = await Promise.all([fetchProducts()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    products: productsData.data,
    meta: productsData.metadata,
  };
}
