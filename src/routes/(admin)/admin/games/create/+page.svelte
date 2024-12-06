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

  /** @type {import('./$types').PageData} */
  export let data;

  const { form: formData, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: ( { brands, regions, categories, } = data ) ;

</script>

{#if $message}
  <div class="fixed top-[100] z-50 end-3 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}/>
  </div>
{/if}

<div class="col-span-5 lg:col-span-4 lg:col-start-2 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto min-w-[70%]">

  <div class="max-w-md fixed left-0 bottom-0 z-[60]">
    <SuperDebug data={{$message, $formData, $errors}} label="My form data" collapsible={true} display={dev} />
  </div>

  <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-900">
    <form method="POST" enctype="multipart/form-data" use:enhance>
      <div class="grid grid-cols-12 gap-y-8 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
        <div class="col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">
            E-sim Management
          </h2>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={ !! $errors.product_name} msg={$errors.product_name}/>
        </div>

        <div class="col-span-12 flex gap-x-2">
          <input name="product_type" class="hidden" placeholder="Product Type" value="game" readonly/>
          <FloatingSelectInput class="flex-1" name="brand_id" label="Product Brand" bind:value={$formData.brand_id} isError={ !! $errors.brand_id} msg={$errors.brand_id}>
            {#each brands || [] as brand}
              <option value={brand.id}>{brand.name}</option>
            {/each}
          </FloatingSelectInput>

          <button type="button" class="w-40 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none"aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-static-list-modal" data-hs-overlay="#hs-static-list-modal">
            Manage
          </button>
        </div>

        <div class="col-span-12">
          <FloatingFileInput name="product_image" label="Product Image (300 * 300)" accept="image/*" bind:files={$formData.product_image} isError={ !! $errors.product_image} msg={$errors.product_image}/>
        </div>

        <div class="col-span-12 flex gap-x-2">
          <FloatingSelectTagAltInput class="flex-1" name="product_category" label="product category" bind:value={$formData.product_category} isError={ !! $errors.product_category} msg={$errors.product_category?._errors} multiple>
            {#each categories.data || [] as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </FloatingSelectTagAltInput>
        </div>

        <div class="col-span-12 flex gap-x-2">
          <FloatingSelectTagAltInput class="flex-1" name="regions" label="applicable regions" bind:value={$formData.regions} isError={ !! $errors.regions} msg={$errors.regions?._errors} multiple>
            {#each regions || [] as region}
              <option value={region.code}>{region.country}</option>
            {/each}
          </FloatingSelectTagAltInput>
        </div>

        <h2 class="col-span-12 py-3 flex items-center font-semibold text-lg text-gray-800  before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-200 dark:before:border-neutral-600 dark:after:border-neutral-600">Pricing</h2>

        <div class="col-span-12">
          <FloatingSelectTagInput name="price_denominations" label="Available Card Denominations (optional)"  bind:value={$formData.price_denominations} options={[1, 5, 10, 15, 20, 50, 100, 200, 250, 500, 1000]} isError={ !! $errors.price_denominations} msg={$errors.price_denominations}/>
        </div>

        <div class="col-span-12">
          <SwitchCheckboxInput name="variable_denomination" label="Allow custom amounts?" tooltip="The users will be given an input field to enter an amount of their choice" bind:checked={$formData.variable_denomination}/>
        </div>

        {#if $formData.variable_denomination}
          <div class="col-span-12">
            <FloatingNumericTextInput name="product_min_price" label="Minimum Price" placeholder="The minimum custom price they can purchase"  bind:value={$formData.product_min_price} isError={ !! $errors.product_min_price} msg={$errors.product_min_price}/>
          </div>
        {/if}

        <div class="col-span-12">
          <FloatingNumericTextInput name="purchase_commission" label="Purchase Commission" placeholder="Percentage to add to every purchase" bind:value={$formData.purchase_commission} isError={ !! $errors.purchase_commission} msg={$errors.purchase_commission}/>
        </div>

        <div class="col-span-12">
          <FloatingNumericTextInput name="percentage_discount" label="Percentage Discount" placeholder="Percentage discount to add (optional)" bind:value={$formData.percentage_discount} isError={ !! $errors.percentage_discount} msg={$errors.percentage_discount}/>
        </div>

        {#if $formData.percentage_discount > 0}
          <div class="col-span-12 text-neutral-400">
            <FloatingDateInput name="discount_until" min={Date()} label="Discount Valid Until (optional)" bind:value={$formData.discount_until} msg={$errors?.discount_until?.[0]}/>
          </div>
        {/if}

        <div class="col-span-12">
          <WysiwygEditor name="faqs" bind:val={$formData.faqs} label="Card FAQs" msg={$errors?.faqs?.[0]}/>
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