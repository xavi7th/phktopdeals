import { api } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { message, superValidate, fail, setError } from "sveltekit-superforms";
import { brandDefaults, brandSchema, GiftCardDefaults, GiftCardSchema } from "$lib/schemas";

export async function load(event) {
  const giftCardForm = await superValidate(arktype(GiftCardSchema, { defaults: GiftCardDefaults }));
  const brandForm = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));

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

  const [categoriesData, brandsData, regionsData] = await Promise.all([fetchCategories(), fetchProductBrands(), fetchRegions()]);

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

    if (!form.valid) {
      return fail(422, { form });
    }

    const formData = new FormData();

    for (let dt of Object.entries(form.data)) {
      if (dt[0] == "discount_until" && dt[1]) {
        formData.append(dt[0], new Date(dt[1]).toDateString());
        continue;
      }

      formData.append(dt[0], dt[1]);
    }

    const res = await api({
      method: "post",
      resource: "products",
      data: formData,
      event,
      toJSON: false,
    });

    if (res?.status == 422) {
      let errRes = await res.json();

      for (const [fieldName, errs] of Object.entries(errRes.errors)) {
        if (fieldName.includes(".")) {
          setError(form, fieldName.split(".")[0] + '._errors', errs[0], {
            overwrite: true,
          });
        } else {
          setError(form, fieldName, errs[0], {
            overwrite: true,
          });
        }
      }

      return message(form, { type: "error", msg: "There are errors in your form! Check them and try again." }, { status: res?.status || 400 });
    }

    if (!res?.ok) {
      return message(form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 });
    }

    return message(form, { type: "success", msg: "Card created successfully!" });
  },
};
