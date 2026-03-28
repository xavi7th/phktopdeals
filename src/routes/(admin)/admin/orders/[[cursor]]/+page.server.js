import { api } from "$lib/server/api-helpers";
import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const cursor = event.url.searchParams.get("cursor");
  const dateFrom = event.url.searchParams.get("date_from");
  const dateTo = event.url.searchParams.get("date_to");

  let queryParams = "";
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  if (dateFrom && dateTo) {
    params.set("date_from", dateFrom);
    params.set("date_to", dateTo);
  }
  if (params.toString()) queryParams = "?" + params.toString();

  const fetchUserOrders = async () => {
    const res = await api({
      method: "get",
      resource: "manage/purchase-invoices" + queryParams,
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
    /** @type { Promise< { data: import('$lib/types.js').UserOrder[] , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    transactions: noJS ? await fetchUserOrders() : fetchUserOrders(), // This must come first to force awaiting in all noJS contexts
  };
}

export const actions = {
  archive: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "post",
      resource: "manage/purchase-invoices/" + formData.get("id") + "/archive",
      event,
    });

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while archiving" }, event);
      return fail(res?.status || 429, { message: res?.statusText || "An error occurred while archiving" });
    }

    return redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Order archived!" }, event);
  },

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

    return redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Order restored!" }, event);
  },
};
