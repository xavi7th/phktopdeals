import { api } from "$lib/server/api-helpers";
import { getErrorString, extractErrorMessage } from "$lib/helpers";
import { error } from "@sveltejs/kit";
import { apiStatus } from "$lib/stores/apiStatus";

export async function load(event) {
  const fetchTransactionDetails = async () => {
    const res = await api({
      method: "get",
      resource: "transactions/" + event.params.transId,
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: null, apiError: true };
    }

    return await res.json();
  };

  let transaction = await fetchTransactionDetails();

  if (transaction.apiError) {
    return {
      /** @type { import('$lib/types.js').UserOrder } */
      transaction: null,
      apiError: true,
    };
  }

  if (transaction.error && transaction.status == 404) {
    error(404, { code: 404, message: "Transaction not found" });
  }

  return {
    /** @type { import('$lib/types.js').UserOrder } */
    transaction: transaction.data,
  };
}

export const actions = {
  default: async (event) => {
    // Check API health BEFORE processing
    if (!apiStatus.isAvailable()) {
      return { message: { type: "error", msg: "Our service is temporarily unavailable. Please try again later." } };
    }
    const form = await event.request.formData();

    if (!form.has("transactionId")) {
      return { message: { type: "error", msg: "There was an error selecting the transaction to mark as confirmed. Reload the page and try again." } };
    }

    const res = await api({
      method: "put",
      resource: "transactions/" + form.get("transactionId"),
      data: { status: "confirmed" },
      event,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      return { message: { type: "error", msg: "There are errors in your form! Check them and try again. <ol class='!text-left'>" + getErrorString(errRes.errors) + "</ol>" } };
    }

    if (!res?.ok) {
      return { message: { type: "error", msg: await extractErrorMessage(res) } };
    }

    return { message: { type: "success", msg: (await res.json()).metadata.message } };
  },
};
