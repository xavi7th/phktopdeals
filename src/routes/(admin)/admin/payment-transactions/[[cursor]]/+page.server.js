import { api } from "$lib/helpers";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
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

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  let noJS = !!event.url.searchParams.get("noJS");

  return {
    /** @type { Promise< { data: import('$lib/types.js').UserOrder[] , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    transactions: noJS ? await fetchPaymentTransactions() : fetchPaymentTransactions(), // This must come first to force awaiting in all noJS contexts
    search: event.url.searchParams.get("search"),
  };
}
