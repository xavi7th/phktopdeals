import QRCode from "qrcode";
import { api } from "$lib/helpers";

export async function load(event) {
  const fetchPaymentDetails = async () => {
    const res = await api({
      method: "post",
      resource: "user-transactions",
      data: {
        price_amount: event.url.searchParams.get("amount"),
        payment_method: event.url.searchParams.get("currency"),
        description: "Crypto wallet balance top up",
      },
      event,
    });

    return await res?.json();
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
    user: event.locals.session.data?.user,
    details: details.data,
    qrCode: await generateQR(details.data?.pay_address || "invalid address"),
  };
}
