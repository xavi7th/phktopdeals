<script>
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

  $: ({ brands, regions, categories } = data);
</script>

{#if $message}
  <div class="fixed end-3 top-[100] z-50 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg} />
  </div>
{/if}

<div class="col-span-5 mx-auto min-w-[70%] px-4 py-10 sm:px-6 lg:col-span-4 lg:col-start-2 lg:px-8 lg:py-14">
  <div class="fixed bottom-0 left-0 z-[60] max-w-md">
    <SuperDebug data={{ $message, $formData, $errors }} label="My form data" collapsible={true} display={dev} />
  </div>

  <div class="rounded-xl bg-white p-4 shadow sm:p-7 dark:bg-neutral-900">
    <form method="POST" enctype="multipart/form-data" use:enhance>
      <div class="grid grid-cols-12 gap-y-8 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 dark:border-neutral-700 dark:first:border-transparent">
        <div class="col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">Game Management</h2>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={!!$errors.product_name} msg={$errors.product_name} />
        </div>

        <div class="col-span-12 flex gap-x-2">
          <input name="product_type" class="hidden" placeholder="Product Type" value="game" readonly />
          <FloatingSelectInput class="flex-1" name="brand_id" label="Product Brand" bind:value={$formData.brand_id} isError={!!$errors.brand_id} msg={$errors.brand_id}>
            {#each brands || [] as brand}
              <option value={brand.id}>{brand.name}</option>
            {/each}
          </FloatingSelectInput>

          <button
            type="button"
            class="inline-flex w-40 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-static-list-modal"
            data-hs-overlay="#hs-static-list-modal">
            Manage
          </button>
        </div>
        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={!!$errors.product_name} msg={$errors.product_name} />
        </div>

        <div class="col-span-12 flex gap-x-2">
          <FloatingSelectTagAltInput
            class="flex-1"
            name="product_category"
            label="product category"
            bind:value={$formData.product_category}
            isError={!!$errors.product_category}
            msg={$errors.product_category?._errors}
            multiple>
            {#each categories.data || [] as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </FloatingSelectTagAltInput>
        </div>

        <div class="col-span-12 flex gap-x-2">
          <FloatingSelectTagAltInput class="flex-1" name="regions" label="applicable regions" bind:value={$formData.regions} isError={!!$errors.regions} msg={$errors.regions?._errors} multiple>
            {#each regions || [] as region}
              <option value={region.code}>{region.country}</option>
            {/each}
          </FloatingSelectTagAltInput>
        </div>

        <div class="col-span-12">
          <FloatingFileInput name="product_image" label="Product Image (300 * 300)" accept="image/*" bind:files={$formData.product_image} isError={!!$errors.product_image} msg={$errors.product_image} />
        </div>

        <div class="col-span-12">
          <FloatingSelectTagInput
            name="price_denominations"
            label="Available Card Denominations (optional)"
            bind:value={$formData.price_denominations}
            options={[1, 5, 10, 15, 20, 50, 100, 200, 250, 500, 1000]}
            isError={!!$errors.price_denominations}
            msg={$errors.price_denominations} />
        </div>

        <div class="col-span-12">
          <SwitchCheckboxInput
            name="variable_denomination"
            label="Allow custom amounts?"
            tooltip="The users will be given an input field to enter an amount of their choice"
            bind:checked={$formData.variable_denomination} />
        </div>

        {#if $formData.variable_denomination}
          <div class="col-span-12">
            <FloatingNumericTextInput
              name="product_min_price"
              label="Minimum Price"
              placeholder="The minimum custom price they can purchase"
              bind:value={$formData.product_min_price}
              isError={!!$errors.product_min_price}
              msg={$errors.product_min_price} />
          </div>
        {/if}

        <div class="col-span-12">
          <SwitchCheckboxInput
            name="variable_denomination"
            label="Allow custom amounts?"
            tooltip="The users will be given an input field to enter an amount of their choice"
            bind:checked={$formData.variable_denomination} />
        </div>

        {#if $formData.variable_denomination}
          <div class="col-span-12">
            <FloatingNumericTextInput name="product_price" label="Minimum Price" placeholder="The price For purchase" bind:value={$formData.product_price} isError={!!$errors.product_price} msg={$errors.product_price} />
          </div>
        {/if}

        {#if $formData.percentage_discount > 0}
          <div class="col-span-12 text-neutral-400">
            <FloatingDateInput name="discount_until" min={Date()} label="Discount Valid Until (optional)" bind:value={$formData.discount_until} msg={$errors?.discount_until?.[0]} />
          </div>
        {/if}

        <div class="col-span-12">
          <WysiwygEditor name="faqs" bind:val={$formData.faqs} label="Card FAQs" msg={$errors?.faqs?.[0]} />
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
