<!-- EXAMPLE USAGE -->
<!-- <FloatingNumericTextInput value={form?.percentage_discount} isError={! form?.success} msg={form?.success || form?.errors?.name && form?.errors?.name[0]} label="Percentage Discount" placeholder="Percentage to add to every purchase"/> -->

<script>
	import FormMessage from '$lib/Components/FormMessage.svelte';
	import { minusIcon, plusIcon } from '../iconPaths';

  export let name = 'input-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10), msg = '', isError = true, label = '', placeholder = '', gray = false;
  /** @type {number|undefined} */
  export let value = 0;

  $: valueChars = value?.toString()?.length || 0;
  $: inputWidth = valueChars < 4 ? 'w-8' : (valueChars > 3 && valueChars < 6 ? 'w-12' : (valueChars > 5 && valueChars < 10 ? 'w-24' : 'w-40'))
</script>


<div class="relative">
  <div class="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} { !msg && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
        {msg && ! isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}">
    <div class="w-full flex justify-between items-center gap-x-3">

      <div>
        <span class="block font-medium text-sm text-gray-800 dark:text-white">
          {label}
        </span>
        <span class="block text-xs text-gray-500 dark:text-neutral-400">
          {placeholder}
        </span>
      </div>

      <div class="flex items-center gap-x-1.5" class:pr-5={msg}>
        <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabindex="-1" aria-label="Decrease" on:click={() => --value}>
          {@html minusIcon}
        </button>
        <input type="number" {name} id="{name}" {...$$restProps} bind:value class="p-0 {inputWidth} bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" style="-moz-appearance: textfield;" aria-roledescription="{name} field">
        <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabindex="-1" aria-label="Increase" on:click={() => ++value}>
          {@html plusIcon}
        </button>
      </div>
    </div>
  </div>

  {#if msg}
    <FormMessage type="{isError ? 'error' : 'success'}" {msg} errorIconPosition="end-0"/>
  {/if}
</div>
