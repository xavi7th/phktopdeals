<script>
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";

  /**
   * NotificationToast - extends Toast for notification purposes
   * @prop {string} title - Notification title
   * @prop {string} message - Notification message
   * @prop {string} type - Toast type (info, success, warning, error)
   * @prop {string} conversationId - Optional conversation ID for navigation
   */
  export let title = "";
  export let message = "";
  export let type = "info";
  export let conversationId = null;

  const dispatch = createEventDispatcher();

  function handleClick() {
    if (conversationId) {
      goto(`/chat/${conversationId}`);
    }
    dispatch("click", { conversationId });
  }
</script>

<!-- NotificationToast extends Toast with notification-specific styling -->
<div
  class="notification-toast fixed end-3 top-20 z-50 max-w-xs cursor-pointer rounded-xl shadow-lg transition duration-300"
  class:bg-teal-100={type === "success"}
  class:border-teal-200={type === "success"}
  class:text-teal-800={type === "success"}
  class:dark:bg-teal-800/20={type === "success"}
  class:dark:border-teal-900={type === "success"}
  class:dark:text-teal-500={type === "success"}
  class:bg-blue-100={type === "info"}
  class:border-blue-200={type === "info"}
  class:text-blue-800={type === "info"}
  class:dark:bg-blue-800/20={type === "info"}
  class:dark:border-blue-900={type === "info"}
  class:dark:text-blue-500={type === "info"}
  class:bg-red-100={type === "error" || type === "urgent"}
  class:border-red-200={type === "error" || type === "urgent"}
  class:text-red-800={type === "error" || type === "urgent"}
  class:dark:bg-red-800/20={type === "error" || type === "urgent"}
  class:dark:border-red-900={type === "error" || type === "urgent"}
  class:dark:text-red-500={type === "error" || type === "urgent"}
  role="alert"
  tabindex="0"
  on:click={handleClick}
  on:keypress={(e) => e.key === "Enter" && handleClick()}>
  <div class="flex items-start gap-3 p-4">
    <div class="shrink-0">
      {#if type === "urgent" || type === "error"}
        <svg class="size-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      {:else}
        <svg class="size-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      {/if}
    </div>
    <div class="flex-1">
      {#if title}
        <p class="mb-1 font-semibold">{title}</p>
      {/if}
      <p class="text-sm">{message}</p>
    </div>
  </div>
</div>
