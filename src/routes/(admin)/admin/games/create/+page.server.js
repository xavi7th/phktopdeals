import { gameDefaults } from "$lib/schemas";
import { createAction, getData } from "../../prepareProductListings";

export async function load(event) {
  let data = await getData(event, gameDefaults);

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    gameForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => createAction(event, gameDefaults),
};
