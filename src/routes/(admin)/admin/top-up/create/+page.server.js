import { topUpDefaults } from "$lib/schemas";
import { createAction, getData } from "../../prepareProductListings";

export async function load(event) {
  let data = await getData(event, topUpDefaults);

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    topUpForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => createAction(event, topUpDefaults),
};
