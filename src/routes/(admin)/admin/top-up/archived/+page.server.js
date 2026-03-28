import { fail } from "@sveltejs/kit";
import { api } from "$lib/server/api-helpers";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const dateFrom = event.url.searchParams.get("date_from");
  const dateTo = event.url.searchParams.get("date_to");
  const queryParams = dateFrom && dateTo ? `?date_from=${dateFrom}&date_to=${dateTo}` : "";

  const fetchArchived = async () => {
    const res = await api({
      method: "get",
      resource: "products/archived/top-up" + queryParams,
      event,
    });

    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [topUpData] = await Promise.all([fetchArchived()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    topUps: topUpData.data,
    meta: topUpData.metadata,
    apiError: topUpData.apiError,
  };
}

export const actions = {
  unarchive: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "products/" + formData.get("id") + "/archive",
      event,
    });

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while restoring" }, event);
      return fail(res?.status || 429, { message: res?.statusText || "An error occurred while restoring" });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Top Up restored!" }, event);
  },
};
