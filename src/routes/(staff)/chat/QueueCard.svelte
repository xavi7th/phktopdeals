<script>
  let { conversation, isSelected = false, showClaimButton = false, onSelect = () => {}, onClaim = () => {} } = $props();

  let isClaiming = $state(false);

  async function handleClaim(event) {
    event.stopPropagation();
    isClaiming = true;
    try {
      await onClaim();
    } finally {
      isClaiming = false;
    }
  }

  function formatWaitTime(minutes) {
    if (minutes < 1) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes}m`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours}h`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days}d`;
    }
  }

  function getWaitTimeClass(minutes) {
    if (minutes < 5) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (minutes < 15) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }

  const customerName = conversation?.customer?.name || "Guest";
  const customerEmail = conversation?.customer?.email || "";
  const lastMessage = conversation?.last_message?.content || "No messages yet";
</script>

<button type="button" onclick={onSelect} class="w-full p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700 {isSelected ? 'bg-orange-50 dark:bg-orange-900/20' : ''}">
  <div class="flex items-start justify-between gap-2">
    <div class="min-w-0 flex-1">
      <!-- Customer Name -->
      <div class="flex items-center gap-2">
        <span class="truncate font-medium text-gray-900 dark:text-white">
          {customerName}
        </span>
        {#if conversation?.customer?.type === "user"}
          <span class="inline-flex items-center rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">User</span>
        {:else}
          <span class="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">Guest</span>
        {/if}
      </div>

      <!-- Customer Email -->
      {#if customerEmail}
        <p class="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
          {customerEmail}
        </p>
      {/if}

      <!-- Last Message Preview -->
      <p class="mt-1 truncate text-sm text-gray-600 dark:text-gray-300">
        {lastMessage}
      </p>
    </div>

    <div class="flex flex-col items-end gap-1">
      <!-- Wait Time Badge -->
      <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium {getWaitTimeClass(conversation?.wait_time || 0)}">
        {formatWaitTime(conversation?.wait_time || 0)}
      </span>

      <!-- Claim Button -->
      {#if showClaimButton}
        <button
          type="button"
          onclick={handleClaim}
          disabled={isClaiming}
          class="mt-1 rounded bg-orange-500 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
          {isClaiming ? "Claiming..." : "Claim"}
        </button>
      {/if}

      <!-- Assigned To (for active chats) -->
      {#if conversation?.assigned_to}
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {conversation.assigned_to}
        </span>
      {/if}
    </div>
  </div>

  <!-- Message Count -->
  <div class="mt-2 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    <span>{conversation?.message_count || 0} messages</span>
  </div>
</button>
