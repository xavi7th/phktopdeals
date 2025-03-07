import { eSimDefaults } from "$lib/schemas";
import { getData, updateAction } from "../../../prepareProductListings";

export async function load(event) {
  const data = await getData(event, eSimDefaults);

  event.setHeaders({
    "Cache-Control": "public, max-age=604800",
  });

  return {
    eSimForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => updateAction(event, eSimDefaults),
};
