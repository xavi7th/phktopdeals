import { api } from "$lib/helpers";
import { error, redirect } from "@sveltejs/kit";
import { arktype } from "sveltekit-superforms/adapters";
import { PurchaseItemDefaults, PurchaseItemSchema } from "$lib/schemas";
import { message, setError, superValidate } from "sveltekit-superforms";

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
    user: event.locals.session.data?.user,
  };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  /** @param {import('@sveltejs/kit').RequestEvent} event */
  default: async (event) => {
    const form = await superValidate(event, arktype(PurchaseItemSchema, { defaults: PurchaseItemDefaults }));

    if (!form.valid) {
      return message(form, { type: "error", msg: "There are errors in your form." }, { status: 422 });
    }

    const res = await api({
      method: "post",
      resource: "purchase-invoices",
      data: form.data,
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      for (const [fieldName, errs] of Object.entries(errRes.errors)) {
        if (fieldName.includes(".")) {
          setError(form, fieldName.split(".")[0], errs[0], {
            overwrite: true,
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true,
          });
        }
      }

      return message(form, { type: "error", msg: "There are errors in your form." }, { status: res?.status || 400 });
    }

    if (!res?.ok) {
      return message(form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 });
    }

    await event.locals.session.update(async ({ recently_purchased }) => ({ recently_purchased: await res.json() }));

    return redirect(303, "/store/successful");
  },
};
