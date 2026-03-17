<script>
  import { staffApi } from "$lib/api/staff.js";

  let { conversationId = null, aiSummary = "", isLoading = false, onSuccess = null, onError = null } = $props();

  let showModal = $state(false);
  let claimLoading = $state(false);
  let claimError = $state(null);

  // Format AI summary for modal preview (max 3 sentences)
  function formatSummary(summary) {
    if (!summary) return "No summary available";
    const sentences = summary.split(/[.!?]+/).filter((s) => s.trim());
    return sentences.slice(0, 3).join(". ") + (sentences.length > 0 ? "." : "");
  }

  let summaryPreview = $derived(formatSummary(aiSummary));

  function handleTakeoverClick() {
    showModal = true;
  }

  function handleCancel() {
    showModal = false;
    claimError = null;
  }

  async function handleConfirm() {
    if (!conversationId) return;

    claimLoading = true;
    claimError = null;

    try {
      const response = await staffApi.claimHandoff(conversationId);

      if (response.success) {
        showModal = false;
        if (onSuccess) {
          onSuccess(response.data);
        }
      } else {
        claimError = response.message || "Failed to claim conversation";
        if (onError) {
          onError(claimError);
        }
      }
    } catch (error) {
      claimError = error.message || "An error occurred while claiming the conversation";
      if (onError) {
        onError(claimError);
      }
    } finally {
      claimLoading = false;
    }
  }
</script>

<!-- Take Over Button -->
<button
  onclick={handleTakeoverClick}
  disabled={isLoading}
  class="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-neutral-800">
  {#if isLoading}
    <svg class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Claiming...
  {:else}
    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
    Take Over
  {/if}
</button>

<!-- Confirmation Modal -->
{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50" onclick={handleCancel} role="button" tabindex="-1" onkeydown={(e) => e.key === "Escape" && handleCancel()}></div>

    <!-- Modal -->
    <div class="relative z-10 mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-neutral-800">
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-neutral-100">Take Over Conversation</h3>

      <div class="mb-4">
        <p class="mb-2 text-sm text-gray-600 dark:text-neutral-400">Are you sure you want to take over this conversation? The customer will be notified that you've joined.</p>

        {#if aiSummary}
          <div class="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700">
            <p class="mb-1 text-xs font-medium text-gray-500 dark:text-neutral-400">AI Summary Preview:</p>
            <p class="text-sm text-gray-700 dark:text-neutral-300">{summaryPreview}</p>
          </div>
        {/if}
      </div>

      {#if claimError}
        <div class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {claimError}
        </div>
      {/if}

      <div class="flex justify-end gap-2">
        <button
          onclick={handleCancel}
          disabled={claimLoading}
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700">
          Cancel
        </button>
        <button onclick={handleConfirm} disabled={claimLoading} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
          {#if claimLoading}
            <span class="flex items-center gap-2">
              <svg class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Claiming...
            </span>
          {:else}
            Confirm Take Over
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}
