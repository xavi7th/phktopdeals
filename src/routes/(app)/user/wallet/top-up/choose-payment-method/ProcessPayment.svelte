<script>
  import { dev } from "$app/environment";
  import Modal from '$partials/Modal.svelte';
  import Toast from "$lib/Components/Toast.svelte";
  import { TopUpAccountSchema } from "$lib/schemas";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import LoadingButton from '$lib/Components/FormInputs/LoadingButton.svelte';
  import FloatingNumericTextInput from '$lib/Components/FormInputs/FloatingNumericTextInput.svelte';
  import FloatingSearchableSelectInput from '$lib/Components/FormInputs/FloatingSearchableSelectInput.svelte';

  /** @type {import('sveltekit-superforms').SuperValidated<import('sveltekit-superforms').Infer<<typeof TopUpAccountSchema.infer>>>} */
  export let data;
  /** @type { import('$lib/types').NowCryptoCurrency[] | {} } */
  export let currencies = {};
  export let wallet_balance = 0;

  const { form, errors, message, delayed, submitting, timeout, enhance } = superForm(data, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: minAmount = Math.max(Math.ceil((currencies[$form.payment_method]?.min_amount || 0) / 10) * 10, 50);

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

<Modal title="Select Payment Method" name="payment-method">
  <div slot="content">
    <div class="flex flex-col">
      <form method="POST" class="space-y-3" use:enhance id="payment-method-form">
        <FloatingSearchableSelectInput name="payment_method" label="Select Payment Method" options={Object.keys(currencies)} bind:value={$form.payment_method} />

        <FloatingNumericTextInput
          name="amount"
          label="Top Up Amount in USD"
          size="p-3"
          min={minAmount}
          placeholder="Amount to top (Minimum: ${minAmount})"
          bind:value={$form.amount}
          isError={!!$errors.amount}
          msg={$errors.amount} />
      </form>
    </div>
  </div>
  <LoadingButton
    slot="footer"
    form="payment-method-form"
    class="w-auto bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700 {$form.payment_method
      ? 'opacity-50'
      : 'pointer-events-none hidden opacity-0'} {$form.amount < minAmount || $form.amount <= 0 ? 'pointer-events-none' : 'opacity-100'}"
    {timeout}
    {delayed}
    {submitting}
    data-hs-overlay="#payment-method">
    Pay with <span class="uppercase">{$form.payment_method}</span>
  </LoadingButton>
</Modal>
