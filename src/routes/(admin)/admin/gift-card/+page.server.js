import { fail } from "@sveltejs/kit";
import { api } from "$lib/server/api-helpers";
import { getErrorString } from "$lib/helpers";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const fetchGiftCards = async () => {
    const res = await api({
      method: "get",
      resource: "products/type/gift-card",
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
    /** @type { import('$lib/types').Product[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
    apiError: cardsData.apiError,
  };
}

export const actions = {
  delete: async (event) => {
    assertAdmin(event);
    const formData = await event.request.formData();

    const res = await api({
      method: "delete",
      resource: "products/" + formData.get("id"),
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      setFlash({ type: "error", msg: "<ol class='!text-left'>" + getErrorString(errRes.errors) + "</ol>" }, event);
      return fail(res?.status || 422, { type: "error", msg: "There are errors in your form! Check them and try again.", errors: errRes.errors });
    }

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while processing your request" }, event);
      return fail(res?.status || 429, { message: res?.statusText || "An error occurred while processing your request" });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Gift Card deleted!" }, event);
  },
};
