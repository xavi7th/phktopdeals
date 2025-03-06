import { api } from "$lib/helpers";
import { getErrorString } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { setFlash, redirect } from "sveltekit-flash-message/server";
import { superValidate, fail, setError } from "sveltekit-superforms";
import { brandDefaults, brandSchema, GiftCardDefaults, GiftCardSchema } from "$lib/schemas";

export async function load(event) {
  const brandForm = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));

  const fetchGiftCard = async () => {
    const res = await api({
      method: "get",
      resource: "products/" + event.params.id,
      event,
      logResponse: true,
    });

    return await res?.json();
  };

  const fetchProductBrands = async () => {
    const res = await api({
      method: "get",
      resource: "product-brands",
      event,
    });

    return await res?.json();
  };

  const fetchCategories = async () => {
    const res = await api({
      method: "get",
      resource: "product-categories",
      event,
    });

    return await res?.json();
  };

  const fetchRegions = async () => {
    const res = await api({
      method: "get",
      resource: "regions",
      event,
    });

    return await res?.json();
  };

  const [categoriesData, brandsData, regionsData, giftCard] = await Promise.all([fetchCategories(), fetchProductBrands(), fetchRegions(), fetchGiftCard()]);

  let giftCardData = {
    id: giftCard.data.id,
    product_name: giftCard.data.product_name,
    product_type: giftCard.data.product_type,
    brand_id: giftCard.data.brand_id,
    product_image: giftCard.data.product_image,
    product_category: giftCard.data.product_category,
    regions: giftCard.data.regions,
    price_denominations: giftCard.data.product_price.denominations,
    product_min_price: giftCard.data.min_price,
    product_image_url: giftCard.data.product_image_url,
    percentage_discount: giftCard.data.percentage_discount,
    purchase_commission: giftCard.data.product_price.commission,
    variable_denomination: giftCard.data.product_price.flexible,
    discount_until: giftCard.data.discount_until,
    faqs: giftCard.data.faqs,
  };

  const giftCardForm = await superValidate(giftCardData, arktype(GiftCardSchema, { defaults: GiftCardDefaults }), { errors: false });

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    giftCardForm,
    brandForm,
    /** @type {string[]} */
    categories: categoriesData.data,
    /** @type {import('$lib/types').ProductBrand[] } */
    brands: brandsData.data,
    /** @type {import('$lib/types').ProductRegions[]} } */
    regions: regionsData.data,
  };
}

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, arktype(GiftCardSchema, { defaults: GiftCardDefaults }));

    const formData = new FormData();

    for (let dt of Object.entries(form.data)) {
      if (dt[0] == "discount_until" && dt[1]) {
        formData.append(dt[0], new Date(dt[1]).toDateString());
        continue;
      }

      formData.append(dt[0], dt[1]);
    }

    const res = await api({
      method: "PUT",
      resource: "products/" + form.data.id,
      data: formData,
      event,
      logResponse: true,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      for (const [fieldName, errs] of Object.entries(errRes.errors)) {
        if (fieldName.includes(".")) {
          setError(form, fieldName.split(".")[0] + "._errors", errs[0], {
            overwrite: true,
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true,
          });
        }
      }

      setFlash({ type: "error", msg: "<ol class='!text-left'>" + getErrorString(errRes.errors) + "</ol>" }, event);
      return fail(res?.status || 422, { form });
    }

    if (!res?.ok) {
      setFlash({ type: "error", msg: res?.statusText || "An error occurred while processing your request" }, event);
      return fail(res?.status || 429, { form });
    }

    redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Gift Card Updated!" }, event);
  },
};
