import { type } from "arktype";
import { api } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { message, superValidate, fail, setError } from "sveltekit-superforms";

export async function load(event) {
  const form = await superValidate(
    arktype(
      type({
        "id?": type("string|undefined"),
        alias: type("string"),
        instructions: type("string"),
      }),
      { defaults: { id: undefined, alias: "", instructions: "" } },
    ),
  );

  const fetchEmailTemplates = async () => {
    const res = await api({
      method: "get",
      resource: "product-email-templates",
      event,
    });
    return await res?.json();
  };

  const [templates] = await Promise.all([fetchEmailTemplates()]);

  return {
    form,
    /** @type { { alias: string, instructions: string, id: string|undefined }[] } */
    templates: templates.data || [],
  };
}

export const actions = {
  createEmailTemplate: async (event) => {
    const form = await superValidate(event, arktype(type({ alias: type("string"), instructions: type("string") }), { defaults: { alias: "", instructions: "" } }));

    if (!form.valid) {
      return fail(422, { form });
    }

    const res = await api({
      method: "post",
      resource: "product-email-templates",
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

      return message(form, { type: "error", msg: errRes.message }, { status: res?.status || 400 });
    }

    if (!res?.ok) {
      return message(form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 });
    }

    return message(form, { type: "success", msg: (await res.json())?.metadata?.message });
  },

  updateEmailTemplate: async (event) => {
    const form = await superValidate(event, arktype(type({ alias: type("string"), instructions: type("string"), id: type("string>3") }), { defaults: { alias: "", instructions: "", id: "" } }));

    if (!form.valid) {
      return message(form, { type: "error", msg: "There was an error process this request. Refresh the browser and try again" }, { status: 422 });
    }

    const res = await api({
      method: "put",
      resource: "product-email-templates" + "/" + form.data.id,
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

      return message(form, { type: "error", msg: errRes.message }, { status: res?.status || 400 });
    }

    if (!res?.ok) {
      return message(form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 });
    }

    return message(form, { type: "success", msg: (await res.json())?.metadata?.message });
  },

  deleteEmailTemplate: async (event) => {
    const form = await superValidate(event, arktype(type({ id: type("string>3") }), { defaults: { id: "" } }));

    if (!form.valid) {
      return message(form, { type: "error", msg: "There was an error selecting the template for deletion. Reload the page and try again." }, { status: 422 });
    }

    const res = await api({
      method: "DELETE",
      resource: "product-email-templates" + "/" + form.data.id,
      data: form.data,
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      for (const [fieldName, errs] of Object.entries(errRes.errors)) {
        setError(form, fieldName, errs[0], { overwrite: true });
      }

      return message(form, { type: "error", msg: errRes.message }, { status: res?.status || 400 });
    }

    if (!res?.ok) {
      return message(form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 });
    }

    return message(form, { type: "success", msg: (await res.json())?.metadata?.message });
  },
};
