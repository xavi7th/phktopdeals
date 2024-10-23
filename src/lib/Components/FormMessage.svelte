<script>
  import SvgIcon from '$lib/Components/SvgIcon.svelte';
  import {exclamationCircle, checkMarkFilled} from '$lib/Components/iconPaths';

  export let msg = undefined, type = 'error';
</script>

<div class="absolute top-0 bottom-7 {type == 'error' ? 'end-0' : 'end-4'} flex items-center pointer-events-none pe-3">
  <SvgIcon
      class="shrink-0 size-4 {type == 'error' ? 'text-red-500' : 'text-teal-500'}"
      svgHeight={24} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      slot={type == 'error' ? exclamationCircle : checkMarkFilled}/>
</div>

{#if msg}
  <p class="text-sm {type == 'error' ? 'text-red-600 dark:text-red-300' : 'text-teal-600 datk:text-teal-300'} mt-2" id="hs-validation-name-error-helper">{ msg }</p>
{/if}
