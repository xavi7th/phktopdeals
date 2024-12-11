import { api } from '$lib/helpers';
import { fail } from '@sveltejs/kit';

export async function load ( event ) {

  const fetchTopUps = async () => {
    const res = await api( {
      method: 'get',
      resource: 'products/type/top-up',
      event,
    } );

    return res?.json();
  }

  const [cardsData] = await Promise.all( [
    fetchTopUps(),
  ] );

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

  return {
    /** @type { import('$lib/types').Product[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
  }
}

export const actions = {
  delete: async ( event ) => {

    const formData = await event.request.formData();

    const res = await api( {
      method: 'delete',
      resource: 'products/'+formData.get('uuid'),
      event,
    } );

    if ( res?.status == 422 ) {
      let errRes = await res.json();

      return fail( res?.status || 400, { type: 'error', msg: 'There are errors in your form! Check them and try again.', errors: errRes.errors } );
    }

    if ( !res?.ok ) {
      return fail( res?.status || 500, { message: res?.statusText || 'An error occured while processing your request' } );
    }

    return { type: 'success', msg: 'Card created successfully!' };
  },
}