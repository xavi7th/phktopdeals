import QRCode from "qrcode";
import { api } from "$lib/helpers";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const fetchPaymentDetails = async () => {
    const res = await api({
      method: "post",
      resource: "user-transactions",
      data: {
        price_amount: event.url.searchParams.get("amount"),
        payment_method: event.url.searchParams.get("currency"),
        description: "Wallet balance top up",
      },
      event,
    });

    return res?.json();
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

  return {
    amount: event.url.searchParams.get("amount"),
    currency: event.url.searchParams.get("currency"),
    user: event.locals.user,
    details: details.data,
    qrCode: await generateQR(details.data?.pay_address || "invalid address"),
  };
}
