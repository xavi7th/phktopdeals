import { api } from "$lib/helpers";
import { getErrorString } from "$lib/helpers";
import { arktype } from "sveltekit-superforms/adapters";
import { setFlash, redirect } from "sveltekit-flash-message/server";
import { superValidate, fail, setError } from "sveltekit-superforms";
import { productSchema, brandSchema, brandDefaults } from "$lib/schemas";

/**
 * @param {import('@sveltejs/kit').ServerLoadEvent} event
 * @param {any} productDefaults
 */
export async function getData(event, productDefaults) {
  let form;

  if (event.params.id) {
    const res = await api({
      method: "get",
      resource: "products/" + event.params.id,
      event,
      logResponse: true,
    });

    const product = await res?.json();

    const productData = {
      id: product.data.id,
      product_name: product.data.product_name,
      product_type: product.data.product_type,
      brand_id: product.data.brand_id,
      product_image: product.data.product_image,
      product_category: product.data.product_category,
      regions: product.data.regions,
      price_denominations: product.data.product_price.denominations,
      product_min_price: product.data.min_price,
      product_image_url: product.data.product_image_url,
      percentage_discount: product.data.percentage_discount,
      purchase_commission: product.data.product_price.commission,
      variable_denomination: product.data.product_price.flexible,
      discount_until: product.data.discount_until,
      faqs: product.data.faqs,
    };

    form = await superValidate(productData, arktype(productSchema, { defaults: productDefaults }), { errors: false });
  } else {
    form = await superValidate(arktype(productSchema, { defaults: productDefaults }));
  }

  const brandForm = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));

  const fetchProductBrands = async () => {
    const res = await api({
      method: "get",
      resource: "product-brands?all=true",
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

  return {
    form,
    otherData: {
      brandForm,
      /** @type {string[]} */
      categories: categoriesData.data,
      /** @type {import('$lib/types').ProductBrand[] } */
      brands: brandsData.data,
      /** @type {import('$lib/types').ProductRegions[]} } */
      regions: regionsData.data,
    },
  };
}

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 * @param {any} productDefaults
 */
export async function createAction(event, productDefaults) {
  const form = await superValidate(event, arktype(productSchema, { defaults: productDefaults }));

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

  redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Product Created!" }, event);
}

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 * @param {any} productDefaults
 */
export async function updateAction(event, productDefaults) {
  const form = await superValidate(event, arktype(productSchema, { defaults: productDefaults }));

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

  redirect({ type: "success", msg: (await res?.json())?.metadata?.message || "Product Updated!" }, event);
}
