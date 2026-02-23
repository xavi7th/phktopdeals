<script>
  import Modal from "$partials/Modal.svelte";
  import Table from "$lib/Components/Table.svelte";
  import Toast from "$lib/Components/Toast.svelte";
  import { superForm } from "sveltekit-superforms";
  import WysiwygEditor from "$lib/Components/FormInputs/TipTapEditor.svelte";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";

  export let data;

  $: ({ templates } = data);

  const { form, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });
</script>

<svelte:head>
  <title>Create Email Templates | HotDeals</title>
  <meta name="description" content="Top up your wallet in your favorite currency or bank transfer to ensure seamless transactions when making purchases." />
</svelte:head>

{#if $message}
  <div class="fixed end-3 top-24 z-[100] space-y-3">
    <Toast type={$message.type} msg={$message.msg} />
  </div>
{/if}

<Table tCaption="List of Email Templates" tDescription="Create email instruction templates that can be applied to vouchers when they are sent.">
  <svelte:fragment slot="tableAction">
    <div>
      <button
        class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-md border border-transparent bg-brand-400 px-4 py-2.5 text-sm font-normal text-gray-800 shadow-md hover:bg-brand-500 focus:bg-brand-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-brand-950 dark:text-neutral-300 dark:hover:bg-brand-900 dark:focus:bg-brand-900"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="manage-email-templates"
        data-hs-overlay="#manage-email-templates"
        on:click={() => ($form = { alias: "", instructions: "" })}>
        Create Template
      </button>
    </div>
  </svelte:fragment>

  <svelte:fragment slot="thead">
    <tr>
      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Alias</span>
      </th>

      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Instructions</span>
      </th>

      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Actions</span>
      </th>
    </tr>
  </svelte:fragment>

  {#each templates as trx}
    <tr class="text-start">
      <td class="size-px whitespace-nowrap text-start">
        <div class="px-6 py-3">
          <span class="text-sm font-semibold capitalize text-gray-600 dark:text-neutral-400">{trx.alias.replaceAll("-", " ")}</span>
        </div>
      </td>
      <td class="size-px whitespace-nowrap">
        <div class="px-6 py-3">
          <div class="flex items-center gap-x-2">
            <div class="grow">
              <span class="text-sm text-gray-600 dark:text-neutral-400">{@html trx.instructions}</span>
            </div>
          </div>
        </div>
      </td>
      <td class="size-px whitespace-nowrap">
        <div class="px-6 py-1.5">
          <div class="hs-dropdown relative inline-block [--placement:bottom-right]">
            <button
              id="hs-table-dropdown-1"
              type="button"
              class="hs-dropdown-toggle inline-flex items-center justify-center gap-2 rounded-lg px-2 py-1.5 align-middle text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown">
              <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
            <div
              class="hs-dropdown-menu duration z-10 mt-2 hidden min-w-40 divide-y divide-gray-200 rounded-lg bg-white p-2 opacity-0 shadow-2xl transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-table-dropdown-1">
              <div class="py-2 first:pt-0 last:pb-0">
                <button
                  class="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="manage-email-templates"
                  data-hs-overlay="#manage-email-templates"
                  on:click={() =>
                    ($form = {
                      alias: trx.alias
                        .replaceAll("-", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (s) => s.toUpperCase()),
                      instructions: trx.instructions,
                      id: trx.id,
                    })}>
                  Edit Template
                </button>
              </div>

              <div class="py-2 first:pt-0 last:pb-0">
                <button
                  class="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="delete-email-template"
                  data-hs-overlay="#delete-email-template"
                  on:click={() => ($form = { id: trx.id })}>
                  Delete Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  {:else}
    <tr>
      <td class="size-px whitespace-nowrap" colspan="4">
        <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
          <div class="flex items-center gap-x-3 text-center">
            <div class="grow">
              <span class="block text-xl text-gray-600 dark:text-neutral-400">NO EMAIL TEMPLATES YET</span>
            </div>
          </div>
        </div>
      </td>
    </tr>
  {/each}

  <svelte:fragment slot="mobile">
    {#each templates as trx, i}
      <div class="rounded-lg border bg-white p-4 shadow">
        <div class="-m-4 flex items-center justify-between border-b px-4 py-2">
          <h2 class="text-lg font-normal text-gray-800">
            <!-- <span class="font-semibold">Alias:</span> -->
            <span class="font-semibold capitalize">{trx.alias.replaceAll("-", " ")}</span>
          </h2>
        </div>
        <div class="mt-6 text-sm text-gray-600">
          <p class="pl-6">
            <span class="font-semibold">Instructions:</span>
            {@html trx.instructions}
          </p>
        </div>
        <div class="mt-4 flex items-center justify-end gap-x-4">
          <button
            class="rounded bg-yellow-400 px-4 py-2 text-xs text-black hover:bg-yellow-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="manage-email-templates"
            data-hs-overlay="#manage-email-templates"
            on:click={() =>
              ($form = {
                alias: trx.alias
                  .replaceAll("-", " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (s) => s.toUpperCase()),
                instructions: trx.instructions,
                id: trx.id,
              })}>
            Edit
          </button>
          <button
            class="rounded bg-red-500 px-4 py-2 text-xs text-white hover:bg-red-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="delete-email-template"
            data-hs-overlay="#delete-email-template"
            on:click={() => ($form = { id: trx.id })}>
            Delete
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-white shadow rounded-lg p-4 border">
        <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
          <div class="flex items-center gap-x-3 text-center">
            <div class="grow">
              <span class="block text-xl text-gray-600 dark:text-neutral-400">NO EMAIL TEMPLATES YET</span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </svelte:fragment>
</Table>

<Modal title="{$form.id ? 'Update' : 'Create'} Email Template" name="manage-email-templates">
  <div slot="content">
    <div class="flex flex-col">
      <form method="POST" action="?/{$form.id ? 'updateEmailTemplate' : 'createEmailTemplate'}" class="space-y-3" use:enhance id="manage-email-templates-form">
        <input type="text" name="id" hidden bind:value={$form.id} readonly class="hidden" />
        <FloatingTextInput name="alias" label="Alias" size="p-4" placeholder="A name you can use to identify this template" bind:value={$form.alias} isError={!!$errors.alias} msg={$errors.alias} />

        <WysiwygEditor name="instructions" bind:val={$form.instructions} label="The instructions to send with this template" isError={!!$errors.instructions} msg={$errors?.instructions} />
      </form>
    </div>
  </div>
  <LoadingButton
    slot="footer"
    form="manage-email-templates-form"
    class="w-auto bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700"
    {timeout}
    {delayed}
    {submitting}>
    {$form.id ? "Update" : "Create"} Template
  </LoadingButton>
</Modal>

<Modal name="delete-email-template" title="Are you sure?">
  <div slot="content">
    <div class="col-span-12">
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        To delete this template you will have to remove it from all associated vouchers first if you have not done som already. To do this, visit the Voucher Management page and select any product using this template.
        From there you can either remove the template or assign another template.
      </p>
    </div>
  </div>

  <div slot="footer">
    <div class="flex justify-end space-x-4">
      <form action="?/deleteEmailTemplate" method="POST" use:enhance>
        <input type="text" name="id" hidden bind:value={$form.id} readonly class="hidden" />
        <LoadingButton
          class="w-auto bg-red-700 px-3 py-2 font-medium transition-opacity duration-300 hover:bg-red-800 hover:text-neutral-50 focus:bg-red-800"
          {timeout}
          {delayed}
          {submitting}
          data-hs-overlay="#delete-email-template">
          Delete Template
        </LoadingButton>
      </form>
    </div>
  </div>
</Modal>
