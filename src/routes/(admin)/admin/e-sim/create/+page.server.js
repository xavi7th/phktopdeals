import { eSimDefaults } from "$lib/schemas";
import { createAction, getData } from "../../prepareProductListings.js";

export async function load(event) {
  let data = await getData(event, eSimDefaults);

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    eSimForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => createAction(event, eSimDefaults),
};
