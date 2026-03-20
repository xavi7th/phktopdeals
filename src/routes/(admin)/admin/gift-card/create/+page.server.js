import { giftCardDefaults } from "$lib/schemas";
import { createAction, getData } from "../../prepareProductListings";
import { assertAdmin } from "$lib/server/auth";

export async function load(event) {
  assertAdmin(event);
  let data = await getData(event, giftCardDefaults);

  return {
    giftCardForm: data.form,
    ...data.otherData,
  };
}

export const actions = {
  default: (event) => {
    assertAdmin(event);
    return createAction(event, giftCardDefaults);
  },
};
