import { api } from '$lib/helpers';
import { arktype } from 'sveltekit-superforms/adapters';
import { gameSchema , gameDefaults } from '$lib/schemas';
import { message, superValidate, fail, setError } from 'sveltekit-superforms';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const fetchProduct = async () => {
    const res = await api({
      method: 'get',
			resource: 'products/'+event.params.slug,
      event,
		});
    
    return res?.json();
  }
  
  const fetchProductBrands = async () => {
    const res = await api({
			method: 'get',
			resource: 'product-brands',
      event,
		});

    return res?.json();
  }

  const fetchCategories = async () => {
    const res = await api({
			method: 'get',
			resource: 'product-categories',
      event,
		});

    return res?.json();
  }

  const fetchRegions = async () => {
    const res = await api({
			method: 'get',
			resource: 'regions',
      event,
		});

    return res?.json();
  }

  event.depends('games');
  event.depends('brandlist');
	const [productData, categoriesData, brandsData, regionsData] = await Promise.all([
    fetchProduct(),
	  fetchCategories(),
    fetchProductBrands(),
	  fetchRegions(),
	]);

  // event.setHeaders({
  //   'Cache-Control': 'public, max-age=604800',
  // });
  
  // the reason why cache is disabled is because of the invalidate
  // when invalidate refetch data, it restores data once deleted
  event.setHeaders({
    'Cache-Control': 'no-cache',
  });

  productData.data['price_denominations'] = productData.data.product_price.denominations;

  console.log(productData.data);

  const form = await superValidate(productData.data, arktype(gameSchema, { defaults: gameDefaults }));

  return {
    form,
    /** @type {string[]} */
    categories: categoriesData.data,
    /** @type {import('$lib/types').ProductBrand[] } */
    brands: brandsData.data,
    /** @type {import('$lib/types').ProductRegions[]} } */
    regions: regionsData.data,
  }
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  /** @param {import('@sveltejs/kit').RequestEvent} event */
  edit: async (event) => {
    const form = await superValidate( event, arktype( gameSchema, { defaults: gameDefaults } ) );

    if ( !form.valid ) {
      return fail( 422, { form } );
    }

    const formData = new FormData();

    for ( let dt of Object.entries( form.data ) ) {
      formData.append( dt[0], dt[1] );
    }

    formData.append( '_method', 'PUT' );

    const res = await api( {
      method: 'post',
      resource: 'products/'+event.params.slug,
      data: formData,
      event,
      toJSON: false,
    } );

    if ( res?.status == 422 ) {
      let errRes = await res.json();

      for ( const [fieldName, errs] of Object.entries( errRes.errors ) ) {
        if ( fieldName.includes( '.' ) ) {
          setError( form, fieldName.split( '.' )[0], errs[0], {
            overwrite: true
          } );
        } else {
          setError( form, fieldName, errs[0], {
            overwrite: true
          } );
        }
      }

      return message( form, { type: 'error', msg: 'There are errors in your form! Check them and try again.' }, { status: res?.status || 400 } );
    }

    if ( !res?.ok ) {
      return message( form, { type: 'error', msg: res?.statusText || 'An error occurred while processing your request' }, { status: res?.status || 429 } );
    }

    event.locals.user = ( await res.json() ).data;

    return message( form, { type: 'success', msg: 'Profile updated successfully!' } );
	},
}