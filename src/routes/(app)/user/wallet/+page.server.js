import { api } from '$lib/helpers';
import { redirect } from '@sveltejs/kit';
import { arktype } from 'sveltekit-superforms/adapters';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { TopUpAccountDefaults , TopUpAccountSchema} from '$lib/schemas';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const form = await superValidate(arktype(TopUpAccountSchema, { defaults: TopUpAccountDefaults }));

  const fetchAvailableCryptoCurrencies = async () => {
    const res = await api( {
      method: 'get',
      resource: 'purchase-invoices/available-currencies',
      event,
    } );
    return res?.json();
  }

  const fetchWalletBalance = async () => {
    const res = await api( {
      method: 'get',
      resource: 'user/wallet-balance',
      event,
    } );
    return res?.json();
  }

  const fetchTopUpTransactions = async () => {
    const res = await api( {
      method: 'get',
      resource: 'user-transactions/top-up',
      event,
      logResponse: true,
    } );
    return res?.json();
  }

  const [currencies, details, transactions] = await Promise.all( [
    fetchAvailableCryptoCurrencies(),
    fetchWalletBalance(),
    fetchTopUpTransactions(),
  ] );

  event.setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });

  return {
    form,
    /** @type { import('$lib/types').NowCryptoCurrency[] } */
    currencies: currencies.data,
    wallet_balance: details.data?.wallet_balance,
    transactions: transactions.data,
  }
}

/** @satisfies {import('./$types').Actions} */
 export const actions = {

  /** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async (event) => {
    const form = await superValidate(event, arktype(TopUpAccountSchema, { defaults: TopUpAccountDefaults }));

    if (!form.valid) {
      return fail(422, { form });
    }

    redirect(303, `wallet/top-up?currency=${form.data.payment_method}&amount=${form.data.amount}` )

    return message(form, {type: 'error', msg: 'There was an unknown error.'}, {status: 400});
	},
}
