<script>
  import { spinnerSVG } from "./iconPaths";

  export let label = "",
    loading = false;
</script>

<button
  class="flex items-center justify-center rounded-full bg-brand-400 px-5 py-3 text-sm hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-700 dark:text-black dark:hover:bg-brand-600"
  disabled={loading}>
  <span class="mr-2 inline-flex">{label}</span>
  {#if loading}
    {@html spinnerSVG}
  {/if}
</button>
