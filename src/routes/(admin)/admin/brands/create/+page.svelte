<script>
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
  import Brands from '$partials/brands/BrandModal.svelte';

  /** @type {import('./$types').PageData} */
  export let data

  const { form: formData, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });
</script>

{#if $message}
  <div class="fixed top-24 end-3 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}/>
  </div>
{/if}

<div class="col-span-5 lg:col-span-4 lg:col-start-2 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto min-w-[70%]">

  <div class="max-w-md fixed left-0 bottom-0 z-[60]">
    <SuperDebug data={{$message, $formData, $errors}} label="My form data" collapsible={true} display={dev} />
  </div>

  <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-900">
    <form method="POST" action="?/create">
      <div class="grid grid-cols-12 gap-y-8 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
        <div class="col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">
            Brands Management
          </h2>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.name} isError={ !! $errors.name} msg={$errors.name}/>
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

<Brands />