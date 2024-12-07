<script>
  import { dev } from "$app/environment";
  import Toast from "$lib/Components/Toast.svelte";
  import { search } from "$lib/Components/iconPaths";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import Brand from "$partials/brands/BrandModal.svelte";
  import ProductListings from "../../ProductListings.svelte";
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

  $: ({ brands, regions, categories, products, meta } = data);

  let title = "";
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

  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="inline-block min-w-full p-1.5 align-middle">
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <div class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
            <div>
              <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">All Products</h2>
              <p class="text-sm text-gray-600 dark:text-neutral-400">View Products of all types in one place. Quickly search for a particular product</p>
            </div>

            <div class="px-4 py-3">
              <div class="relative max-w-xs">
                <label for="products-search" class="sr-only">Search</label>
                <input
                  type="text"
                  name="products-search"
                  id="products-search"
                  class="block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Search for products" />
                <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <SvgIcon class="size-4 text-gray-400 dark:text-neutral-500" slot={search} />
                </div>
              </div>
            </div>
          </div>

          <ProductListings {products} {meta} basePageUrl="/admin/gift-card" />
        </div>
      </div>
    </div>
  </div>

  <div class="rounded-xl bg-white p-4 shadow sm:p-7 dark:bg-neutral-900">
    <form method="POST" action="?/edit" enctype="multipart/form-data" use:enhance>
      <div class="grid grid-cols-12 gap-y-8 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 dark:border-neutral-700 dark:first:border-transparent">
        <div class="col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">Gift Card Management</h2>
        </div>
        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={!!$errors.product_name} msg={$errors.product_name} />
        </div>

        <div class="col-span-12 flex gap-x-2">
          <input name="product_type" class="hidden" placeholder="Product Type" value="Gift Card" readonly />
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
            data-hs-overlay="#hs-static-list-modal"
            on:click={() => (title = "Manage Type")}>
            Manage
          </button>
        </div>

        <div class="col-span-12">
          <FloatingFileInput name="product_image" label="Product Image (300 * 300)" accept="image/*" bind:files={$formData.product_image} isError={!!$errors.product_image} msg={$errors.product_image} />
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
            {#each categories || [] as cat}
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

        <h2
          class="col-span-12 flex items-center py-3 text-lg font-semibold text-gray-800 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200 dark:text-neutral-200 dark:before:border-neutral-600 dark:after:border-neutral-600">
          Pricing
        </h2>

        <div class="col-span-12">
          <FloatingSelectTagInput
            name="price_denominations"
            label="Available Card Denominations (optional)"
            bind:value={$formData.price_denominations}
            options={["1", "5", "10", "15", "20", "50", "100", "200", "250", "500", "1000"]}
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
          <FloatingNumericTextInput
            name="purchase_commission"
            label="Purchase Commission"
            placeholder="Percentage to add to every purchase"
            bind:value={$formData.purchase_commission}
            isError={!!$errors.purchase_commission}
            msg={$errors.purchase_commission} />
        </div>

        <div class="col-span-12">
          <FloatingNumericTextInput
            name="percentage_discount"
            label="Percentage Discount"
            placeholder="Percentage discount to add (optional)"
            bind:value={$formData.percentage_discount}
            isError={!!$errors.percentage_discount}
            msg={$errors.percentage_discount} />
        </div>

        {#if $formData.percentage_discount > 0}
          <div class="col-span-12">
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

<Brand {title} {brands} form={data.brandForm} />
