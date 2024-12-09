<script>
  // import { pageMounted } from '$stores';
  import { onDestroy, onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    // Dispatch an event to the parent
    dispatch("handleClick");
  }

  export let title = "",
    actionTitle = "Create",
    name = "modal-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10);

  onMount(() => {
    //   if ($pageMounted) {
    //     new window.HSOverlay(document.querySelector(`#${name}`));
    //     elem = window.HSOverlay.getInstance(`#${name}`);
    //   }
    // window.HSStaticMethods.autoInit();
  });

  onDestroy(() => {
    typeof window !== "undefined" && window?.HSOverlay?.close(`#${name}`);
  });
</script>

<div
  id={name}
  class="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden [--overlay-backdrop:static]"
  role="dialog"
  tabindex="-1"
  aria-labelledby="{name}-label"
  data-hs-overlay-keyboard="false">
  <div class="m-3 mt-0 opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg">
    <div class="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
      <div class="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700">
        <h3 id="{name}-label" class="font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          aria-label="Close"
          data-hs-overlay={`#${name}`}>
          <span class="sr-only">Close</span>
          <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-4">
        <slot name="content" />
        <slot name="form" />
      </div>
      <div class="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
        <slot name="footer">
          <button
            type="button"
            class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            on:click={handleClick}>
            {actionTitle}
          </button>
        </slot>

        <button
          type="button"
          class="inline-flex items-center gap-x-2 rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          data-hs-overlay={`#${name}`}>
          Close
        </button>
      </div>
    </div>
  </div>
</div>
