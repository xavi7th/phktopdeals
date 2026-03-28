<script>
  import { dev } from "$app/environment";
  import Modal from "$partials/Modal.svelte";
  import Toast from "$lib/Components/Toast.svelte";
  import { VoucherCodeDefaults } from "$lib/schemas";
  import VoucherTableData from "./VoucherTableData.svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
  import FloatingNumericTextInput from "$lib/Components/FormInputs/FloatingNumericTextInput.svelte";
  import FloatingSearchableSelectInput from "$lib/Components/FormInputs/FloatingSearchableSelectInput.svelte";

  export let data;

  $: ({ pageData } = data);

  const { form, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
    async onResult({ result }) {
      if (result.type === "redirect") {
        // @ts-ignore
        window.HSOverlay?.close(`#manage-vouchers`);
        await new Promise((r) => setTimeout(r, 600));
      } else if (result.type === "success" || result.type === "failure") {
        // @ts-ignore
        window.HSOverlay?.close(`#delete-voucher`);
      }
    },
  });
</script>

<svelte:head>
  <title>Create Voucher Codes for Products | HotDeals</title>
  <meta name="description" content="Create Voucher Codes ahead that will get sent to the customers when purchases are made." />
</svelte:head>

{#if $message}
  <div class="fixed end-3 top-24 z-[100] space-y-3">
    <Toast type={$message.type} msg={$message.msg} />
  </div>
{/if}

<div class="fixed bottom-0 left-0 z-[60] max-w-md">
  <SuperDebug data={{ $message, $form, $errors }} label="Create Voucher Form" collapsible={true} display={dev} />
</div>

{#await pageData}
  <TableSkeleton />
{:then pageData}
  <VoucherTableData vouchers={pageData.data?.vouchers || []} metadata={pageData.metadata} on:create={() => ($form = VoucherCodeDefaults)} on:edit={(e) => ($form = e.detail)} on:delete={(e) => ($form = e.detail)} />

  <Modal title="{$form.id ? 'Update' : 'Create'} Product Voucher" name="manage-vouchers">
    <div slot="content">
      <div class="flex flex-col">
        <form id="manage-vouchers-form" method="POST" action="?/{$form.id ? 'update' : 'create'}" class="space-y-3" use:enhance>
          <input type="text" name="id" hidden bind:value={$form.id} readonly class="hidden" />
          <FloatingSearchableSelectInput name="product_id" label="Product" bind:value={$form.product_id} msg={$errors.product_id}>
            {#each pageData.data?.products || [] as item}
              <option value={item.id}>{item.product_name}</option>
            {/each}
          </FloatingSearchableSelectInput>

          <FloatingSearchableSelectInput name="product_email_template_id" label="Email Template to use for this voucher (optional)" bind:value={$form.product_email_template_id} msg={$errors.product_email_template_id}>
            <option value="">N/A</option>
            {#each pageData.data?.email_templates || [] as template}
              <option value={template.id}>{template.alias}</option>
            {/each}
          </FloatingSearchableSelectInput>

          <FloatingNumericTextInput name="amount" label="Voucher Amount" size="p-4" placeholder="Amount for this Voucher Code" bind:value={$form.amount} msg={$errors.amount} />

          <FloatingTextInput name="code" label="Voucher Code" size="p-4" placeholder="The Code to send to user's email" bind:value={$form.code} msg={$errors.code} />
        </form>
      </div>
    </div>

    <LoadingButton
      slot="footer"
      form="manage-vouchers-form"
      class="w-auto bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700"
      {timeout}
      {delayed}
      {submitting}>
      {$form.id ? "Update" : "Create"} Voucher
    </LoadingButton>
  </Modal>
{:catch}
  <tr>
    <td class="js-enabled size-px whitespace-nowrap" colspan="4">
      <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
        <div class="flex items-center justify-center">
          <span class="inline-flex text-xl text-gray-600 dark:text-neutral-200">There was an error loading the data. reload the page to try again</span>
        </div>
      </div>
    </td>
  </tr>
{/await}

<Modal name="delete-voucher" title="Are you sure?">
  <div slot="content">
    <div class="col-span-12">
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        To delete this voucher you will have to remove it from all associated vouchers first if you have not done som already. To do this, visit the Voucher Management page and select any product using this voucher. From
        there you can either remove the voucher or assign another voucher.
      </p>
    </div>
  </div>

  <div slot="footer">
    <div class="flex justify-end space-x-4">
      <form action="?/delete" method="POST" use:enhance>
        <input type="text" name="id" hidden bind:value={$form.id} readonly class="hidden" />
        <LoadingButton
          class="w-auto bg-red-700 px-3 py-2 font-medium transition-opacity duration-300 hover:bg-red-800 hover:text-neutral-50 focus:bg-red-800"
          {timeout}
          {delayed}
          {submitting}>
          Delete Voucher
        </LoadingButton>
      </form>
    </div>
  </div>
</Modal>
