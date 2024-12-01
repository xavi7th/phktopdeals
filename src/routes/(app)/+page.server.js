import { api } from "$lib/helpers";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const fetchPageData = async () => {
    const res = await api({
      method: "get",
      resource: "",
      event,
    });

    return res?.json();
  };

  const [pageData] = await Promise.all([fetchPageData()]);

  event.setHeaders({
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });

  return {
    /** @type { import('$lib/types').PageSection } */
    sections: pageData.data.sections,
    /** @type {import('$lib/types').Service[]} */
    services: pageData.data.services,
  };
}
