import { api } from '$lib/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load ( event ) {

  const fetchSections = async () => {
    const res = await api( {
      method: 'get',
      resource: '',
      event,
    } );

    return res?.json();
  }

  const [sectionsData] = await Promise.all( [
    fetchSections(),
  ] );

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

  return {
    /** @type { import('$lib/types').Product[] } */
    sections: sectionsData.data,
  }
}
