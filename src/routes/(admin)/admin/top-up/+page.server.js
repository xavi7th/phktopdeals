import { api } from "$lib/helpers";
import { fail } from "@sveltejs/kit";

export async function load(event) {
  const fetchTopUpCards = async () => {
    const res = await api({
      method: "get",
      resource: "top-up",
      event,
    });

    return await res?.json();
  };

  const [cardsData] = await Promise.all([fetchTopUpCards()]);

  // event.setHeaders({
  //   'Cache-Control': 'public, max-age=604800',
  // });

  return {
    /** @type { import('$lib/types').Product[] } */
    cards: cardsData.data,
    meta: cardsData.metadata,
  };
}

export const actions = {
  default: async (event) => {
    const res = await api({
      method: "post",
      resource: "top-up",
      data: [],
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      return fail(res?.status || 400, { type: "error", msg: "There are errors in your form! Check them and try again.", errors: errRes.errors });
    }

    if (!res?.ok) {
      return fail(res?.status || 500, { message: res?.statusText || "An error occurred while processing your request" });
    }

    return { type: "success", msg: "Card created successfully!" };
  },
};
