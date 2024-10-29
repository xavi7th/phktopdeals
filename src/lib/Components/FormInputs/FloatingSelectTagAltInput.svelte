<!-- EXAMPLE USAGE -->
<!-- <FloatingSelectTagInput class="flex-1" label="product type" options={['Gift Cards','Games','eSim','Top Up']} msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]} multiple/> -->

<!-- <FloatingSelectTagInput name="product_type" class="flex-1" label="product type" msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]} multiple>
        {#each ['Gift Cards','Games','eSim','Top Up'] as item}
          <option value="{item}">{item}</option>
        {/each}
      </FloatingSelectTagInput> -->

<script>
	import { onMount } from 'svelte';
	import { x } from '../iconPaths';
	import SvgIcon from '../SvgIcon.svelte';
	import { isObject } from '$lib/helpers';
	import FormMessage from '../FormMessage.svelte';

  export let name = 'select-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10), msg = '', isError = true, label = 'Choose', gray = false, size='p-4', multiple = true;
  /** @type {array<string>} */
  export let value = [];

  /** @type {array | object<any, string>} */
  export let options = [];

  export {className as class}

  let className = '';

  /** @type {import('@preline/select').default} elem */
  let elem;

  onMount(() => {
    elem = window.HSSelect.getInstance(`#${name}`);

    if (elem) { // That means this is an old elem previously initialised by the init call in our root layout.
      elem?.destroy();
      new window.HSSelect(document.querySelector(`#${name}`));
      elem = window.HSSelect.getInstance(`#${name}`);
    }
  })
</script>

<div id="{name}-wrapper" class="relative {className}
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} { !msg && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg && isError ? 'error' : ''}
        {msg && ! isError ? 'success' : ''}">

  <select {name} id="{name}" bind:value {...$$restProps} multiple data-hs-select='{`{
    "placeholder": "Select ${multiple ? 'multiple' : 'single'} ${label} option${multiple ? 's' : ''}...",
    "toggleTag": "<button type='button' aria-expanded='false'></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative ${size} ps-4 pe-9 pt-6 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600 hs-error:border-red-500 hs-success:border-teal-500 hs-error:focus:border-red-500 hs-success:focus:border-teal-500 hs-error:focus:ring-red-500 hs-success:focus:ring-teal-500 before:absolute before:inset-0 before:z-[1]",
    "toggleSeparators": {
      "betweenItemsAndCounter": "&"
    },
    "toggleCountText": "selected",
    "toggleCountTextMinItems": 3,
    "toggleCountTextMode": "nItemsAndCount",
    "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
    "optionTemplate": "<div class='flex justify-between items-center w-full'><span data-title></span><span class='hidden hs-selected:block'><svg class='shrink-0 size-3.5 text-blue-600 dark:text-blue-500 ' xmlns='http:.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></span></div>",
    "extraMarkup": [
      "<div class='hidden hs-error:block absolute top-1/2 end-8 -translate-y-1/2'><svg class='shrink-0 size-4 text-red-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' x2='12' y1='8' y2='12'/><line x1='12' x2='12.01' y1='16' y2='16'/></svg></div>",
      "<div class='hidden hs-success:flex absolute inset-y-0 end-8 items-center pointer-events-none'><svg class='shrink-0 size-4 text-teal-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></div>",
      "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 ' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
    ]
  }`}' class="hidden">
      {#if isObject(options) && Object.entries(options).length > 0}
        {#each Object.entries(options) as [val, key]}
          <option value={key} >{val}</option>
        {/each}
      {:else if Array.isArray(options) && options.length > 0}
        {#each options as val}
          <option value={ val.toString().toLowerCase() } >{val}</option>
        {/each}
      {:else}
        <slot />
      {/if}

  </select>

  <label for="{name}" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none border border-transparent text-xs capitalize -translate-y-2 text-gray-500 dark:text-neutral-500">{label}</label>

  {#if msg}
    <FormMessage type="{isError ? 'error' : 'success'}" {msg}/>
  {/if}
</div>

<div class="flex flex-wrap gap-2">
  <button type="button" class="py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800" on:click={() => elem.setValue([])}>
    <SvgIcon class="shrink-0 size-3.5" svgHeight={24} slot={x}/>
  </button>
</div>
