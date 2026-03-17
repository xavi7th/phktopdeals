<script>
  let { conversation = null, aiSummary = "", flaggedTopics = [], waitTimeMinutes = 0, onTakeover = null } = $props();

  // Format AI summary to max 3 sentences
  function formatSummary(summary) {
    if (!summary) return "";
    const sentences = summary.split(/[.!?]+/).filter((s) => s.trim());
    return sentences.slice(0, 3).join(". ") + (sentences.length > 0 ? "." : "");
  }

  let truncatedSummary = $derived(formatSummary(aiSummary));
</script>

{#if conversation && conversation.status === "waiting_for_staff"}
  <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
    <div class="mb-3 flex items-center gap-2">
      <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">Waiting for Staff</span>
      {#if waitTimeMinutes > 0}
        <span class="text-sm text-gray-500 dark:text-neutral-400">
          Waiting for {waitTimeMinutes} minute{waitTimeMinutes !== 1 ? "s" : ""}
        </span>
      {/if}
    </div>

    {#if truncatedSummary}
      <div class="mb-3">
        <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-neutral-200">AI Summary</h4>
        <p class="text-sm text-gray-600 dark:text-neutral-400">{truncatedSummary}</p>
      </div>
    {/if}

    {#if flaggedTopics && flaggedTopics.length > 0}
      <div class="mb-3">
        <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-neutral-200">Flagged Topics</h4>
        <div class="flex flex-wrap gap-1">
          {#each flaggedTopics as topic}
            <span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-neutral-700 dark:text-neutral-200">
              {topic}
            </span>
          {/each}
        </div>
      </div>
    {/if}

    {#if onTakeover}
      <button
        onclick={() => onTakeover(conversation.id)}
        class="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800">
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        Take Over Conversation
      </button>
    {/if}
  </div>
{/if}
