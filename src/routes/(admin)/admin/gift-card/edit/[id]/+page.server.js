import { giftCardDefaults } from "$lib/schemas";
import { getData, updateAction } from "../../../prepareProductListings";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  const data = await getData(event, giftCardDefaults);

  return {
    giftCardForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => {
    assertAdmin(event);
    return updateAction(event, giftCardDefaults);
  },
};
