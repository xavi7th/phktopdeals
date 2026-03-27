import { api } from "$lib/server/api-helpers";

export async function load(event) {
  const fetchPageData = async () => {
    const res = await api({
      method: "get",
      resource: "",
      event,
    });

    // Handle API unavailable - return null data instead of throwing
    if (!res?.ok) {
      return {
        data: {
          sections: [],
          services: [],
          sliders: [],
        },
        error: res ? await res.json() : { error: "API unavailable" },
      };
    }

    return await res?.json();
  };

  let noJS = !!event.url.searchParams.get("noJS");

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
