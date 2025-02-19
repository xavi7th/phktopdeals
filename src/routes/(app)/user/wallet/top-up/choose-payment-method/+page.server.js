import { api } from "$lib/helpers";
import { redirect } from "@sveltejs/kit";
import { arktype } from "sveltekit-superforms/adapters";
import { message, superValidate, fail } from "sveltekit-superforms";
import { TopUpAccountDefaults, TopUpAccountSchema } from "$lib/schemas";
import { getCachedExchangeRate, getNOWAvailableCurrencies } from './getCachedCurrencyExchange';

export async function load(event) {
  const form = await superValidate(arktype(TopUpAccountSchema, { defaults: TopUpAccountDefaults }));

  event.setHeaders({
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });

  return {
    form,
    /** @type { Promise<import('$lib/types').NowCryptoCurrency[]> } */
    currencies: getNOWAvailableCurrencies(event),
    /** @type { Promise<{rate: number, fromCache: boolean, lastUpdated: string}> } */
    rate: getCachedExchangeRate(event),
  };
}

export const actions = {
  processCryptoPayment: async (event) => {
    const form = await superValidate(event, arktype(TopUpAccountSchema, { defaults: TopUpAccountDefaults }));

    if (!form.valid) {
      return fail(422, { form });
    }

    redirect(303, `/user/wallet/top-up?currency=${form.data.payment_method}&amount=${form.data.amount}`);

    return message(form, { type: "error", msg: "There was an unknown error." }, { status: 400 });
  },

  processPaystackPayment: async (event) => {
    const form = await superValidate(event, arktype(TopUpAccountSchema, { defaults: TopUpAccountDefaults }));

    const fetchPaystackUrl = async () => {
        const res = await api({
          method: "post",
          resource: "user-transactions",
          data: form.data,
          event,
        });

        return await res?.json();
      };

      const [details] = await Promise.all([fetchPaystackUrl()]);

      if (details.error) {
        return message(form, { type: "error", msg: details.metadata.message }, { status: 400 });
      }

    redirect(303, details.data.authorization_url);
  },
  processManPayment: async (event) => {
    const form = await superValidate(event, arktype(TopUpAccountSchema, { defaults: TopUpAccountDefaults }));

    console.log({form});

    const fetchPaystackUrl = async () => {
        const res = await api({
          method: "post",
          resource: "user-transactions",
          data: form.data,
          event,
          logResponse: true
        });

        return await res?.json();
      };

      const [details] = await Promise.all([fetchPaystackUrl()]);

      console.log(details);

      if (details.error) {
        return message(form, { type: "error", msg: details.metadata.message }, { status: 400 });
      }

      // return {
      //   form,
      //   details: details.data,
      // };


    redirect(303, details.data.authorization_url);

    return message(form, { type: "error", msg: "There was an unknown error." }, { status: 400 });
  }
};
