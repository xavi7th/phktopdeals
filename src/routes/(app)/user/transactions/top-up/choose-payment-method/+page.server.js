import { api, getErrorString } from "$lib/helpers";
import { redirect } from "@sveltejs/kit";
import { arktype } from "sveltekit-superforms/adapters";
import { message, superValidate, fail, setError } from "sveltekit-superforms";
import { TopUpAccountDefaults, TopUpAccountSchema } from "$lib/schemas";
import { getCachedExchangeRate, getNOWAvailableCurrencies } from './getCachedCurrencyExchange';

export async function load ( event ) {
  const form = await superValidate( arktype( TopUpAccountSchema, { defaults: TopUpAccountDefaults } ) );

  event.setHeaders( {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  } );

  return {
    form,
    /** @type { Promise<import('$lib/types').NowCryptoCurrency[]> } */
    currencies: getNOWAvailableCurrencies( event ),
    /** @type { Promise<{rate: number, fromCache: boolean, lastUpdated: string}> } */
    rate: getCachedExchangeRate( event ),
  };
}

export const actions = {
  processCryptoPayment: async ( event ) => {
    const form = await superValidate( event, arktype( TopUpAccountSchema, { defaults: TopUpAccountDefaults } ) );

    if ( !form.valid ) {
      return fail( 422, { form } );
    }

    redirect( 303, `/user/transactions/top-up?currency=${form.data.payment_method}&amount=${form.data.amount}` );

    return message( form, { type: "error", msg: "There was an unknown error." }, { status: 400 } );
  },

  processPaystackPayment: async ( event ) => {
    const form = await superValidate( event, arktype( TopUpAccountSchema, { defaults: TopUpAccountDefaults } ) );

    /**
     * Makes a POST request to the `user-transactions` resource to
     * generate a Paystack payment link.
     * @param {import('sveltekit').RequestEvent} event
     * @return {Promise<import('sveltekit').Response>} A promise that resolves to
     * the Paystack payment link.
     */
    const res = await api( {
      method: "post",
      resource: "user-transactions",
      data: form.data,
      event,
    } );

    if ( res?.status == 422 ) {
      let errRes = await res.json();

      return message( form, { type: "error", msg: "There are errors in your form! Check them and try again. <ol class='!text-left'>" + getErrorString( errRes.errors ) + "</ol>" }, { status: res?.status || 400 } );
    }

    if ( !res?.ok ) {
      return message( form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 } );
    }

    const details = await res.json();

    if ( details.error ) {
      return message( form, { type: "error", msg: details.metadata.message }, { status: 400 } );
    }

    redirect( 303, details.data.authorization_url );
  },
  processBankPayment: async ( event ) => {
    const form = await superValidate( event, arktype( TopUpAccountSchema, { defaults: TopUpAccountDefaults } ) );

    console.log( { form } );

    /**
     * Makes a POST request to the `user-transactions` resource to
     * generate a Paystack payment link.
     * @param {import('sveltekit').RequestEvent} event
     * @return {Promise<import('sveltekit').Response>} A promise that resolves to
     * the Paystack payment link.
     */
    const res = await api( {
      method: "post",
      resource: "user-transactions",
      data: form.data,
      event,
    } );

    if ( res?.status == 422 ) {
      let errRes = await res.json();

      return message( form, { type: "error", msg: "There are errors in your form! Check them and try again. <ol class='!text-left'>" + getErrorString( errRes.errors ) + "</ol>" }, { status: res?.status || 400 } );
    }

    if ( !res?.ok ) {
      return message( form, { type: "error", msg: res?.statusText || "An error occurred while processing your request" }, { status: res?.status || 429 } );
    }

    const details = await res.json();

    console.log( details );

    if ( details.error ) {
      return message( form, { type: "error", msg: details.metadata.message }, { status: 400 } );
    }

    redirect( 303, `/user/transactions/?status=info` );
  }
};
