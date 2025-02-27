import { api } from "$lib/helpers";

export async function load(event) {
  const fetchPageData = async () => {
    const res = await api({
      method: "get",
      resource: "",
      event,
    });

    return await res?.json();
  };

  let noJS = !!event.url.searchParams.get("noJS");

  event.setHeaders({
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });

  /**
   * @typedef PageData
   * @property {import('$lib/types').PageSection} sections
   * @property {import('$lib/types').Service[]} services
   * @property {import('$lib/types').Slider[]} sliders
   */

  return {
    /** @type { Promise< { data: PageData , metadata: { items_count: number; next_page_cursor : string; previous_page_cursor: string; } } > } */
    pageData: noJS ? await fetchPageData() : fetchPageData(),
  };
}
