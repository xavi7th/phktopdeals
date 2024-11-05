import { api } from '$lib/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

  console.log(event.params);


  const fetchProducts = async () => {
    const res = await api({
			method: 'get',
			resource: 'products?cursor=' + event.params.slug,
      event,
		});

    return res?.json();
  }

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

	const [productsData] = await Promise.all([
    fetchProducts(),
	]);

  return {
    /** @type { import('$lib/types').Product[] } */
    products: productsData.data,
    meta: productsData.metadata,
  }
}
