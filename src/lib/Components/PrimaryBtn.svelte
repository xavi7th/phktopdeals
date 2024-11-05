<script>
	import { spinnerSVG } from './iconPaths';

    export let label='', loading=false;
</script>

<button class="flex justify-center items-center bg-brand-400 hover:bg-brand-500 dark:bg-brand-700 dark:hover:bg-brand-600 dark:text-black rounded-full px-5 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
    <span class="inline-flex mr-2">{label} </span>
    {#if loading} {@html spinnerSVG} {/if}
</button>
