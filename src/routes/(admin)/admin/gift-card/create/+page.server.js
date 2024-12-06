import { api } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { GiftCardDefaults, GiftCardSchema } from "$lib/schemas";
import { message, superValidate, fail, setError } from "sveltekit-superforms";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const form = await superValidate(arktype(GiftCardSchema, { defaults: GiftCardDefaults }));

  const fetchProductBrands = async () => {
    const res = await api({
      method: "get",
      resource: "product-brands",
      event,
    });

    return res?.json();
  };

  const fetchCategories = async () => {
    const res = await api({
      method: "get",
      resource: "product-categories",
      event,
    });

    return res?.json();
  };

  const fetchRegions = async () => {
    const res = await api({
      method: "get",
      resource: "regions",
      event,
    });

    return res?.json();
  };

  const [categoriesData, brandsData, regionsData] = await Promise.all([fetchCategories(), fetchProductBrands(), fetchRegions()]);

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    form,
    /** @type {string[]} */
    categories: categoriesData.data,
    /** @type {import('$lib/types').ProductBrand[] } */
    brands: brandsData.data,
    /** @type {import('$lib/types').ProductRegions[]} } */
    regions: regionsData.data,
  };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  /** @param {import('@sveltejs/kit').RequestEvent} event */
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
          setError(form, fieldName.split(".")[0], errs[0], {
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
