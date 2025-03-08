import { api } from "$lib/helpers";
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

    return await res?.json();
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

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, arktype(PurchaseItemSchema, { defaults: PurchaseItemDefaults }));

    if (!form.valid) {
      setFlash({ type: "error", msg: "There are errors in your form.", errors: form.errors }, event);
      return fail(422, { form });
    }

    let res = await api({
      method: "post",
      resource: form.data.is_auth_purchase ? "purchase-invoices" : "g/purchase-invoices",
      data: form.data,
      event,
    });

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
