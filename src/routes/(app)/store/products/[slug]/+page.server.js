import { api } from '$lib/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load ( event ) {
  console.log(event.params.slug);

  const fetchGiftCards = async () => {
    const res = await api( {
      method: 'get',
      resource: 'store/' + event.params.slug,
      event,
    } );
    return res?.json();
  }

  const [cardsData] = await Promise.all( [
    fetchGiftCards(),
  ] );

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

  return {
    /** @type { import('$lib/types').ProdSummary[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
    category: event.params.slug
  }
}
