<script>
  import { isDarkMode } from '$stores';

  let { wide } = $props();
</script>

<a class="flex-none text-xl font-semibold focus:opacity-80 focus:outline-none sm:order-1 dark:text-white" href="/">
  {#if wide}
    {#if $isDarkMode}
      <enhanced:img class="h-10 w-auto"  src="$lib/images/logos/logo-wide-light.png?enhance&w=450" alt="phkhotdeals logo" />
    {:else}
      <enhanced:img class="h-10 w-auto"  src="$lib/images/logos/logo-wide-dark.png?enhance&w=450" alt="phkhotdeals logo" />
    {/if}
  {:else}
    <enhanced:img class="ml-2 w-10 pl-2 text-neutral-400 sm:w-14" src="$lib/images/logos/logo-light.png?enhance&w=150" alt="phkhotdeals logo" />
  {/if}
</a>
