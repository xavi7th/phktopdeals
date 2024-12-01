import { api } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { PurchaseItemDefaults, PurchaseItemSchema } from "$lib/schemas";
import { message, superValidate, fail, setError } from "sveltekit-superforms";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const form = await superValidate(arktype(PurchaseItemSchema, { defaults: PurchaseItemDefaults }));

  const fetchProductDetails = async () => {
    const res = await api({
      method: "get",
      resource: "products/" + event.params.slug.split("_")[1],
      event,
    });

    return res?.json();
  };

  const [details] = await Promise.all([fetchProductDetails()]);

  if (!details.data) {
    error(404);
  }

  event.setHeaders({
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });

  return {
    form,
    /** @type { import('$lib/types').Product } */
    product: details.data,
    user: event.locals.user,
  };
}

// /** @satisfies {import('./$types').Actions} */
//  export const actions = {

//   /** @param {import('@sveltejs/kit').RequestEvent} event */
// 	default: async (event) => {
//     const form = await superValidate(event, arktype(PurchaseItemSchema, { defaults: PurchaseItemDefaults }));

//     if (!form.valid) {
//       return fail(422, { form });
//     }

//     const formData = new FormData();

//     for(let dt of Object.entries(form.data)){
//       if (dt[0] == 'discount_until') {
//         formData.append(dt[0], new Date(dt[1]).toDateString());
//         continue;
//       }

//       formData.append(dt[0], dt[1]);
//     }

//     const res = await api({
// 			method: 'post',
// 			resource: 'products',
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
//       return message(form, {type: 'error', msg: res?.statusText || 'An error occured while processing your request'}, {status: res?.status || 429});
//     }

// 		return message(form, {type: 'success', msg: 'Card created successfully!'});
// 	},
// }
