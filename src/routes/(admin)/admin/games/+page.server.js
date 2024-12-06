import { api } from '$lib/helpers';
import { fail } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

  const fetchGamesCards = async () => {
    const res = await api({
			method: 'get',
			resource: 'products/type/game',
      event,
		});

    return res?.json();
  }

	const [cardsData] = await Promise.all([
    fetchGamesCards(),
	]);

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

    return {
    /** @type { import('$lib/types').Product[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
  }
}

/** @satisfies {import('./$types').Actions} */
 export const actions = {
  /** @param {import('@sveltejs/kit').RequestEvent} event */
	delete: async ( event ) => {

    const formData = await event.request.formData();

    const res = await api( {
      method: 'DELETE',
      resource: 'products/'+formData.get('product_id'),
      event,
    } );

    if ( res?.status == 422 ) {
      let errRes = await res.json();

      return fail( res?.status || 400, { type: 'error', msg: 'There are errors in your form! Check them and try again.', errors: errRes.errors } );
    }

    if ( !res?.ok ) {
      return fail( res?.status || 500, { message: res?.statusText || 'An error occurred while processing your request' } );
    }

    return { type: 'success', msg: 'Card deleted successfully!' };
  },
}