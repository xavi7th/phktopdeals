<script>
  import Toast from "$lib/Components/Toast.svelte";
  import { superForm } from "sveltekit-superforms";
  import { PurchaseItemSchema } from "$lib/schemas";
  import { getErrorString, toCurrency } from "$lib/helpers";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";

  /** @type {import('sveltekit-superforms').SuperValidated<import('sveltekit-superforms').Infer<<typeof PurchaseItemSchema.infer>>>} */
  export let data,
    totalPurchaseAmount = 0;

  const { message, form, errors, enhance, timeout, delayed, submitting } = superForm(data, {
    delayMs: 500,
    timeoutMs: 8000,
  });
</script>

{#if $message}
  <div class="fixed end-3 top-24 z-[100] space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}>
      <ul class="ml-4 list-disc text-xs capitalize">{@html getErrorString($errors)}</ul>
    </Toast>
  </div>
{/if}

<div
  id="process-invoice-purchase-modal"
  class="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden"
  role="dialog"
  tabindex="-1"
  aria-labelledby="process-invoice-purchase-modal-label">
  <div
    class="hs-overlay-animation-target m-3 flex min-h-[calc(100%-3.5rem)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out hs-overlay-open:scale-100 hs-overlay-open:opacity-100 sm:mx-auto sm:w-full sm:max-w-lg">
    <div class="pointer-events-auto flex w-full flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
      <div class="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700">
        <h3 id="process-invoice-purchase-modal-label" class="text-lg font-bold text-gray-800 dark:text-white">Are you sure?</h3>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          aria-label="Close"
          data-hs-overlay="#process-invoice-purchase-modal">
          <span class="sr-only">Close</span>
          <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div class="overflow-y-auto p-4">
        <p class="mb-4 text-gray-600">
          You are about to complete a purchase for <span class="font-bold">{toCurrency(totalPurchaseAmount)}</span>
          . Please note that this action will deduct the amount from your available balance.
        </p>
        <div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p class="font-bold">Important Warning:</p>
          <ul class="ml-4 list-disc text-xs">
            <li>This transaction is irreversible.</li>
            <li>The funds will be deducted immediately from your balance.</li>
            <li>Please ensure you have sufficient funds in your account before proceeding.</li>
          </ul>
        </div>
      </div>
      <div class="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
        <button
          type="button"
          class=" inline-flex shrink-0 items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          data-hs-overlay="#process-invoice-purchase-modal">
          Cancel Purchase
        </button>

        <form action="" method="POST" use:enhance>
          <input type="text" name="unit_price" bind:value={data.unit_price} class="hidden" />
          <input type="text" name="quantity" bind:value={data.quantity} class="hidden" />
          <input type="text" name="product_id" bind:value={data.product_id} class="hidden" />
          <LoadingButton class="w-auto bg-teal-700 px-3 py-2 font-medium hover:bg-teal-500 hover:text-neutral-50 focus:bg-teal-500" {timeout} {delayed} {submitting}>Confirm Purchase</LoadingButton>
        </form>
      </div>
    </div>
  </div>
</div>
