import { api, getErrorString } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { brandDefaults, brandSchema } from "$lib/schemas";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const form = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));

  const cursor = event.url.searchParams.get("cursor");

  const fetchProductBrands = async () => {
    const url = cursor ? `product-brands?cursor=${cursor}` : "product-brands";
    const res = await api({
      method: "get",
      resource: url,
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  let noJS = !!event.url.searchParams.get("noJS");

  return {
    form,
    /** @type { Promise< { data: import('$lib/types.js').ProductBrand[] , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    brands: noJS ? await fetchProductBrands() : fetchProductBrands(), // This must come first to force awaiting in all noJS contexts
  };
}

export const actions = {
  createBrand: async (event) => {
    assertAdmin(event);
    const form = await superValidate(event, arktype(brandSchema, { defaults: brandDefaults }));

    if (!form.valid) {
      setFlash({ type: "error", msg: "There are errors in your form." }, event);
      return fail(422, { form });
    }

    const res = await api({
      method: "POST",
      resource: "product-brands",
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

      setFlash({ type: "error", msg: "There are errors in your form! Check them and try again." }, event);
      return fail(res?.status || 400, { form });
    }

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while processing your request" }, event);
      return fail(res?.status || 429, { form });
    }

    redirect(event.request.headers.get("referer") || "/admin/brands", { type: "success", msg: (await res?.json())?.metadata?.message || "Brand created!" }, event);
  },

  editBrand: async (event) => {
    assertAdmin(event);
    const form = await superValidate(event, arktype(brandSchema, { defaults: brandDefaults }));

    console.log(form);

    if (!form.valid) {
      setFlash({ type: "error", msg: "There are errors in your form." }, event);
      return fail(422, { form });
    }

    if (!form.data.id) {
      setFlash({ type: "error", msg: "There was a problem selecting the brand for editing. Reload the page and try again." }, event);
      return fail(422, { form });
    }

    const res = await api({
      method: "PUT",
      resource: "product-brands/" + form.data.id,
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

      setFlash({ type: "error", msg: "There are errors in your form! Check them and try again." }, event);
      return fail(res?.status || 400, { form });
    }

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while processing your request" }, event);
      return fail(res?.status || 429, { form });
    }

    redirect(event.request.headers.get("referer") || "/admin/brands", { type: "success", msg: (await res?.json())?.metadata?.message || "Brand updated!" }, event);
  },

  /** @param {import('@sveltejs/kit').RequestEvent} event */
  deleteBrand: async (event) => {
    assertAdmin(event);
    const form = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "product-brands/" + formData.get("id"),
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      setFlash({ type: "error", msg: "<ol class='!text-left'>" + getErrorString(errRes.errors) + "</ol>" }, event);
      return fail(res?.status || 422, { form });
    }

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while processing your request" }, event);
      return fail(res?.status || 429, { form });
    }

    redirect(event.request.headers.get("referer") || "/admin/brands", { type: "success", msg: (await res?.json())?.metadata?.message || "Brand deleted!" }, event);
  },
};
