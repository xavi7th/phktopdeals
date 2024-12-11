import { api } from "$lib/helpers";

export async function load(event) {
  const fetchVoucherPreview = async () => {
    const res = await api({
      method: "get",
      resource: "voucher-codes/" + event.params.voucherId,
      event,
      logResponse: true,
    });
    return await res?.json();
  };

  let noJS = !!event.url.searchParams.get("noJS");

  console.log(await fetchVoucherPreview());

  return {
    /** @type { Promise<{ data: string }> } */
    pageData: noJS ? await fetchVoucherPreview() : fetchVoucherPreview(), // This must come first to force awaiting in all noJS contexts
  };
}
