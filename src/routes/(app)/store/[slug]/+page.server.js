import { api } from '$lib/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  console.log(event.params.slug.split('_'));

  const fetchProductDetails = async () => {
    const res = await api( {
      method: 'get',
      resource: 'products/' + event.params.slug.split('_')[1],
      event
    } );

    return res?.json();
  }

  const [details] = await Promise.all( [
    fetchProductDetails(),
  ] );

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

  return {
    /** @type { import('$lib/types').Product[] } */
    product: details.data,
  }
}
