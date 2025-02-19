<script>
  import { dev } from "$app/environment";
  import { toCurrency } from '$lib/helpers';
  import Modal from '$partials/Modal.svelte';
  import Toast from "$lib/Components/Toast.svelte";
  import { TopUpAccountSchema } from "$lib/schemas";
  import TapToCopy from '$lib/Components/TapToCopy.svelte';
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import LoadingButton from '$lib/Components/FormInputs/LoadingButton.svelte';
  import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';
  import FloatingNumericTextInput from '$lib/Components/FormInputs/FloatingNumericTextInput.svelte';
  import FloatingSearchableSelectInput from '$lib/Components/FormInputs/FloatingSearchableSelectInput.svelte';

  /**
   * @typedef Props
   * @property {import('sveltekit-superforms').SuperValidated<import('sveltekit-superforms').Infer< () => typeof TopUpAccountSchema.infer>>} formData
   * @property { Promise<import('$lib/types').NowCryptoCurrency[]> } currencies
   * @property {Promise<{rate: number, fromCache: boolean, lastUpdated: string}>|undefined} rate
   * @property {string} paymentMethod
   */

   /** @type {Props} */
  let { currencies, rate, paymentMethod, formData } = $props();

  let action = $state('');

  const { form, errors, message, delayed, submitting, timeout, enhance } = superForm(formData, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $effect(() => {
    if (paymentMethod === 'crypto') {
      action = '?/processCryptoPayment';
    }
    else if(paymentMethod === 'paystack') {
      action = '?/processPaystackPayment';
    } else {
      action = '?/processBankPayment';
    }
  })
</script>

{#if $message}
  <div class="fixed end-3 top-24 z-50 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg} />
  </div>
{/if}

<div class="fixed bottom-0 left-0 z-[60] max-w-md">
  <SuperDebug data={{ $message, $form, $errors }} label="My form data" collapsible={true} display={dev} />
</div>

<button
  type="button"
  class="inline-flex items-center justify-center w-full px-12 py-4 mt-6 font-semibold text-white transition-all duration-200 rounded-md bg-brand-600 dark:bg-brand-800 hover:opacity-80 focus:opacity-80"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="hs-static-create-modal"
  data-hs-overlay="#payment-method">
  Proceed to Payment
</button>

<Modal title={paymentMethod === 'manual' ? 'Steps for Manual Payment' : 'Select Payment Method'} name="payment-method">
  <div slot="content">
    <div class="flex flex-col">
      <form method="POST" class="space-y-3" {action} use:enhance id="payment-method-form">
        {#if paymentMethod === 'crypto'}
          {#await currencies}
            <p class="text-gray-600">Loading available crypto currencies ...</p>
          {:then result}
            <FloatingSearchableSelectInput name="payment_method" label="Select Payment Method" options={Object.keys(result)} bind:value={$form.payment_method} />

            <FloatingNumericTextInput
                name="amount"
                label="Top Up Amount in USD"
                size="p-3"
                min={50}
                placeholder="Amount to top (Minimum: $50)"
                bind:value={$form.amount}
                isError={!!$errors.amount}
                msg={$errors.amount} />
          {:catch error}
            <p class="text-red-500">Available crypto currencies failed to load. Please refresh the page to try again. {error.message}</p>
          {/await}
        {:else}

          {#await rate}
            <p class="text-gray-600">Updating exchange rates ...</p>
          {:then result}
            {@const getConvertedAmount = (rate) => $form.pay_amount = ($form.amount * rate)}

            {#if paymentMethod === 'paystack'}
              <FloatingTextInput class="hidden" readonly name="payment_method" value="paystack" />
              <FloatingTextInput class="hidden" readonly name="pay_amount" value={$form.pay_amount} />
              <FloatingTextInput class="hidden" readonly name="description" value="Paystack wallet top up" />

              <FloatingNumericTextInput
                  name="amount"
                  label="Top Up Amount in USD"
                  size="p-3"
                  min={1}
                  placeholder="Amount to top (Current Rate: 1 USD = {result?.rate} NGN)"
                  bind:value={$form.amount}
                  isError={!!$errors.amount}
                  msg={$errors.amount} />

              <p class="text-lg font-semibold !my-2 text-gray-600 dark:text-gray-300">
                {$form.amount} USD = {toCurrency(getConvertedAmount(result?.rate), '₦')}
              </p>

            {:else if paymentMethod === 'manual'}
              <FloatingTextInput class="hidden" readonly name="payment_method" value="bank payment" />
              <FloatingTextInput class="hidden" readonly name="pay_amount" value={$form.pay_amount} />
              <FloatingTextInput class="hidden" readonly name="description" value="Manual bank payment wallet top up" />

              <FloatingNumericTextInput
                  name="amount"
                  label="Top Up Amount in USD"
                  size="p-3"
                  min={1}
                  placeholder="Amount to top (Current Rate: 1 USD = {result?.rate} NGN)"
                  bind:value={$form.amount}
                  isError={!!$errors.amount}
                  msg={$errors.amount} />

              <section class="py-3">
                <div class="px-4 mx-auto max-w-7xl">
                  <ul class="max-w-md mx-auto mt-16 space-y-12">
                    <li class="relative flex items-start">
                      <div class="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 dark:border-gray-600 h-full" aria-hidden="true"></div>

                      <div class="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full shadow">
                        <svg class="w-10 h-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="8" y="2" width="12" height="14" rx="2" ry="2" stroke-width="1"/>
                          <path d="M16 16v2a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <div class="ml-6">
                        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Pay <span class="text-brand-700 pr-1 monospace">{toCurrency(getConvertedAmount(result?.rate), '₦')}</span> to the Account below</h3>
                        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 text-left">
                          <TapToCopy copyText="2007663233" class="cursor-pointer inline-flex items-center text-brand-700 dark:text-brand-300 h-3 w-3">
                            Account Number: <strong>2007663233</strong><br />
                          </TapToCopy>
                          <br />
                          Bank Name: MOSES OGIRIBO<br />
                          Account Name: Kuda Bank <br />
                        </p>

                        <div class="w-full max-w-2xl mx-auto p-2 border-red-200 border-2 rounded-md bg-red-50 dark:bg-red-200 mt-3 dark:border-red-300">
                          <div class="text-[10px] text-red-400 dark:text-red-600 leading-tight">
                            <strong>Note:</strong> Payment MUST be made to this account alone. PHK Hot Deals will not be responsible for any loss of funds due to payment to any other account.
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="relative flex items-start">
                      <div class="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 dark:border-gray-600 h-full" aria-hidden="true"></div>

                      <div class="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full shadow">
                        <svg class="w-10 h-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="2" y="5" width="20" height="14" rx="2" ry="2" stroke-width="1"/>
                          <line x1="2" y1="10" x2="22" y2="10" stroke-width="1"/>
                          <circle cx="18" cy="15" r="1.5" stroke-width="1"/>
                          <circle cx="15" cy="15" r="1.5" stroke-width="1"/>
                        </svg>
                      </div>
                      <div class="ml-6">
                        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Make payment to account above</h3>
                        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          Proceed to make payment to the account details above. Payments can be made either using online transfers or direct bank deposits.
                        </p>
                      </div>
                    </li>

                    <li class="relative flex items-start">
                      <div class="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 dark:border-gray-600 h-full" aria-hidden="true"></div>

                      <div class="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full shadow">
                        <svg class="w-10 h-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="8" r="4" stroke-width="1"/>
                          <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke-width="1"/>
                          <circle cx="20" cy="4" r="2" stroke-width="1"/>
                          <path d="M20 6v1M20 1v1" stroke-width="1"/>
                        </svg>
                      </div>
                      <div class="ml-6">
                        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Send us your Payment Receipt</h3>
                        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          After making payment, send us a copy of your payment receipt to <a href="mailto:hello@phkhotdeals.com" class="text-brand-600 dark:text-brand-400">hello@phkhotdeals.com</a>
                          or via WhatsApp to <a href="tel:+2348166272605" class="text-brand-600 dark:text-brand-400">+2348166272605</a>.
                        </p>
                      </div>
                    </li>

                    <li class="relative flex items-start">
                      <div class="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full shadow">
                        <svg class="w-10 h-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="9" stroke-width="1"/>
                          <path d="M12 7v5l3 3" stroke-width="1"/>
                          <text x="7.5" y="13" font-family="sans-serif" font-size="3.5" fill="#000">24</text>
                          <path d="M12 3V1M21 12h2M12 21v2M3 12H1" stroke-width="1"/>
                        </svg>
                      </div>
                      <div class="ml-6">
                        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Your Wallet will be credited</h3>
                        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          Once we confirm your payment, your wallet will be credited with the amount you paid. This usually takes between 5 - 24 hours.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
            {/if}
          {:catch error}
              <p class="text-red-500">Error while Updating rates: {error.message}</p>
          {/await}
        {/if}
      </form>
    </div>
  </div>
    <svelte:fragment slot="footer">
      {#if paymentMethod === 'crypto'}
        <LoadingButton
          form="payment-method-form"
          class="w-auto bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700
          {$form.payment_method ? 'opacity-50' : 'pointer-events-none hidden opacity-0'}
          {$form.amount < 50 ? 'pointer-events-none' : 'opacity-100'}"
          {timeout}
          {delayed}
          {submitting}
          data-hs-overlay="#payment-method">
          Pay with <span class="uppercase">{$form.payment_method}</span>
        </LoadingButton>
      {/if}

      {#if paymentMethod === 'paystack' || paymentMethod === 'manual'}
        <LoadingButton
          form="payment-method-form"
          class="w-auto bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700
          {$form.amount <= 0 ? 'pointer-events-none' : 'opacity-100'}"
          {timeout}
          {delayed}
          {submitting}
          data-hs-overlay="#payment-method">
          Process Payment
        </LoadingButton>
      {/if}
      <span></span>
    </svelte:fragment>
</Modal>
