import { api } from "$lib/helpers";
import { fail } from "@sveltejs/kit";

export async function load(event) {
  const fetchESimCards = async () => {
    const res = await api({
      method: "get",
      resource: "products/type/esim",
      event,
    });

    return await res?.json();
  };

  const [eSimsData] = await Promise.all([fetchESimCards()]);

  event.setHeaders({
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });

  return {
    /** @type { import('$lib/types').Product[] } */
    eSims: eSimsData.data,
    meta: eSimsData.metadata,
  };
}

export const actions = {
  delete: async (event) => {
    const formData = await event.request.formData();

    const res = await api({
      method: "DELETE",
      resource: "products/" + formData.get("product_id"),
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();
      return fail(res?.status || 400, { type: "error", msg: "There are errors in your form! Check them and try again.", errors: errRes.errors });
    }

    if (!res?.ok) {
      return fail(res?.status || 500, { message: res?.statusText || "An error occurred while processing your request" });
    }

    return { type: "success", msg: "Card deleted successfully!" };
  },
};
