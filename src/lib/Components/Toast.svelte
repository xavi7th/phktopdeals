<!-- Example Usage -->
<!-- <Toast positioned={false} type="error" msg={form?.message}/> <Toast dismissable={false} msg="Consider yourself notified about this matter"/> -->

<!-- <Toast positioned={false} type={$message.type} msg={$message.msg} >
  <ul class="ml-4 list-disc text-xs">
    <li>This transaction is irreversible.</li>
    <li>The funds will be deducted immediately from your balance.</li>
    <li>Please ensure you have sufficient funds in your account before proceeding.</li>
  </ul>
</Toast> -->

<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { fly } from "svelte/transition";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { bell, checkMarkFilledAlt, exclamationFilled, infoFilled, x, xFilled } from "./iconPaths";

  let dispatch = createEventDispatcher();

  export let type = "grey",
    msg = "A toast message is required",
    dismissable = true,
    positioned = true,
    toastId = "toast-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10),
    timeout = 5000;

  /** @type {Object<string, Object<string, string>>} */
  let toastClasses = {
    grey: {
      bg: "bg-gray-200 border border-gray-300 text-sm text-gray-800 rounded-lg dark:bg-white/20 dark:border-white/20 dark:text-white",
      close: "text-gray-800 dark:text-white",
    },
    success: {
      bg: "bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg dark:bg-teal-800/20 dark:border-teal-900 dark:text-teal-500",
      close: "text-teal-800 dark:text-teal-200",
    },
    info: {
      bg: "bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg dark:bg-blue-800/20 dark:border-blue-900 dark:text-blue-500",
      close: "text-blue-800 dark:text-blue-200",
      icon: "text-blue-500",
    },
    error: {
      bg: "bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/20 dark:border-red-900 dark:text-red-500",
      close: "text-red-800 dark:text-red-200",
    },
    warning: {
      bg: "bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg dark:bg-yellow-800/20 dark:border-yellow-900 dark:text-yellow-500",
      close: "text-yellow-800 dark:text-yellow-200",
    },
    white: {
      bg: "bg-white border border-gray-200 text-gray-700 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400",
      close: "text-gray-800 dark:text-white",
    },
  };

  let showToast = msg ? true : false,
    /** @type {HTMLElement} */
    toastContentContainer;

  function calculateTimeout(msg = "") {
    const maxTimeout = 10 * 60 * 1000;
    const timeoutPerChar = 50; // adjust this value to change the timeout increment per character

    const msgLength = msg.toString().length;
    timeout = Math.min(maxTimeout, Math.max(timeout, msgLength * timeoutPerChar));

    return timeout;
  }

  onMount(() => {
    setTimeout(() => {
      showToast = false;
      dispatch("toastClosed");
    }, calculateTimeout(toastContentContainer.innerText));
  });
</script>

{#if showToast}
  <div class="toast max-h-[50vh] overflow-scroll {positioned ? 'fixed end-3 top-32 z-50 transition duration-300 lg:top-20' : ''}" in:fly={{ x: 50, duration: 2000 }} out:fly={{ x: 50, duration: 1000 }}>
    <div
      id={toastId}
      class="max-w-xs rounded-xl shadow-lg transition duration-300 hs-removing:translate-x-5 hs-removing:opacity-0 {toastClasses[`${type}`]?.bg}"
      role="alert"
      tabindex="-1"
      aria-labelledby="{toastId}-label">
      <div class="flex p-4">
        <div class="shrink-0 self-center">
          {#if type == "info"}
            <SvgIcon class="mt-0.5 size-4 shrink-0 text-blue-500" svgHeight={16} fill="currentColor" slot={infoFilled} />
          {:else if type == "success"}
            <SvgIcon class="mt-0.5 size-4 shrink-0 text-teal-500" svgHeight={16} fill="none" slot={checkMarkFilledAlt} />
          {:else if type == "error"}
            <SvgIcon class="size-4 shrink-0 text-red-500" svgHeight={16} fill="none" slot={xFilled} />
          {:else if type == "warning"}
            <SvgIcon class="mt-0.5 size-4 shrink-0 text-yellow-500" svgHeight={16} fill="currentColor" slot={exclamationFilled} />
          {:else}
            <SvgIcon class="mt-0.5 size-4 shrink-0 text-gray-600" svgHeight={16} fill="currentColor" slot={bell} />
          {/if}
        </div>

        <div bind:this={toastContentContainer} class="me-3 ms-3">
          <p id="{toastId}-label" class="mb-4 text-sm">{@html msg}</p>
          <slot />
        </div>

        {#if dismissable}
          <div class="ms-auto">
            <button
              type="button"
              class="inline-flex size-5 shrink-0 items-center justify-center rounded-lg opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none {toastClasses[`${type}`]?.close}"
              aria-label="Close"
              data-hs-remove-element={`#${toastId}`}
              on:click={() => (showToast = false)}>
              <span class="sr-only">Close</span>
              <SvgIcon class="size-4 shrink-0" svgHeight={24} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={x} />
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
