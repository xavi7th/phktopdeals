<!-- EXAMPLE USAGE -->
<!-- <FloatingSelectTagInput name="price_denominations" options={['Gift Cards','Games','eSim','Top Up']} msg={form?.success || (form?.errors?.price_denominations && form?.errors?.price_denominations[0])}/> -->

<script>
  import { onMount } from "svelte";
  import { pageMounted } from "$stores";
  import { isObject } from "$lib/helpers";
  import FormMessage from "../FormMessage.svelte";

  let { class: className, name = "tags-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10), isError = true, label = "Choose", gray = false, size = "pt-3 pb-0.5", msg = [], value = $bindable([]), options = [], ...rest } = $props();

  /** @type {import('@preline/select').default} elem */
  let elem = $state(undefined);

  onMount(() => {
    if ($pageMounted) {
      new window.HSSelect(document.querySelector(`#${name}`));
      elem = window.HSSelect.getInstance(`#${name}`);
    }
  });
</script>

<div
  id="{name}-wrapper"
  class="relative {className}
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} {!msg?.toString() && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg?.toString() && isError ? 'error' : ''}
        {msg?.toString() && !isError ? 'success' : ''}">
  <select
    {name}
    id={name}
    bind:value
    multiple
    data-hs-select={`{
        "placeholder": "Select option...",
        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 capitalize",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
        "mode": "tags",
        "wrapperClasses": "relative ${size} ps-0.5 pe-9 min-h-[46px] flex items-center flex-wrap text-nowrap w-full border border-gray-200 rounded-lg text-start text-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 hs-error:border-red-500 hs-success:border-teal-500 hs-error:focus:border-red-500 hs-success:focus:border-teal-500 hs-error:focus:ring-red-500 hs-success:focus:ring-teal-500 before:absolute before:inset-0 before:z-[1]",
        "tagsItemTemplate": "<div class='flex flex-nowrap items-center relative z-10 bg-white border border-gray-200 rounded-full p-1 pl-2 m-1 translate-y-1 dark:bg-neutral-900 dark:border-neutral-700 '><div class='size-6 me-1' data-icon></div><div class='whitespace-nowrap text-gray-800 dark:text-neutral-200 ' data-title></div><div class='inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer' data-remove><svg class='shrink-0 size-3' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 6 6 18'/><path d='m6 6 12 12'/></svg></div></div>",
        "tagsInputId": "${name}",
        "tagsInputClasses": "py-3 px-2 rounded-lg order-1 text-sm outline-none border-none focus:border-none ring-transparent focus:ring-transparent dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-neutral-400",
        "optionTemplate": "<div class='flex items-center'><div class='size-8 me-2' data-icon></div><div><div class='text-sm font-semibold text-gray-800 dark:text-neutral-200 ' data-title></div><div class='text-xs text-gray-500 dark:text-neutral-500 ' data-description></div></div><div class='ms-auto'><span class='hidden hs-selected:block'><svg class='shrink-0 size-4 text-brand-600' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/></svg></span></div></div>",
        "extraMarkup": [
          "<div class='hidden hs-error:block absolute top-1/2 end-8 -translate-y-1/2'><svg class='shrink-0 size-4 text-red-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' x2='12' y1='8' y2='12'/><line x1='12' x2='12.01' y1='16' y2='16'/></svg></div>",
          "<div class='hidden hs-success:flex absolute inset-y-0 end-8 items-center pointer-events-none'><svg class='shrink-0 size-4 text-teal-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></div>",
          "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
        ]
      }`}
    class="hidden">
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
  </select>

  <label for={name} class="pointer-events-none absolute start-0 top-0 h-full -translate-y-2.5 truncate border border-transparent p-4 text-xs capitalize text-gray-500 dark:text-neutral-500">{label}</label>

  {#if msg?.toString()}
    <FormMessage type={isError ? "error" : "success"} {msg} />
  {/if}
</div>
