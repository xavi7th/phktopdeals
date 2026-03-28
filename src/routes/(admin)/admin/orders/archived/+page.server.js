import { api } from "$lib/server/api-helpers";
import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const dateFrom = event.url.searchParams.get("date_from");
  const dateTo = event.url.searchParams.get("date_to");

  let queryParams = "";
  const params = new URLSearchParams();
  if (dateFrom && dateTo) {
    params.set("date_from", dateFrom);
    params.set("date_to", dateTo);
  }
  if (params.toString()) queryParams = "?" + params.toString();

  const fetchArchivedOrders = async () => {
    const res = await api({
      method: "get",
      resource: "manage/purchase-invoices/archived" + queryParams,
      event,
    });

    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [archivedData] = await Promise.all([fetchArchivedOrders()]);

  return {
    transactions: archivedData,
  };
}

export const actions = {
  unarchive: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "manage/purchase-invoices/" + formData.get("id") + "/archive",
      event,
    });

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while restoring" }, event);
      return fail(res?.status || 429, { message: res?.statusText || "An error occurred while restoring" });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Order restored!" }, event);
  },
};
