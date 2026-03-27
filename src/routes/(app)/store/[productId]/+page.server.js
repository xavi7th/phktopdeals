import { api } from "$lib/server/api-helpers";
import { error } from "@sveltejs/kit";
import { getErrorString } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { setFlash, redirect } from "sveltekit-flash-message/server";
import { setError, superValidate, fail } from "sveltekit-superforms";
import { PurchaseItemDefaults, PurchaseItemSchema } from "$lib/schemas";

export async function load(event) {
  const form = await superValidate(arktype(PurchaseItemSchema, { defaults: PurchaseItemDefaults }));

  const fetchProductDetails = async () => {
    const res = await api({
      method: "get",
      resource: "products/" + event.params.productId.split("_")[1],
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: null, apiError: true };
    }

    return await res.json();
  };

  const [details] = await Promise.all([fetchProductDetails()]);

  // Only 404 if API was successful but product not found
  if (!details.apiError && !details.data) {
    error(404);
  }

  return {
    form,
    /** @type { import('$lib/types').Product } */
    product: details.data,
    user: event.locals.session.data?.user,
    apiError: details.apiError,
  };
}

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, arktype(PurchaseItemSchema, { defaults: PurchaseItemDefaults }));

    if (!form.valid) {
      setFlash({ type: "error", msg: "There are errors in your form.", errors: form.errors }, event);
      return fail(422, { form });
    }

    const isAuthenticated = !!event.locals.session.data?.user?.email;

    let res = await api({
      method: "post",
      resource: isAuthenticated ? "purchase-invoices" : "g/purchase-invoices",
      data: form.data,
      event,
    });

    // Handle API unavailable (503)
    if (res?.status === 503) {
      setFlash({ type: "error", msg: "Our service is temporarily unavailable. Please try again later." }, event);
      return fail(503, { form });
    }

    if (res?.status == 422) {
      let errRes = await res.json();

      for (const [fieldName, errs] of Object.entries(errRes.errors || {})) {
        if (fieldName.includes(".")) {
          setError(form, fieldName.split(".")[0] + "._errors", errs[0], {
            overwrite: true,
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true,
          });
        }
      }
      setFlash({ type: "error", msg: "<ol class='!text-left'>" + getErrorString(errRes.errors || errRes.metadata.message) + "</ol>" }, event);
      return fail(res?.status || 422, { form });
    }

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while processing your request" }, event);
      return fail(res?.status || 429, { form });
    }

    res = await res.json();

    await event.locals.session.update(async ({ recently_purchased }) => ({ recently_purchased: res }));

    redirect("/store/successful", { type: "success", msg: res?.metadata?.message || "Purchase successful!" }, event.cookies);
  },
};
