import { fail } from "@sveltejs/kit";
import { api } from "$lib/server/api-helpers";
import { getErrorString, extractErrorMessage } from "$lib/helpers";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const dateFrom = event.url.searchParams.get("date_from");
  const dateTo = event.url.searchParams.get("date_to");
  const queryParams = dateFrom && dateTo ? `?date_from=${dateFrom}&date_to=${dateTo}` : "";

  const fetchGiftCards = async () => {
    const res = await api({
      method: "get",
      resource: "products/type/gift-card" + queryParams,
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [cardsData] = await Promise.all([fetchGiftCards()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
    apiError: cardsData.apiError,
  };
}

export const actions = {
  delete: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "products/" + formData.get("id"),
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      setFlash({ type: "error", msg: "<ol class='!text-left'>" + getErrorString(errRes.errors) + "</ol>" }, event);
      return fail(res?.status || 422, { type: "error", msg: "There are errors in your form! Check them and try again.", errors: errRes.errors });
    }

    if (!res?.ok) {
      const errorMsg = await extractErrorMessage(res);
      setFlash({ type: "error", msg: errorMsg }, event);
      return fail(res?.status || 429, { message: errorMsg });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Gift Card deleted!" }, event);
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

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Gift Card archived!" }, event);
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

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Gift Card restored!" }, event);
  },
};
