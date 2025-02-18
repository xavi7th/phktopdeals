<!-- EXAMPLE USAGE -->
<!-- import FloatingSearchableSelectInput from "$lib/Components/FormInputs/FloatingSearchableSelectInput.svelte"; -->
<!-- <FloatingSearchableSelectInput name="payment_method" label="Select Payment Method" options={Object.keys(currencies)} bind:value={$form.payment_method} /> -->

<!-- <FloatingSelectInput label="Product Type" bind:value={$form.product_type} isError={!!$errors.product_type} msg={$errors.product_type} size='py-2 px-3'>
  {#each ['Gift Cards','Games','eSim','Top Up'] as item}
    <option>{item}</option>
  {/each}
</FloatingSelectInput> -->

<script>
  import { onMount } from "svelte";
  import { isObject } from "$lib/helpers";
  import FormMessage from "../FormMessage.svelte";

  let { class: className, name = "select-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10), isError = true, label = "Choose", gray = false, size = "py-4", value = $bindable(''), hasSearch = true, msg = [], options = [], ...rest } = $props();

  let platformSelectOptions = `{
        "hasSearch": ${hasSearch},
        "searchPlaceholder": "Search...",
        "searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-brand-500 focus:ring-brand-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
        "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
        "placeholder": "Select ${label}",
        "toggleTag": "<button type='button' aria-expanded='false'><span class='me-2' data-icon></span><span class='text-gray-800 dark:text-neutral-200' data-title></span></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative ${size} ps-4 pe-9 flex gap-x-2 text-nowrap w-full flex-initial cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600 focus:border-brand-500",
        "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
        "optionTemplate": "<div><div class='flex items-center'><div class='me-2' data-icon></div><div class='text-gray-800 dark:text-neutral-200' data-title></div></div></div>",
        "extraMarkup": "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
    }`;

  onMount(() => {
    window.HSStaticMethods.autoInit();
  });
</script>

<div class="relative {className}">
  <select
    {name}
    id={name}
    data-hs-select={platformSelectOptions}
    bind:value
    class="peer hidden grow {size} block w-full rounded-lg border-gray-200 pe-9 text-sm autofill:pb-2 autofill:pt-6
        focus:border-brand-500/50 focus:pb-2 focus:pt-6 focus:ring-brand-500/50 disabled:pointer-events-none
        disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:focus:ring-neutral-600 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} {!msg?.toString() && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
        {msg?.toString() && !isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}"
    {...rest}>
    <option value={undefined}>Select {label}</option>

    {#if isObject(options) && Object.entries(options).length > 0}
      {#each Object.entries(options) as [val, key]}
        <option value={key}>{val}</option>
      {/each}
    {:else if Array.isArray(options) && options.length > 0}
      {#each options as val}
        <option value={val.toString().toLowerCase()}>{val}</option>
      {/each}
    {:else}
      <slot />
    {/if}

    <!-- <option value="AF" data-hs-select-option={`{"icon": "<img class='inline-block size-4 rounded-full' src='https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png' alt='Af' />"}`} selected>
          Binance
        </option> -->
  </select>

  {#if msg?.toString()}
    <FormMessage type={isError ? "error" : "success"} {msg} />
  {/if}
</div>
