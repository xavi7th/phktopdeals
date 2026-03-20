import QRCode from "qrcode";
import { api } from "$lib/helpers";
import { redirect } from "@sveltejs/kit";

export async function load(event) {
  const pending = event.locals.session.data?.pending_topup;

  if (!pending?.amount || !pending?.currency) {
    redirect(303, "/user/transactions/top-up/choose-payment-method");
  }

  const fetchPaymentDetails = async () => {
    const res = await api({
      method: "post",
      resource: "user-transactions",
      data: {
        price_amount: pending.amount,
        payment_method: pending.currency,
        description: "Crypto wallet balance top up",
      },
      event,
    });

    // Handle API unavailable
    if (!res?.ok) {
      return { data: null, apiError: true };
    }

    return await res.json();
  };

  /** @param {string} text */
  const generateQR = async (text) => {
    try {
      return await QRCode.toDataURL(text, { version: 5, errorCorrectionLevel: "H", width: 400, type: "image/webp" });
    } catch (err) {
      return err;
    }
  };

  const [details] = await Promise.all([fetchPaymentDetails()]);

  // Clear session data after use
  await event.locals.session.update(() => ({ pending_topup: null }));

  return {
    amount: pending.amount,
    currency: pending.currency,
    user: event.locals.session.data?.user,
    details: details.data,
    qrCode: await generateQR(details.data?.pay_address || "invalid address"),
    apiError: details.apiError,
  };
}
