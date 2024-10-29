import { type } from 'arktype';
import { api } from '$lib/helpers';
import { arktype } from 'sveltekit-superforms/adapters';
import { message, superValidate, fail, setError } from 'sveltekit-superforms';

const schema = type({
  product_name: type("string>1").describe("not be empty"),
  product_type: ["string>1", "@", "selected"], //optional syntax
  product_image: "File?",
  product_category: ["string[]>1", "@", "2 and above"],
  "product_min_price?": "number",
  percentage_discount: "0<=number<100",
  purchase_commission: "0<number<100",
  variable_denomination: "boolean?",
  'price_denominations?': "number[]",
  "discount_until?": "Date|null",
});

const defaults = {
  product_name: '',
  product_type: '',
  product_image: null,
  product_category: [''],
  price_denominations: [0],
  product_min_price: 0,
  percentage_discount: 0,
  purchase_commission: 5,
  variable_denomination: false,
  discount_until: null,
};



/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const form = await superValidate(arktype(schema, { defaults }))

  event.setHeaders({
    'Cache-Control': 'public, max-age=604800',
  });

  return { form }
}

/** @satisfies {import('./$types').Actions} */
 export const actions = {

  /** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async (event) => {
    const form = await superValidate(event, arktype(schema, { defaults }));

    if (!form.valid) {
      return fail(422, { form });
    }

    const formData = new FormData();

    for(let dt of Object.entries(form.data)){
      formData.append(dt[0], dt[1]);
    }

    const res = await api({
			method: 'post',
			resource: 'gift-cards',
			data: formData,
      event,
      toJSON: false,
      logResponse: true,
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
      return fail(res?.status || 500, {message: res?.statusText || 'An error occured while processing your request'});
    }

		return message(form, {type: 'success', msg: 'Card created successfully!'});
	},
}
