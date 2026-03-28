import { api } from "$lib/server/api-helpers";
import { extractErrorMessage } from "$lib/helpers";
import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const dateFrom = event.url.searchParams.get("date_from");
  const dateTo = event.url.searchParams.get("date_to");
  const queryParams = dateFrom && dateTo ? `?date_from=${dateFrom}&date_to=${dateTo}` : "";

  const fetchESimCards = async () => {
    const res = await api({
      method: "get",
      resource: "products/type/esim" + queryParams,
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [eSimsData] = await Promise.all([fetchESimCards()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    eSims: eSimsData.data,
    meta: eSimsData.metadata,
    apiError: eSimsData.apiError,
  };
}

export const actions = {
  delete: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "DELETE",
      resource: "products/" + formData.get("product_id"),
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();
      return fail(res?.status || 400, { type: "error", msg: "There are errors in your form! Check them and try again.", errors: errRes.errors });
    }

    if (!res?.ok) {
      return fail(res?.status || 500, { message: await extractErrorMessage(res) });
    }

    return { type: "success", msg: "Card deleted successfully!" };
  },

  archive: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "post",
      resource: "products/" + formData.get("id") + "/archive",
      event,
    });

    if (!res?.ok) {
      const errorMsg = await extractErrorMessage(res);
      setFlash({ type: "error", msg: errorMsg }, event);
      return fail(res?.status || 429, { message: errorMsg });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "E-Sim archived!" }, event);
  },

  unarchive: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "products/" + formData.get("id") + "/archive",
      event,
    });

    if (!res?.ok) {
      const errorMsg = await extractErrorMessage(res);
      setFlash({ type: "error", msg: errorMsg }, event);
      return fail(res?.status || 429, { message: errorMsg });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "E-Sim restored!" }, event);
  },
};
