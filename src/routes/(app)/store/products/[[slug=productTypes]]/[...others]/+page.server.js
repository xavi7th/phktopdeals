import { api } from "$lib/helpers";

export async function load(event) {
  let url = "store";

  if (event.params.slug) {
    url += "/" + event.params.slug;
  }

  if (event.params.others && event.params.others.split("/")[0] == "cursor") {
    url += `?cursor=${event.params.others.split("/")[1]}`;
  }

  if (event.params.others && event.params.others.split("/")[0] == "cursor" && event.url.searchParams.get("s")) {
    url += "&s=" + event.url.searchParams.get("s");
  } else if (! (event.params.others && event.params.others.split("/")[0] == "cursor") && event.url.searchParams.get("s")) {
    url += "?s=" + event.url.searchParams.get("s");
  }

  const fetchGiftCards = async () => {
    const res = await api({
      method: "get",
      resource: url,
      event,
    });
    return await res?.json();
  };

  const [cardsData] = await Promise.all([fetchGiftCards()]);

  return {
    /** @type { import('$lib/types').ProdSummary[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
    category: event.params.slug || "all",
    basePageUrl: "/store/products" + (event.params.slug ? "/" + event.params.slug + "/cursor" : ""),
    search: event.url.searchParams.get("s") || undefined,
  };
}
