import { api } from "$lib/helpers";

export async function load(event) {
  const fetchUserOrders = async () => {
    let url = "manage/purchase-invoices";

    if (event.params.cursor) {
      url += "?cursor=" + event.params.cursor;
    }

    const res = await api({
      method: "get",
      resource: url,
      event,
    });
    return await res?.json();
  };

  event.setHeaders({
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });

  let noJS = !!event.url.searchParams.get("noJS");

  return {
    /** @type { Promise< { data: import('$lib/types.js').UserOrder[] , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    transactions: noJS ? await fetchUserOrders() : fetchUserOrders(), // This must come first to force awaiting in all noJS contexts
  };
}
