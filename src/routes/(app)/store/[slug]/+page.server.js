import { api } from '$lib/helpers';
import { arktype } from 'sveltekit-superforms/adapters';
import { PurchaseItemDefaults , PurchaseItemSchema} from '$lib/schemas';
import { message, superValidate, fail, setError } from 'sveltekit-superforms';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const form = await superValidate(arktype(PurchaseItemSchema, { defaults: PurchaseItemDefaults }));

  const fetchProductDetails = async () => {
    const res = await api( {
      method: 'get',
      resource: 'products/' + event.params.slug.split('_')[1],
      event,
    } );

    return res?.json();
  }

  const [details] = await Promise.all( [
    fetchProductDetails(),
  ] );

  if (! details.data) {
    error(404);
  }

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

  return {
    form,
    /** @type { import('$lib/types').Product } */
    product: details.data,
    user: event.locals.user
  }
}
