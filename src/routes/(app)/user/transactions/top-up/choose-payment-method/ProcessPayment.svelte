<script>
  import { dev } from "$app/environment";
  import { toCurrency } from "$lib/helpers";
  import Modal from "$partials/Modal.svelte";
  import Toast from "$lib/Components/Toast.svelte";
  import { TopUpAccountSchema } from "$lib/schemas";
  import TapToCopy from "$lib/Components/TapToCopy.svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
  import FloatingNumericTextInput from "$lib/Components/FormInputs/FloatingNumericTextInput.svelte";
  import FloatingSearchableSelectInput from "$lib/Components/FormInputs/FloatingSearchableSelectInput.svelte";

  /**
   * @typedef Props
   * @property {import('sveltekit-superforms').SuperValidated<import('sveltekit-superforms').Infer< () => typeof TopUpAccountSchema.infer>>} formData
   * @property { Promise<import('$lib/types').NowCryptoCurrency[]> } currencies
   * @property {Promise<{rate: number, fromCache: boolean, lastUpdated: string}>|undefined} rate
   * @property {string} paymentMethod
   */

  /** @type {Props} */
  let { currencies, rate, paymentMethod, formData } = $props();

  let action = $state(""),
    nextInstructions = $state(false);

  const { form, errors, message, delayed, submitting, timeout, enhance } = superForm(formData, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $effect(() => {
    if (paymentMethod === "crypto") {
      action = "?/processCryptoPayment";
    } else if (paymentMethod === "paystack") {
      action = "?/processPaystackPayment";
    } else {
      action = "?/processBankPayment";
    }
  });
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
  class="mt-6 inline-flex w-full items-center justify-center rounded-md bg-brand-600 px-12 py-4 font-semibold text-white transition-all duration-200 hover:opacity-80 focus:opacity-80 dark:bg-brand-800"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="payment-method"
  data-hs-overlay="#payment-method">
  Proceed to Payment
</button>

<Modal title={paymentMethod === "manual" ? "Steps for Manual Payment" : "Select Payment Method"} name="payment-method" on:close={() => (nextInstructions = false)}>
  <div slot="content">
    <div class="flex flex-col">
      <form method="POST" class="space-y-3" {action} use:enhance id="payment-method-form">
        {#if paymentMethod === "crypto"}
          {#await currencies}
            <p class="text-gray-600">Loading available crypto currencies ...</p>
          {:then result}
            <FloatingSearchableSelectInput name="payment_method" label="Select Payment Method" options={Object.keys(result)} bind:value={$form.payment_method} />

            <FloatingNumericTextInput name="amount" label="Top Up Amount in USD" size="p-3" min={50} placeholder="Amount to top (Minimum: $50)" bind:value={$form.amount} isError={!!$errors.amount} msg={$errors.amount} />
          {:catch error}
            <p class="text-red-500">Available crypto currencies failed to load. Please refresh the page to try again. {error.message}</p>
          {/await}
        {:else}
          {#await rate}
            <p class="text-gray-600">Updating exchange rates ...</p>
          {:then result}
            {@const getConvertedAmount = (rate) => ($form.pay_amount = $form.amount * rate)}

            {#if paymentMethod === "paystack"}
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

              <p class="!my-2 text-lg font-semibold text-gray-600 dark:text-gray-300">
                {$form.amount} USD = {toCurrency(getConvertedAmount(result?.rate), "₦")}
              </p>
            {:else if paymentMethod === "manual"}
              <FloatingTextInput class="hidden" readonly name="payment_method" value="bank payment" />
              <FloatingTextInput class="hidden" readonly name="pay_amount" value={$form.pay_amount} />
              <FloatingTextInput class="hidden" readonly name="description" value="Wallet top up via bank deposit" />

              <FloatingNumericTextInput
                class={nextInstructions ? "hidden" : ""}
                name="amount"
                label="Top Up Amount in USD"
                size="p-3"
                min={1}
                placeholder="Amount to top (Current Rate: 1 USD = {result?.rate} NGN)"
                bind:value={$form.amount}
                isError={!!$errors.amount}
                msg={$errors.amount} />

              <section class="py-3">
                <div class="mx-auto max-w-7xl px-4">
                  <ul class="mx-auto mt-2 max-w-md space-y-12">
                    {#if !nextInstructions}
                      <li class="relative flex items-start">
                        <div class="absolute left-8 top-14 -ml-0.5 mt-0.5 h-full w-px border-l-4 border-dotted border-gray-300 dark:border-gray-600" aria-hidden="true"></div>

                        <div class="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 shadow dark:bg-neutral-700">
                          <svg class="h-10 w-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="8" y="2" width="12" height="14" rx="2" ry="2" stroke-width="1" />
                            <path d="M16 16v2a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                        <div class="ml-6">
                          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            Pay <span class="monospace pr-1 text-brand-700">{toCurrency(getConvertedAmount(result?.rate), "₦")}</span>
                             to the Account below
                          </h3>
                          <p class="mt-4 text-left text-sm text-gray-600 dark:text-gray-400">
                            <TapToCopy copyText="2007663233" class="inline-flex h-3 w-3 cursor-pointer items-center text-brand-700 dark:text-brand-300">
                              Account Number: <strong>2007663233</strong>
                              <br />
                            </TapToCopy>
                            <br />
                            Bank Name: MOSES OGIRIBO
                            <br />
                            Account Name: Kuda Bank
                            <br />
                          </p>

                          <div class="mx-auto mt-3 w-full max-w-2xl rounded-md border-2 border-red-200 bg-red-50 p-2 dark:border-red-300 dark:bg-red-200">
                            <div class="text-[10px] leading-tight text-red-400 dark:text-red-600">
                              <strong>Note:</strong>
                               Payment MUST be made to this account alone. PHK Hot Deals will not be responsible for any loss of funds due to payment to any other account.
                            </div>
                          </div>
                        </div>
                      </li>

                      <li class="relative flex items-start">
                        <div class="absolute left-8 top-14 -ml-0.5 mt-0.5 h-full w-px border-l-4 border-dotted border-gray-300 dark:border-gray-600" aria-hidden="true"></div>

                        <div class="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 shadow dark:bg-neutral-700">
                          <svg class="h-10 w-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="2" y="5" width="20" height="14" rx="2" ry="2" stroke-width="1" />
                            <line x1="2" y1="10" x2="22" y2="10" stroke-width="1" />
                            <circle cx="18" cy="15" r="1.5" stroke-width="1" />
                            <circle cx="15" cy="15" r="1.5" stroke-width="1" />
                          </svg>
                        </div>
                        <div class="ml-6">
                          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Make payment to account above</h3>
                          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Proceed to make payment to the account details above. Payments can be made either using online transfers or direct bank deposits.</p>
                        </div>
                      </li>

                      <li class="relative flex items-start">
                        <div class="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 shadow dark:bg-neutral-700">
                          <button
                            class="group relative flex min-w-16 scale-50 items-center justify-center rounded-lg bg-[#a18207] px-8 py-6 font-medium text-white shadow-lg transition-all hover:bg-[#8b7006] hover:shadow-xl active:shadow-md">
                            <svg width="40" height="40" viewBox="0 0 60 60" class="absolute text-white">
                              <!-- Animated arrow -->
                              <g class="animate-bounce">
                                <path d="M30 40L20 30M30 40L40 30M30 20L30 40" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                              </g>
                              <!-- Circular path -->
                              <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" class="opacity-50 transition-opacity group-hover:opacity-70" />
                            </svg>
                          </button>
                        </div>
                        <div class="ml-6">
                          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Click the button to proceed</h3>
                          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Click the "I have made payment" button below to proceed to the next step.</p>
                        </div>
                      </li>
                    {/if}

                    {#if nextInstructions}
                      <li class="relative flex items-start">
                        <div class="absolute left-8 top-14 -ml-0.5 mt-0.5 h-full w-px border-l-4 border-dotted border-gray-300 dark:border-gray-600" aria-hidden="true"></div>

                        <div class="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 shadow dark:bg-neutral-700">
                          <svg class="h-10 w-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="8" r="4" stroke-width="1" />
                            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke-width="1" />
                            <circle cx="20" cy="4" r="2" stroke-width="1" />
                            <path d="M20 6v1M20 1v1" stroke-width="1" />
                          </svg>
                        </div>
                        <div class="ml-6">
                          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Send us your Payment Receipt</h3>
                          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Next send a copy of your payment receipt to <a href="mailto:hello@phkhotdeals.com" class="text-brand-600 dark:text-brand-400">hello@phkhotdeals.com</a>
                            or via WhatsApp to
                            <a href="tel:+2348166272605" class="text-brand-600 dark:text-brand-400">+2348166272605</a>
                            .
                          </p>
                        </div>
                      </li>

                      <li class="relative flex items-start">
                        <div class="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 shadow dark:bg-neutral-700">
                          <svg class="h-10 w-10 text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="9" stroke-width="1" />
                            <path d="M12 7v5l3 3" stroke-width="1" />
                            <text x="7.5" y="13" font-family="sans-serif" font-size="3.5" fill="#000">24</text>
                            <path d="M12 3V1M21 12h2M12 21v2M3 12H1" stroke-width="1" />
                          </svg>
                        </div>
                        <div class="ml-6">
                          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Notify us of your Payment</h3>
                          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Click the "Process my Payment" button below to initiate the wallet top up process. Once we confirm your payment, your wallet will be credited with the amount you paid. This usually takes
                            between 15 minutes - 2 hours.
                          </p>
                        </div>
                      </li>
                    {/if}
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
    {#if paymentMethod === "crypto"}
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

    {#if paymentMethod === "paystack"}
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

    {#if paymentMethod === "manual"}
      {#if !nextInstructions}
        <LoadingButton
          on:click={() => (nextInstructions = true)}
          type="button"
          class="bg-success-icon w-auto px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700
            {$form.amount <= 0 ? 'pointer-events-none' : 'opacity-100'}">
          I have made Payment
        </LoadingButton>
      {:else}
        <LoadingButton
          form="payment-method-form"
          class="w-auto bg-teal-700 px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700"
          {timeout}
          {delayed}
          {submitting}
          data-hs-overlay="#payment-method"
          on:click={() => window.HSOverlay?.close("#payment-method")}>
          Process my Payment
        </LoadingButton>
      {/if}
    {/if}
    <span></span>
  </svelte:fragment>
</Modal>
