import { type } from "arktype";
import { api } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { VoucherCodeDefaults, VoucherCodeSchema } from "$lib/schemas";
import { message, superValidate, setError } from "sveltekit-superforms";

export async function load(event) {
  const form = await superValidate(arktype(VoucherCodeSchema, { defaults: VoucherCodeDefaults }));

  const fetchVoucherCodes = async () => {
    const res = await api({
      method: "get",
      resource: "voucher-codes?cursor=" + event.params.cursor,
      event,
    });
    return await res?.json();
  };

  let noJS = !!event.url.searchParams.get("noJS");

  return {
    form,
    /** @type { Promise< { data: { vouchers: (typeof VoucherCodeDefaults)[], products: { id: string; product_name: string; }[], email_templates: { id: string; alias: string; }[] }, metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    pageData: noJS ? await fetchVoucherCodes() : fetchVoucherCodes(), // This must come first to force awaiting in all noJS contexts
  };
}

export const actions = {
  create: async (event) => {
    const form = await superValidate(event, arktype(VoucherCodeSchema, { defaults: VoucherCodeDefaults }));

    if (!form.valid) {
      return message(form, { type: "error", msg: "There are errors in your form" }, { status: 422 });
    }

    const res = await api({
      method: "post",
      resource: "voucher-codes",
      data: form.data,
      event,
      logResponse: true,
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

  update: async (event) => {
    const form = await superValidate(event, arktype(VoucherCodeSchema, { defaults: VoucherCodeDefaults }));
    if (!form.valid) {
      return message(form, { type: "error", msg: "There was an error process this request. Refresh the browser and try again" }, { status: 422 });
    }

    const res = await api({
      method: "put",
      resource: "voucher-codes" + "/" + form.data.id,
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

  delete: async (event) => {
    const form = await superValidate(event, arktype(type({ id: type("string>3") }), { defaults: { id: "" } }));

    if (!form.valid) {
      return message(form, { type: "error", msg: "There was an error selecting the voucher for deletion. Reload the page and try again." }, { status: 422 });
    }

    const res = await api({
      method: "DELETE",
      resource: "voucher-codes" + "/" + form.data.id,
      data: form.data,
      event,
      logResponse: true,
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
