<script>
  import Modal from "$partials/Modal.svelte";
  import { dev } from '$app/environment';
	import Toast from '$lib/Components/Toast.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { animatedDotsSVG, spinnerSVG } from '$lib/Components/iconPaths';
	import WysiwygEditor from '$lib/Components/FormInputs/TipTapEditor.svelte';
  import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';
	import FloatingFileInput from '$lib/Components/FormInputs/FloatingFileInput.svelte';
	import FloatingDateInput from '$lib/Components/FormInputs/FloatingDateInput.svelte';
	import SwitchCheckboxInput from '$lib/Components/FormInputs/SwitchCheckboxInput.svelte';
	import FloatingSelectInput from '$lib/Components/FormInputs/FloatingSelectInput.svelte';
	import FloatingSelectTagInput from '$lib/Components/FormInputs/FloatingSelectTagInput.svelte';
	import FloatingNumericTextInput from '$lib/Components/FormInputs/FloatingNumericTextInput.svelte';
	import FloatingSelectTagAltInput from '$lib/Components/FormInputs/FloatingSelectTagAltInput.svelte';

  /** @type {import('./$types').PageData} */
  export let data

  const { form: formData, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: ( { types, categories } = data ) ;

  let title = '';
  $: formType = 'create';
</script>

{#if $message}
  <div class="fixed top-24 end-3 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}/>
  </div>
{/if}

<div class="col-span-7 lg:col-span-7 lg:col-start-2 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

  <div class="max-w-md fixed left-0 bottom-0 z-[60]">
    <SuperDebug data={{$message, $formData, $errors}} label="My form data" collapsible={true} display={dev} />
  </div>

  <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-900">
    <form method="POST" enctype="multipart/form-data" use:enhance>
      <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
        <div class="sm:col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">
            E-sim Management
          </h2>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={ !! $errors.product_name} msg={$errors.product_name}/>
        </div>

        <div class="col-span-12">
          <FloatingSelectInput class="flex-1" name="product_type" label="Product Type" bind:value={$formData.product_type} options={types?.data || []} isError={ !! $errors.product_type} msg={$errors.product_type}/>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="product_coverage" label="Product Coverage" bind:value={$formData.product_coverage} isError={ !! $errors.product_coverage} msg={$errors.product_coverage}/>
        </div>

        <div class="col-span-12">
          <FloatingFileInput name="product_image" label="Product Image (300 * 300)" accept="image/*" bind:files={$formData.product_image} isError={ !! $errors.product_image} msg={$errors.product_image}/>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="data_amount" label="Unit" bind:value={$formData.data_amount} isError={ !! $errors.data_amount} msg={$errors.data_amount}/>
        </div>

        <div class="col-span-12">
          <FloatingNumericTextInput name="cost" label="Cost" placeholder="Cost for Unit" bind:value={$formData.cost} isError={ !! $errors.cost} msg={$errors.cost}/>
        </div>

        <div class="col-span-12">
          <FloatingDateInput name="validity" label="Validity Period" bind:value={$formData.validity} msg={$errors?.validity?.[0]}/>
        </div>
      </div>
      <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" disabled={$submitting}>
        {#if $timeout}
          Still Loading {@html animatedDotsSVG}
        {:else}
          Save
          {#if $delayed} {@html spinnerSVG} {/if}
        {/if}
      </button>
    </form>
  </div>
</div>

<Modal {title} name="hs-static-create-modal">
  <div slot="content">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                  <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">John Brown</td>
                  <td class="space-x-2 px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-brand-600 hover:text-brand-800 focus:outline-none focus:text-brand-800 disabled:opacity-50 disabled:pointer-events-none dark:text-brand-500 dark:hover:text-brand-400 dark:focus:text-brand-400" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-static-create-modal" data-hs-overlay="#hs-static-edit-modal">Edit</button>
                    <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-brand-400">Delete</button>
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
        <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Title</label>
        <input type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Title">
      </div>
    </div>
  </div>
</Modal>
