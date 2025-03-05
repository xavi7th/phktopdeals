import { error } from "@sveltejs/kit";
import { api } from "$lib/helpers";

export async function load(event) {
  const fetchOrderDetails = async () => {
    const res = await api({
      method: "get",
      resource: "manage/purchase-invoices/" + event.params.orderId,
      event,
    });
    return await res?.json();
  };

  let order = await fetchOrderDetails();

  if (order.error && order.status == 404) {
    error(404, { code: 404, message: "Order not found" });
  }

  return {
    /** @type { import('$lib/types.js').UserOrder } */
    order: order.data,
  };
}

export const actions = {
  default: async (event) => {
    const form = await event.request.formData();

    if (!form.has("orderId")) {
      return { message: { type: "error", msg: "There was an error selecting the order. Reload the page and try again." } };
    }

    const res = await api({
      method: "post",
      resource: "manage/purchase-invoices/" + form.get("orderId") + "/email",
      data: [],
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      return { message: { type: "error", msg: errRes.metadata.message } };
    }

    if (!res?.ok) {
      return { message: { type: "error", msg: "There was an error sending the emails. Reload the page and try again." } };
    }

    return { message: { type: "success", msg: (await res.json()).metadata.message } };
  },
};
