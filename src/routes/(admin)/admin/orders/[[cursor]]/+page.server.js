import { api } from "$lib/helpers";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const fetchUserOrders = async () => {
    const cursor = event.url.searchParams.get("cursor");
    const url = cursor ? `manage/purchase-invoices?cursor=${cursor}` : "manage/purchase-invoices";

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
    /** @type { Promise< { data: import('$lib/types.js').UserOrder[] , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    transactions: noJS ? await fetchUserOrders() : fetchUserOrders(), // This must come first to force awaiting in all noJS contexts
  };
}
