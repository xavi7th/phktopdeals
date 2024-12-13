import { api } from "$lib/helpers";
import { error } from "@sveltejs/kit";

export async function load(event) {
  const fetchOrderDetails = async () => {
    const res = await api({
      method: "get",
      resource: "purchase-invoices/i/" + event.params.orderId,
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
