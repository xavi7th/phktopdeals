<script>
  import { dev } from "$app/environment";
  import Toast from "$lib/Components/Toast.svelte";
  import Brands from "$partials/brands/BrandModal.svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { animatedDotsSVG, spinnerSVG } from "$lib/Components/iconPaths";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  const {
    form: formData,
    errors,
    message,
    delayed,
    submitting,
    timeout,
  } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });
</script>

{#if $message}
  <div class="fixed end-3 top-24 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg} />
  </div>
{/if}

<div class="col-span-5 mx-auto min-w-[70%] px-4 py-10 sm:px-6 lg:col-span-4 lg:col-start-2 lg:px-8 lg:py-14">
  <div class="fixed bottom-0 left-0 z-[60] max-w-md">
    <SuperDebug data={{ $message, $formData, $errors }} label="My form data" collapsible={true} display={dev} />
  </div>

  <div class="rounded-xl bg-white p-4 shadow sm:p-7 dark:bg-neutral-900">
    <form method="POST" action="?/create">
      <div class="grid grid-cols-12 gap-y-8 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 dark:border-neutral-700 dark:first:border-transparent">
        <div class="col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">Brands Management</h2>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.name} isError={!!$errors.name} msg={$errors.name} />
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
</div>

<Brands />
