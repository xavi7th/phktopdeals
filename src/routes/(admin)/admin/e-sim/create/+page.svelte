<script>
  import Modal from "$partials/Modal.svelte";
  import { dev } from "$app/environment";
  import Toast from "$lib/Components/Toast.svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { animatedDotsSVG, spinnerSVG } from "$lib/Components/iconPaths";
  import WysiwygEditor from "$lib/Components/FormInputs/TipTapEditor.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
  import FloatingFileInput from "$lib/Components/FormInputs/FloatingFileInput.svelte";
  import FloatingDateInput from "$lib/Components/FormInputs/FloatingDateInput.svelte";
  import SwitchCheckboxInput from "$lib/Components/FormInputs/SwitchCheckboxInput.svelte";
  import FloatingSelectInput from "$lib/Components/FormInputs/FloatingSelectInput.svelte";
  import FloatingSelectTagInput from "$lib/Components/FormInputs/FloatingSelectTagInput.svelte";
  import FloatingNumericTextInput from "$lib/Components/FormInputs/FloatingNumericTextInput.svelte";
  import FloatingSelectTagAltInput from "$lib/Components/FormInputs/FloatingSelectTagAltInput.svelte";

  export let data;

  const {
    form: formData,
    errors,
    message,
    delayed,
    submitting,
    timeout,
    enhance,
  } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: ({ types, categories } = data);

  let title = "";
  $: formType = "create";
</script>

{#if $message}
  <div class="fixed end-3 top-24 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg} />
  </div>
{/if}

<div class="fixed bottom-0 left-0 z-[60] max-w-md">
  <SuperDebug data={{ $message, $formData, $errors }} label="My form data" collapsible={true} display={dev} />
</div>

<div class="rounded-xl bg-white p-4 shadow sm:p-7 dark:bg-neutral-900">
  <form method="POST" enctype="multipart/form-data" use:enhance>
    <div class="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 sm:grid-cols-12 sm:gap-4 dark:border-neutral-700 dark:first:border-transparent">
      <div class="sm:col-span-12">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">E-sim Management</h2>
      </div>

      <div class="col-span-12">
        <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={!!$errors.product_name} msg={$errors.product_name} />
      </div>

      <div class="col-span-12">
        <FloatingSelectInput class="flex-1" name="product_type" label="Product Type" bind:value={$formData.product_type} options={types?.data || []} isError={!!$errors.product_type} msg={$errors.product_type} />
      </div>

      <div class="col-span-12">
        <FloatingTextInput name="product_coverage" label="Product Coverage" bind:value={$formData.product_coverage} isError={!!$errors.product_coverage} msg={$errors.product_coverage} />
      </div>

      <div class="col-span-12">
        <FloatingFileInput name="product_image" label="Product Image (300 * 300)" accept="image/*" bind:files={$formData.product_image} isError={!!$errors.product_image} msg={$errors.product_image} />
      </div>

      <div class="col-span-12">
        <FloatingTextInput name="data_amount" label="Unit" bind:value={$formData.data_amount} isError={!!$errors.data_amount} msg={$errors.data_amount} />
      </div>

      <div class="col-span-12">
        <FloatingNumericTextInput name="cost" label="Cost" placeholder="Cost for Unit" bind:value={$formData.cost} isError={!!$errors.cost} msg={$errors.cost} />
      </div>

      <div class="col-span-12">
        <FloatingDateInput name="validity" label="Validity Period" bind:value={$formData.validity} msg={$errors?.validity?.[0]} />
      </div>
    </div>
    <button
      type="submit"
      class="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      disabled={$submitting}>
      {#if $timeout}
        Still Loading {@html animatedDotsSVG}
      {:else}
        Save
        {#if $delayed}
          {@html spinnerSVG}
        {/if}
      {/if}
    </button>
  </form>
</div>

<Modal {title} name="hs-static-create-modal">
  <div slot="content">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="inline-block min-w-full p-1.5 align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">Name</th>
                  <th scope="col" class="px-6 py-3 text-end text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">John Brown</td>
                  <td class="space-x-2 whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
                    <button
                      type="button"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-brand-600 hover:text-brand-800 focus:text-brand-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-brand-500 dark:hover:text-brand-400 dark:focus:text-brand-400"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="hs-static-create-modal"
                      data-hs-overlay="#hs-static-edit-modal">
                      Edit
                    </button>
                    <button
                      type="button"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-red-600 hover:text-red-800 focus:text-red-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-red-500 dark:hover:text-red-400 dark:focus:text-brand-400">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</Modal>
<Modal {title} name="hs-static-edit-modal">
  <div slot="content">
    <div class="flex flex-col">
      <div class="space-y-3">
        <label for="input-label" class="mb-2 block text-sm font-medium dark:text-white">Title</label>
        <input
          type="text"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder="Title" />
      </div>
    </div>
  </div>
</Modal>
