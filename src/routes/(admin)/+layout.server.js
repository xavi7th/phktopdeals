import { api } from "$lib/helpers";
import { superValidate } from "sveltekit-superforms";
import { arktype } from "sveltekit-superforms/adapters";
import { brandSchema, brandDefaults } from "$lib/schemas";

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  const brandForm = await superValidate(arktype(brandSchema, { defaults: brandDefaults }));

  const fetchProductBrands = async () => {
    const res = await api({
      method: "get",
      resource: "product-brands",
      event,
    });

    return res?.json();
  };

  event.depends("brandlist");
  const [brandsData] = await Promise.all([fetchProductBrands()]);

  return {
    brandForm,
    /** @type {import('$lib/types').ProductBrand[] } */
    brands: brandsData.data,
  };
}
