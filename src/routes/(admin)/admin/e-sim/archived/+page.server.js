import { fail } from "@sveltejs/kit";
import { api } from "$lib/server/api-helpers";
import { extractErrorMessage } from "$lib/helpers";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";
import { apiStatus } from "$lib/stores/apiStatus";

export async function load(event) {
  assertAdmin(event);
  const dateFrom = event.url.searchParams.get("date_from");
  const dateTo = event.url.searchParams.get("date_to");
  const queryParams = dateFrom && dateTo ? `?date_from=${dateFrom}&date_to=${dateTo}` : "";

  const fetchArchived = async () => {
    const res = await api({
      method: "get",
      resource: "products/archived/esim" + queryParams,
      event,
    });

    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [eSimsData] = await Promise.all([fetchArchived()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    eSims: eSimsData.data,
    meta: eSimsData.metadata,
    apiError: eSimsData.apiError,
  };
}

export const actions = {
  unarchive: async (event) => {
    assertAdmin(event);
    // Check API health BEFORE processing
    if (!apiStatus.isAvailable()) {
      setFlash({ type: "error", msg: "Our service is temporarily unavailable. Please try again later." }, event);
      return fail(503, { message: "Our service is temporarily unavailable. Please try again later." });
    }
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "products/" + formData.get("id") + "/archive",
      event,
    });

    if (!res?.ok) {
      const msg = await extractErrorMessage(res);
      setFlash({ type: "error", msg }, event);
      return fail(res?.status || 429, { message: msg });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "E-Sim restored!" }, event);
  },
};
