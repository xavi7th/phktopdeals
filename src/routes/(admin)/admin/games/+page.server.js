import { api } from "$lib/server/api-helpers";
import { fail } from "@sveltejs/kit";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const fetchGamesCards = async () => {
    const res = await api({
      method: "get",
      resource: "products/type/game",
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: [], metadata: { items_count: 0 }, apiError: true };
    }

    return await res.json();
  };

  const [gamesData] = await Promise.all([fetchGamesCards()]);

  return {
    /** @type { import('$lib/types').Product[] } */
    games: gamesData.data,
    meta: gamesData.metadata,
    apiError: gamesData.apiError,
  };
}

export const actions = {
  delete: async (event) => {
    assertAdmin(event);
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
