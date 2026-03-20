import { topUpDefaults } from "$lib/schemas";
import { getData, updateAction } from "../../../prepareProductListings";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const data = await getData(event, topUpDefaults);

  return {
    topUpForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => {
    assertAdmin(event);
    return updateAction(event, topUpDefaults);
  },
};
