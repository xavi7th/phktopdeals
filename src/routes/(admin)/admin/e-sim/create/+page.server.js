import { eSimDefaults } from "$lib/schemas";
import { createAction, getData } from "../../prepareProductListings.js";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  let data = await getData(event, eSimDefaults);

  return {
    eSimForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => {
    assertAdmin(event);
    return createAction(event, eSimDefaults);
  },
};
