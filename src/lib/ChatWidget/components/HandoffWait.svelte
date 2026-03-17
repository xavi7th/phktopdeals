<script>
  import { isWaitingForStaff } from "$lib/ChatWidget/chatStore.js";

  // Animated dots for "Connecting" animation
  let dotCount = $state(0);

  // Animate dots
  $effect(() => {
    if ($isWaitingForStaff) {
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
      }, 400);

      return () => clearInterval(interval);
    }
  });
</script>

{#if $isWaitingForStaff}
  <div class="mx-3 mb-3 rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-blue-700 dark:bg-blue-900/20">
    <div class="flex items-center gap-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
        <svg class="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
        Connecting you to a live agent
        <span class="inline-block w-12">
          {#if dotCount === 0}<span class="text-blue-600"></span>{/if}{#if dotCount >= 1}.{/if}{#if dotCount >= 2}..{/if}{#if dotCount >= 3}...{/if}
        </span>
      </p>
    </div>
  </div>
{/if}
