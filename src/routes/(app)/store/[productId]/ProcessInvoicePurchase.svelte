<script>
  import Modal from "$partials/Modal.svelte";
  import Toast from "$lib/Components/Toast.svelte";
  import { superForm } from "sveltekit-superforms";
  import { PurchaseItemSchema } from "$lib/schemas";
  import { getErrorString, toCurrency } from "$lib/helpers";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";

  /** @type { import('sveltekit-superforms').SuperValidated<import('sveltekit-superforms').Infer<<typeof PurchaseItemSchema.infer>>> } */
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

<Modal title="Are you sure?" name="process-invoice-purchase-modal">
  <div slot="content">
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

  <form action="" method="POST" use:enhance id="process-invoice-purchase-form" slot="footer">
    <input type="text" name="unit_price" bind:value={data.unit_price} class="hidden" />
    <input type="text" name="quantity" bind:value={data.quantity} class="hidden" />
    <input type="text" name="product_id" bind:value={data.product_id} class="hidden" />
    <LoadingButton class="w-auto bg-teal-700 px-3 py-2 font-medium hover:bg-teal-500 hover:text-neutral-50 focus:bg-teal-500" {timeout} {delayed} {submitting} data-hs-overlay="#process-invoice-purchase-modal">
      Confirm Purchase
    </LoadingButton>
  </form>
</Modal>
