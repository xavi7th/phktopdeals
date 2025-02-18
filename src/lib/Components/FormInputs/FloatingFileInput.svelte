<!-- EXAMPLE USAGE -->
<!-- <FloatingFileInput msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]} label="Product Image"/> -->
<script>
  import FormMessage from "$lib/Components/FormMessage.svelte";

  let { class: className, name = "file-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10), isError = true, label = "", gray = false, files = $bindable(undefined), msg = [], ...rest } = $props();
</script>

<div class="relative">
  <input
    type="file"
    {name}
    id={name}
    {...rest}
    bind:files
    class="block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50
        file:px-4 file:py-3 focus:z-10 focus:border-brand-500 focus:ring-brand-500
        disabled:pointer-events-none disabled:opacity-50 file:sm:py-5 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:file:bg-neutral-700 dark:file:text-neutral-400
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} {!msg && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-950 dark:bg-red-900/20' : ''}
        {msg?.toString() && !isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}" />

  <label for={name} class="pointer-events-none absolute start-28 top-2 h-full -translate-y-2 truncate border border-transparent text-xs capitalize text-gray-500 dark:text-neutral-500">
    {label}
  </label>

  {#if msg?.toString()}
    <FormMessage {name} type={isError ? "error" : "success"} {msg} />
  {/if}
</div>
