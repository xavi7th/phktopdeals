import { eSimDefaults } from "$lib/schemas";
import { getData, updateAction } from "../../../prepareProductListings";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const data = await getData(event, eSimDefaults);

  return {
    eSimForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => {
    assertAdmin(event);
    return updateAction(event, eSimDefaults);
  },
};
