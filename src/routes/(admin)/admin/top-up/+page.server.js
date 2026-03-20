import { api } from "$lib/helpers";
import { fail } from "@sveltejs/kit";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const fetchTopUps = async () => {
    const res = await api({
      method: "get",
      resource: "products/type/top-up",
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return res.json();
  };

  const [topUpData] = await Promise.all([fetchTopUps()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    topUps: topUpData.data,
    meta: topUpData.metadata,
    apiError: topUpData.apiError,
  };
}

export const actions = {
  delete: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "products/" + formData.get("uuid"),
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      return fail(res?.status || 400, { type: "error", msg: "There are errors in your form! Check them and try again.", errors: errRes.errors });
    }

    if (!res?.ok) {
      return fail(res?.status || 500, { message: res?.statusText || "An error occured while processing your request" });
    }

    return { type: "success", msg: "Card created successfully!" };
  },
};
