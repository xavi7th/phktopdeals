<script>
  let { conversation = null, aiSummary = "", flaggedTopics = [], messageCount = 0, onTakeover = null } = $props();

  function handleTakeover() {
    if (onTakeover) {
      onTakeover(conversation.id);
    }
  }
</script>

{#if conversation && conversation.status === "escalated"}
  <div class="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-900/20">
    <div class="mb-3 flex items-center gap-2">
      <span class="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">AI Escalation</span>
      <span class="text-sm text-gray-500 dark:text-neutral-400">
        {messageCount} messages before escalation
      </span>
    </div>

    {#if aiSummary}
      <div class="mb-3">
        <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-neutral-200">AI Summary</h4>
        <p class="text-sm text-gray-600 dark:text-neutral-400">{aiSummary}</p>
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

    <button
      onclick={handleTakeover}
      class="inline-flex items-center gap-x-2 rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
      Take Over Conversation
    </button>
  </div>
{/if}
