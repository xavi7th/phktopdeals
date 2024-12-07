import { api } from "$lib/helpers";
import { superValidate } from "sveltekit-superforms";
import { arktype } from "sveltekit-superforms/adapters";
import { brandDefaults, brandSchema } from "$lib/schemas";

export async function load(event) {
  const form = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));

  const fetchProductBrands = async () => {
    const res = await api({
      method: "get",
      resource: "product-brands",
      event,
    });

    return await res?.json();
  };

  const [cardsData] = await Promise.all([fetchProductBrands()]);

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    form,
    /** @type {import('$lib/types').ProductBrand[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
  };
}

// export const actions = {

//   /** @param {import('@sveltejs/kit').RequestEvent} event */
//   create: async ( event ) => {
//     const form = await superValidate(event, arktype(brandSchema, { defaults: brandDefaults }));

//     if (!form.valid) {
//       return fail(422, { form });
//     }

//     const formData = new FormData();

//     for(let dt of Object.entries(form.data)){
//       formData.append(dt[0], dt[1]);
//     }

//     const res = await api({
// 			method: 'post',
// 			resource: 'product-brands',
// 			data: formData,
//       event,
//       toJSON: false,
// 		});

//     if (res?.status == 422) {
//       let errRes = await res.json();

//       for(const [fieldName, errs] of Object.entries(errRes.errors)){
//         if (fieldName.includes('.')) {
//           setError(form, fieldName.split('.')[0], errs[0], {
//             overwrite: true
//           });
//         } else {
//           setError(form, fieldName, errs[0], {
//             overwrite: true
//           });
//         }
//       }

//       return message(form, {type: 'error', msg: 'There are errors in your form! Check them and try again.'}, {status: res?.status || 400});
// 		}

//     if ( ! res?.ok) {
//       return message(form, {type: 'error', msg: res?.statusText || 'An error occurred while processing your request'}, {status: res?.status || 429});
//     }

// 		return message(form, {type: 'success', msg: 'Card created successfully!'});
//   },
// }
