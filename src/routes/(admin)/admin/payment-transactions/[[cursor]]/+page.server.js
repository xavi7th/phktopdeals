import { api } from "$lib/helpers";

export async function load(event) {
  const fetchPaymentTransactions = async () => {
    const cursor = event.url.searchParams.get("cursor");
    const search = event.url.searchParams.get("search");

    let url = "transactions";
    const params = [];
    if (cursor) params.push(`cursor=${cursor}`);
    if (search) params.push(`trxref=${search}`);
    if (params.length > 0) url += "?" + params.join("&");

    const res = await api({
      method: "get",
      resource: url,
      event,
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
