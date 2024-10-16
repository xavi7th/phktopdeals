<!-- Example Usage -->
<!-- <Toast positioned={false} type="error" msg={form?.message}/> <Toast dismissable={false} msg="Consider yourself notified about this matter"/> -->

<script>
  import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { bell, checkMarkFilledAlt, exclamationFilled, infoFilled, x, xFilled } from './iconPaths';

  export let type = 'grey', msg = 'A toast message is required', dismissable = true, positioned = true, toastId = 'toast-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10);

  /** @type {Object<string, Object<string, string>}*/
  let toastClasses = {
    grey: {
      bg: 'bg-gray-200 border border-gray-300 text-sm text-gray-800 rounded-lg dark:bg-white/10 dark:border-white/20 dark:text-white',
      close: 'text-gray-800 dark:text-white',
    },
    success: {
      bg: 'bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500',
      close: 'text-teal-800 dark:text-teal-200',
    },
    info: {
      bg: 'bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500',
      close: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-500'
    },
    error: {
      bg: 'bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500',
      close: 'text-red-800 dark:text-red-200',
    },
    warning: {
      bg: 'bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500',
      close: 'text-yellow-800 dark:text-yellow-200',
    },
    white: {
      bg: 'bg-white border border-gray-200 text-gray-700 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400',
      close: 'text-gray-800 dark:text-white',
    },
  }
</script>

<div class="{positioned ? 'fixed top-24 end-3' : ''}">
  <div id="{toastId}" class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs rounded-xl shadow-lg {toastClasses[`${type}`]?.bg}" role="alert" tabindex="-1" aria-labelledby="{toastId}-label">
    <div class="flex p-4">
      <div class="shrink-0 self-center">
        {#if type == 'info'}
          <SvgIcon class="shrink-0 size-4 text-blue-500 mt-0.5" svgHeight={16} fill="currentColor" slot={infoFilled}/>
        {:else if  type == 'success'}
          <SvgIcon class="shrink-0 size-4 text-teal-500 mt-0.5" svgHeight={16} fill="currentColor" slot={checkMarkFilledAlt}/>
        {:else if  type == 'error'}
          <SvgIcon class="shrink-0 size-4 text-red-500" svgHeight={16} fill="currentColor" slot={xFilled}/>
        {:else if  type == 'warning'}
          <SvgIcon class="shrink-0 size-4 text-yellow-500 mt-0.5" svgHeight={16} fill="currentColor" slot={exclamationFilled}/>
        {:else}
          <SvgIcon class="shrink-0 size-4 text-gray-600 mt-0.5" svgHeight={16} fill="currentColor" slot={bell}/>
        {/if}
      </div>

      <div class="ms-3 me-3">
        <p id="{toastId}-label" class="text-sm">{msg}</p>
      </div>

      {#if dismissable}
        <div class="ms-auto">
          <button type="button" class="inline-flex shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 {toastClasses[`${type}`]?.close}" aria-label="Close" data-hs-remove-element="{`#${toastId}`}">
            <span class="sr-only">Close</span>
            <SvgIcon class="shrink-0 size-4" svgHeight={24} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={x}/>
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
