import { api } from '$lib/helpers';
import { fail } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

  const fetchESimCards = async () => {
    const res = await api({
			method: 'get',
			resource: 'games',
      event,
      logResponse: true,
		});

    return res?.json();
  }

	const [cardsData] = await Promise.all([
    fetchESimCards(),
	]);

  // event.setHeaders({
    //   'Cache-Control': 'public, max-age=604800',
    // });

    return {
    /** @type { import('$lib/types').Product[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
  }
}

/** @satisfies {import('./$types').Actions} */
 export const actions = {

  /** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async (event) => {

    const res = await api({
			method: 'post',
			resource: 'games',
			data: [],
      event,
		});

    if (res?.status == 422) {
      let errRes = await res.json();

      return fail(res?.status || 400, {type: 'error', msg: 'There are errors in your form! Check them and try again.', errors: errRes.errors});
		}

    if ( ! res?.ok) {
      return fail(res?.status || 500, {message: res?.statusText || 'An error occurred while processing your request'});
    }

		return {type: 'success', msg: 'Card created successfully!'};
	},
}
