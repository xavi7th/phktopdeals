<!-- EXAMPLE USAGE -->
<!-- <FloatingSelectInput label="Product Type" options={['Gift Cards','Games','eSim','Top Up']} msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]}/> -->

<!-- <FloatingSelectInput label="Product Type" msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]} size='py-2 px-3'>
  {#each ['Gift Cards','Games','eSim','Top Up'] as item}
    <option>{item}</option>
  {/each}
</FloatingSelectInput> -->

<script>
	import { isObject } from '$lib/helpers';
	import FormMessage from '../FormMessage.svelte';

  export let name = 'select-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10), isError = true, label = 'Choose', gray = false, size='p-4', value = '';

  /** @type {string|string[]|undefined} */
  export let msg = [];

  /** @type {string[] | Object<any, string>} */
  export let options = [];

  export {className as class}

  let className = '';
</script>

<div class="relative { className }">
  <select {name} id="{name}" bind:value class="peer {size} pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500/50 focus:ring-brand-500/50
        disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
        dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} { !msg?.toString() && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
        {msg?.toString() && ! isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}" {...$$restProps}>

        <option value="{undefined}">Select a choice</option>

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

  <label for="{name}" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent
          peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
          peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500
          dark:peer-focus:text-neutral-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">{label}</label>

  {#if msg?.toString()}
    <FormMessage type="{isError ? 'error' : 'success'}" {msg}/>
  {/if}
</div>
