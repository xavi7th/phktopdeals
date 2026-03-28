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

  const fetchTopUps = async () => {
    const res = await api({
      method: "get",
      resource: "products/type/top-up" + queryParams,
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return res.json();
  };

  const [topUpData] = await Promise.all([fetchTopUps()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    topUps: topUpData.data,
    meta: topUpData.metadata,
    apiError: topUpData.apiError,
  };
}

export const actions = {
  delete: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "products/" + formData.get("uuid"),
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      return fail(res?.status || 400, { type: "error", msg: "There are errors in your form! Check them and try again.", errors: errRes.errors });
    }

    if (!res?.ok) {
      return fail(res?.status || 500, { message: await extractErrorMessage(res) });
    }

    return { type: "success", msg: "Card created successfully!" };
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

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Top Up archived!" }, event);
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

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Top Up restored!" }, event);
  },
};
