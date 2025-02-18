<!-- EXAMPLE USAGE -->
<!-- <FloatingNumericTextInput value={form?.percentage_discount} isError={! form?.success} msg={form?.success || form?.errors?.name && form?.errors?.name[0]} label="Percentage Discount" placeholder="Percentage to add to every purchase"/> -->

<script>
  import FormMessage from "$lib/Components/FormMessage.svelte";
  import { minusIcon, plusIcon } from "../iconPaths";

  let { class: className, name = "input-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10), isError = true, label = "", placeholder = "", gray = false, size = "py-2 px-3", min = 0, max = undefined, msg = [], value = $bindable(min), ...rest } = $props();

  const valueChars = $derived(value?.toString()?.length || 0);
  const inputWidth = $derived(valueChars < 4 ? "w-8" : valueChars > 3 && valueChars < 6 ? "w-12" : valueChars > 5 && valueChars < 10 ? "w-24" : "w-40");

  let increment = () => {
    if (max && value >= max) {
      return;
    }
    ++value;
  };

  let decrement = () => {
    if (value <= min) {
      return;
    }
    --value;
  };
</script>

<div class="relative">
  <div
    class="{size} rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-900
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} {!msg?.toString() && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
        {msg?.toString() && !isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}">
    <div class="flex w-full items-center justify-between gap-x-3">
      <div class="truncate">
        <span class="block text-sm font-medium text-gray-800 dark:text-white">
          {label}
        </span>
        <span class="block text-xs text-gray-500 dark:text-neutral-400">
          {placeholder}
        </span>
      </div>

      <div class="flex items-center gap-x-1.5" class:pr-5={msg}>
        <button
          type="button"
          class="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          tabindex="-1"
          aria-label="Decrease"
          on:click={decrement}>
          {@html minusIcon}
        </button>
        <input
          type="number"
          {name}
          id={name}
          {...rest}
          bind:value
          {min}
          {max}
          class="p-0 {inputWidth} border-0 bg-transparent text-center text-gray-800 focus:ring-0 dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style="-moz-appearance: textfield;"
          aria-roledescription="{name} field" />
        <button
          type="button"
          class="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          tabindex="-1"
          aria-label="Increase"
          on:click={increment}>
          {@html plusIcon}
        </button>
      </div>
    </div>
  </div>

  {#if msg?.toString()}
    <FormMessage type={isError ? "error" : "success"} {msg} errorIconPosition="end-0" />
  {/if}
</div>
