import { api } from '$lib/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

  const fetchProducts = async () => {
    const res = await api({
			method: 'get',
			resource: 'products',
      event,
		});

    return res?.json();
  }

	const [productsData] = await Promise.all([
    fetchProducts(),
	]);

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

  return {
    /** @type { import('$lib/types').Product[] } */
    products: productsData.data,
    meta: productsData.metadata,
  }
}
