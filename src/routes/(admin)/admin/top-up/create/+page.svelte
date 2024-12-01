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

  /** @type {import('./$types').PageData} */
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
  <form>
    <div class="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 sm:grid-cols-12 sm:gap-4 dark:border-neutral-700 dark:first:border-transparent">
      <div class="sm:col-span-12">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">Product Management</h2>
      </div>

      <div class="col-span-12">
        <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={!!$errors.product_name} msg={$errors.product_name} />
      </div>

      <div class="col-span-12">
        <FloatingSelectInput class="flex-1" name="product_type" label="Product Type" bind:value={$formData.product_type} options={types?.data || []} isError={!!$errors.product_type} msg={$errors.product_type} />
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
          multiple
        >
          {#each categories?.data || [] as item}
            <option value={item}>{item}</option>
          {/each}
        </FloatingSelectTagAltInput>
      </div>

      <h2
        class="col-span-12 flex items-center py-3 text-lg font-semibold text-gray-800 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200 dark:text-neutral-200 dark:before:border-neutral-600 dark:after:border-neutral-600"
      >
        Pricing
      </h2>

      <div class="col-span-12">
        <FloatingSelectTagInput
          name="price_denominations"
          label="Available Card Denominations (optional)"
          bind:value={$formData.price_denominations}
          options={[1, 5, 10, 15, 20, 50, 100, 200, 250, 500, 1000]}
          isError={!!$errors.price_denominations}
          msg={$errors.price_denominations}
        />
      </div>

      <div class="col-span-12">
        <SwitchCheckboxInput
          name="variable_denomination"
          label="Allow custom amounts?"
          tooltip="The users will be given an input field to enter an amount of their choice"
          bind:checked={$formData.variable_denomination}
        />
      </div>

      {#if $formData.variable_denomination}
        <div class="col-span-12">
          <FloatingNumericTextInput
            name="product_min_price"
            label="Minimum Price"
            placeholder="The minimum custom price they can purchase"
            bind:value={$formData.product_min_price}
            isError={!!$errors.product_min_price}
            msg={$errors.product_min_price}
          />
        </div>
      {/if}

      <div class="col-span-12">
        <FloatingNumericTextInput
          name="purchase_commission"
          label="Purchase Commission"
          placeholder="Percentage to add to every purchase"
          bind:value={$formData.purchase_commission}
          isError={!!$errors.purchase_commission}
          msg={$errors.purchase_commission}
        />
      </div>

      <div class="col-span-12">
        <FloatingNumericTextInput
          name="percentage_discount"
          label="Percentage Discount"
          placeholder="Percentage discount to add (optional)"
          bind:value={$formData.percentage_discount}
          isError={!!$errors.percentage_discount}
          msg={$errors.percentage_discount}
        />
      </div>

      {#if $formData.percentage_discount > 0}
        <div class="col-span-12">
          <FloatingDateInput name="discount_until" label="Discount Valid Until (optional)" bind:value={$formData.discount_until} msg={$errors?.product_name?.[0]} />
        </div>
      {/if}

      <div class="col-span-12">
        <WysiwygEditor name="faqs" bind:val={$formData.faqs} label="Card FAQs" msg={$errors?.faqs?.[0]} />
      </div>
    </div>
    <button
      type="submit"
      class="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      disabled={$submitting}
    >
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
