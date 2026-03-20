import { api } from "$lib/helpers";

export async function load(event) {
  let url = "store";
  const searchQuery = event.url.searchParams.get("s");

  if (event.params.slug) {
    url += "/" + event.params.slug;
  }

  if (event.params.others && event.params.others.split("/")[0] == "cursor") {
    url += `?cursor=${event.params.others.split("/")[1]}`;
  }

  if (searchQuery) {
    const separator = url.includes("?") ? "&" : "?";
    url += `${separator}s=${searchQuery}`;
  }

  const fetchGiftCards = async () => {
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

  const [cardsData] = await Promise.all([fetchGiftCards()]);

  return {
    /** @type { import('$lib/types').ProdSummary[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
    category: event.params.slug || "all",
    basePageUrl: "/store/products" + (event.params.slug ? "/" + event.params.slug + "/cursor" : ""),
    search: event.url.searchParams.get("s") || undefined,
    apiError: cardsData.apiError,
  };
}
