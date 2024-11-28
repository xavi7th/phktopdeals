import { api } from '$lib/helpers';
import { arktype } from 'sveltekit-superforms/adapters';
import { GiftCardDefaults , GiftCardSchema, brandSchema, brandDefaults, brandEditSchema, brandEditDefault} from '$lib/schemas';
import { message, superValidate, fail, setError } from 'sveltekit-superforms';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

  // const form = await superValidate(arktype(giftCardSchema, { defaults: giftCardDefaults }));
  const brandForm = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));
  
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

  const form = await superValidate(productData.data, arktype(GiftCardSchema, { defaults: GiftCardDefaults }));

  // form.data = productData.data

  return {
    form,
    brandForm,
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
  createBrand: async (event) => {
    const form = await superValidate(event, arktype(brandSchema, { defaults: brandDefaults }));

    if (!form.valid) {
      return fail(422, { form });
    }

    const formData = new FormData();

    for(let dt of Object.entries(form.data)){
      formData.append(dt[0], dt[1]);
    }

    const res = await api({
			method: 'post',
			resource: 'product-brands',
			data: formData,
      event,
      toJSON: false,
		});

    if (res?.status == 422) {
      let errRes = await res.json();

      for(const [fieldName, errs] of Object.entries(errRes.errors)){
        if (fieldName.includes('.')) {
          setError(form, fieldName.split('.')[0], errs[0], {
            overwrite: true
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true
          });
        }
      }

      return message(form, {type: 'error', msg: 'There are errors in your form! Check them and try again.'}, {status: res?.status || 400});
		}

    if ( ! res?.ok) {
      return message(form, {type: 'error', msg: res?.statusText || 'An error occured while processing your request'}, {status: res?.status || 429});
    }

		return message(form, {type: 'success', msg: 'Brand created successfully!'});
	},

  /** @param {import('@sveltejs/kit').RequestEvent} event */
  editBrand: async (event) => {
    const form = await superValidate(event, arktype(brandEditSchema, { defaults: brandEditDefault }));

    if (!form.valid) {
      return fail(422, { form });
    }

    // const formData = new FormData();

    let uuid = form.data.uuid;
    // if(uuid){
    //   delete form?.data?.uuid;
    // }

    // for(let dt of Object.entries(form.data)){
    //   formData.append(dt[0], dt[1]);
    // }

    const res = await api({
			method: 'PUT',
			resource: 'product-brands/'+uuid,
			data: form.data,
      event,
      toJSON: true,
		});

    if (res?.status == 422) {
      let errRes = await res.json();

      for(const [fieldName, errs] of Object.entries(errRes.errors)){
        if (fieldName.includes('.')) {
          setError(form, fieldName.split('.')[0], errs[0], {
            overwrite: true
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true
          });
        }
      }

      return message(form, {type: 'error', msg: 'There are errors in your form! Check them and try again.'}, {status: res?.status || 400});
		}

    if ( ! res?.ok) {
      return message(form, {type: 'error', msg: res?.statusText || 'An error occured while processing your request'}, {status: res?.status || 429});
    }

		return message(form, {type: 'success', msg: 'Brand was Updated successfully!'});
	},

  /** @param {import('@sveltejs/kit').RequestEvent} event */
  deleteBrand: async ( event ) => {
    const form = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));
    const formData = await event.request.formData();

    const res = await api( {
      method: 'delete',
      resource: 'product-brands/'+formData.get('uuid'),
      event,
    } );

    if (res?.status == 422) {
      let errRes = await res.json();

      for(const [fieldName, errs] of Object.entries(errRes.errors)){
        if (fieldName.includes('.')) {
          setError(form, fieldName.split('.')[0], errs[0], {
            overwrite: true
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true
          });
        }
      }

      return message(form, {type: 'error', msg: 'There are errors in your form! Check them and try again.'}, {status: res?.status || 400});
		}

    if ( ! res?.ok) {
      return message(form, {type: 'error', msg: res?.statusText || 'An error occured while processing your request'}, {status: res?.status || 429});
    }

    return message(form, {type: 'success', msg: 'Brand was Updated successfully!'});
  },
}