<script>
  import { chatStore, showEscalationPrompt, escalationReason } from "$lib/ChatWidget/chatStore.js";

  let { onContinueWithAi = null, onTransferToAgent = null } = $props();

  function handleContinueWithAi() {
    chatStore.hideEscalation();
    if (onContinueWithAi) {
      onContinueWithAi();
    }
  }

  function handleTransferToAgent() {
    if (onTransferToAgent) {
      onTransferToAgent();
    }
  }
</script>

{#if $showEscalationPrompt}
  <div class="mx-3 mb-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 shadow-sm dark:border-yellow-700 dark:bg-yellow-900/20">
    <div class="mb-3">
      <p class="text-sm font-medium text-yellow-800 dark:text-gray-500">I am unable to answer your queries further, please wait while I transfer you to a live agent...</p>
    </div>

    <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <button
        onclick={handleContinueWithAi}
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600">
        Continue with AI
      </button>
      <button
        onclick={handleTransferToAgent}
        class="inline-flex items-center justify-center rounded-lg bg-yellow-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
        Transfer to Agent
      </button>
    </div>
  </div>
{/if}
