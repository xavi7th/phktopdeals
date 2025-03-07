import { topUpDefaults } from "$lib/schemas";
import { getData, updateAction } from "../../../prepareProductListings";

export async function load(event) {
  const data = await getData(event, topUpDefaults);

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    topUpForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => updateAction(event, topUpDefaults),
};
