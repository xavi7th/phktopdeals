<script>
  import { dev } from '$app/environment';
  import Modal from "$partials/Modal.svelte";
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

  $: ( { brands, regions, categories, } = data ) ;

  let title = "";
</script>

{#if $message}
  <div class="fixed top-24 z-50 end-3 space-y-3">
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
            Gift Card Management
          </h2>
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="product_name" label="Product Name" bind:value={$formData.product_name} isError={ !! $errors.product_name} msg={$errors.product_name}/>
        </div>

        <div class="col-span-12 flex gap-x-2">
          <input name="product_type" class="hidden" placeholder="Product Type" value="Gift Card" readonly/>
          <FloatingSelectInput class="flex-1" name="brand_id" label="Product Brand" bind:value={$formData.brand_id} isError={ !! $errors.brand_id} msg={$errors.brand_id}>
            {#each brands || [] as brand}
              <option value={brand.id}>{brand.name}</option>
            {/each}
          </FloatingSelectInput>

          <button type="button" class="shrink-0 w-24 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-static-create-modal" data-hs-overlay="#hs-static-create-modal"  on:click={() => title = 'Manage Type'}>
            Create
          </button>
        </div>

        <div class="col-span-12">
          <FloatingFileInput name="product_image" label="Product Image (300 * 300)" accept="image/*" bind:files={$formData.product_image} isError={ !! $errors.product_image} msg={$errors.product_image}/>
        </div>

        <div class="col-span-12 flex gap-x-2">
          <FloatingSelectTagAltInput class="flex-1" name="product_category" label="product category" bind:value={$formData.product_category} isError={ !! $errors.product_category} msg={$errors.product_category?._errors} multiple>
            {#each categories || [] as cat}
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
          <div class="col-span-12">
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
