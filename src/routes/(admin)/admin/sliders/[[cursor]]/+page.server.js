import { type } from "arktype";
import { api } from "$lib/server/api-helpers";
import { getErrorString } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { sliderDefaults, sliderSchema } from "$lib/schemas";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const form = await superValidate(arktype(sliderSchema, { defaults: sliderDefaults }));

  const fetchSliders = async () => {
    const cursor = event.url.searchParams.get("cursor");
    const url = cursor ? `slideshows?cursor=${cursor}` : "slideshows";

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
    /** @type { Promise< { data: import('$lib/types.js').Slider[] , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    sliders: noJS ? await fetchSliders() : fetchSliders(),
    form,
  };
}

export const actions = {
  create: async (event) => {
    assertAdmin(event);
    const form = await superValidate(event, arktype(sliderSchema, { defaults: sliderDefaults }));

    if (!form.valid) {
      setFlash({ type: "error", msg: "There are errors in your form." }, event);
      return fail(422, { form });
    }

    const formData = new FormData();

    for (let dt of Object.entries(form.data)) {
      dt[1] && formData.append(dt[0], dt[1]);
    }

    const res = await api({
      method: "POST",
      resource: "slideshows",
      data: formData,
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

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Slider created!" }, event);
  },

  update: async (event) => {
    assertAdmin(event);
    const form = await superValidate(
      event,
      arktype(
        type({
          url: type("string.url|undefined|null").describe("a valid url"),
          "image?": type("File|undefined")
            .describe("provided")
            .configure({ problem: (ctx) => ctx.propString + " must be " + ctx.expected }),
          size: '"large"|"small"',
          id: type("string"),
        }),
        { defaults: sliderDefaults },
      ),
    );

    if (!form.valid) {
      return fail(422, { form });
    }

    const formData = new FormData();

    formData.append("_method", "PUT");

    for (let dt of Object.entries(form.data)) {
      dt[1] && formData.append(dt[0], dt[1]);
    }

    const res = await api({
      method: "POST",
      resource: "slideshows/" + form.data.id,
      data: formData,
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

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Slider updated!" }, event);
  },

  delete: async (event) => {
    assertAdmin(event);
    const form = await superValidate(arktype(sliderSchema, { defaults: sliderDefaults }));
    const formData = await event.request.formData();

    if (!formData.get("id")) {
      setFlash({ type: "error", msg: "There was an error selecting the slider to delete. Reload the page and try again." }, event);
      return fail(422, { form });
    }

    const res = await api({
      method: "delete",
      resource: "slideshows/" + formData.get("id"),
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

    redirect(
      // (res?.status || 200),
      // location: 'admin/sliders',
      { type: "success", msg: (await res?.json())?.metadata?.message || "Slider deleted!" },
      event,
    );
  },
};
