<!-- EXAMPLE USAGE -->
<!-- <FloatingFileInput msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]} label="Product Image"/> -->
<script>
	import FormMessage from '$lib/Components/FormMessage.svelte';

  export let name = 'file-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10), msg = '', isError = true, label = '', gray = false, files = undefined;
</script>

<div class="relative">
  <input type="file" {name} id={name} {...$$restProps} bind:files class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-brand-500 focus:ring-brand-500
        disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
        file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 file:sm:py-5 dark:file:bg-neutral-700 dark:file:text-neutral-400
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} { !msg && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20 dark:border-red-950' : ''}
        {msg && ! isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}">

  <label for="{name}" class="absolute top-2 start-28 h-full truncate pointer-events-none border border-transparent text-xs capitalize -translate-y-2 text-gray-500 dark:text-neutral-500">
    {label}
  </label>

  {#if msg}
    <FormMessage {name} type="{isError ? 'error' : 'success'}" {msg}/>
  {/if}

</div>
