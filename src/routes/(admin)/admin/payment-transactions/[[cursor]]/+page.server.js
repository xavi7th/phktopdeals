import { api } from "$lib/helpers";

export async function load(event) {
  const fetchPaymentTransactions = async () => {
    let url = "transactions";

    if (event.params.cursor) {
      url += "?cursor=" + event.params.cursor;
    }

    if (event.params.cursor && event.url.searchParams.get("search")) {
      url += "&trxref=" + event.url.searchParams.get("search");
    } else if (!event.params.cursor && event.url.searchParams.get("search")) {
      url += "?trxref=" + event.url.searchParams.get("search");
    }

    const res = await api({
      method: "get",
      resource: url,
      event,
      logResponse: true
    });
    return await res?.json();
  };

  event.setHeaders({
    "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
  });

  let noJS = !!event.url.searchParams.get("noJS");

  return {
    /** @type { Promise< { data: import('$lib/types.js').UserOrder[] , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    transactions: noJS ? await fetchPaymentTransactions() : fetchPaymentTransactions(), // This must come first to force awaiting in all noJS contexts
    search: event.url.searchParams.get("search"),
  };
}
