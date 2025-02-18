<!-- EXAMPLE USAGE -->
<!-- <FloatingSelectInput label="Product Type" options={['Gift Cards','Games','eSim','Top Up']} msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]}/> -->

<!-- <FloatingSelectInput label="Product Type" msg={form?.success || form?.errors?.product_type && form?.errors?.product_type[0]} size='py-2 px-3'>
  {#each ['Gift Cards','Games','eSim','Top Up'] as item}
    <option>{item}</option>
  {/each}
</FloatingSelectInput> -->

<script>
  import { isObject } from "$lib/helpers";
  import FormMessage from "../FormMessage.svelte";

  let { class: className, name = "select-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10), isError = true, label = "Choose", gray = false, size = "p-4", value = $bindable(""), msg = [], options = [], ...rest } = $props();
</script>

<div class="relative {className}">
  <select
    {name}
    id={name}
    bind:value
    class="peer {size} block w-full rounded-lg border-gray-200 pe-9 text-sm autofill:pb-2 autofill:pt-6
        focus:border-brand-500/50 focus:pb-2 focus:pt-6 focus:ring-brand-500/50 disabled:pointer-events-none
        disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:focus:ring-neutral-600 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6
        {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} {!msg?.toString() && gray ? 'border-transparent dark:border-transparent' : ''}
        {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
        {msg?.toString() && !isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}"
    {...rest}>
    <option value={undefined}>Select a choice</option>

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

  <label
    for={name}
    class="pointer-events-none absolute start-0 top-0 h-full truncate border border-transparent p-4 transition duration-100 ease-in-out
          peer-focus:-translate-y-1.5 peer-focus:text-xs peer-focus:text-gray-500 peer-disabled:pointer-events-none peer-disabled:opacity-50
          peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500
          dark:text-neutral-500 dark:peer-focus:text-neutral-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
    {label}
  </label>

  {#if msg?.toString()}
    <FormMessage type={isError ? "error" : "success"} {msg} />
  {/if}
</div>
