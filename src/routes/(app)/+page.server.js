import { cachedApiGet } from "$lib/server/cached-api";

export async function load(event) {
  const fetchPageData = async () => {
    const data = await cachedApiGet({ resource: "", event, cacheKey: "home" });

    // Handle API unavailable
    if (!data) {
      return {
        data: {
          sections: [],
          services: [],
          sliders: [],
        },
        error: { error: "API unavailable" },
        apiError: true,
      };
    }

    return data;
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
