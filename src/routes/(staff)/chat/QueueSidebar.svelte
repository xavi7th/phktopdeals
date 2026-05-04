<script>
  import QueueCard from "./QueueCard.svelte";

  let { queue = [], myChats = [], otherActiveChats = [], selectedConversationId = null, isLoading = false, onSelect = () => {}, onClaim = () => {} } = $props();

  let activeTab = $state("queue"); // 'queue', 'myChats', 'active'
  let searchQuery = $state("");

  function getDisplayList() {
    switch (activeTab) {
      case "queue":
        return queue;
      case "myChats":
        return myChats;
      case "active":
        return otherActiveChats;
      default:
        return [];
    }
  }

  function getFilteredList() {
    const list = getDisplayList();
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((c) => {
      const name = c.customer?.name?.toLowerCase() || "";
      const email = c.customer?.email?.toLowerCase() || "";
      const subject = c.last_message?.content?.toLowerCase() || "";
      return name.includes(q) || email.includes(q) || subject.includes(q);
    });
  }

  function getTabLabel(tab) {
    switch (tab) {
      case "queue":
        return "Queue";
      case "myChats":
        return "My Chats";
      case "active":
        return "Active";
      default:
        return "";
    }
  }

  function getTabCount(tab) {
    switch (tab) {
      case "queue":
        return queue.length;
      case "myChats":
        return myChats.length;
      case "active":
        return otherActiveChats.length;
      default:
        return 0;
    }
  }
</script>

<div class="flex h-full flex-col">
  <!-- Tabs -->
  <div class="border-b border-gray-200 dark:border-neutral-700">
    <nav class="-mb-px flex" aria-label="Tabs">
      <button
        onclick={() => (activeTab = "queue")}
        class="flex-1 border-b-2 px-1 py-3 text-center text-sm font-medium transition-colors {activeTab === 'queue'
          ? 'border-orange-500 text-orange-600 dark:text-orange-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}">
        Queue
        {#if queue.length > 0}
          <span class="ml-1.5 rounded-full bg-orange-100 px-1.5 py-0.5 text-xs font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            {queue.length}
          </span>
        {/if}
      </button>
      <button
        onclick={() => (activeTab = "myChats")}
        class="flex-1 border-b-2 px-1 py-3 text-center text-sm font-medium transition-colors {activeTab === 'myChats'
          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}">
        My Chats
        {#if myChats.length > 0}
          <span class="ml-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {myChats.length}
          </span>
        {/if}
      </button>
      <button
        onclick={() => (activeTab = "active")}
        class="flex-1 border-b-2 px-1 py-3 text-center text-sm font-medium transition-colors {activeTab === 'active'
          ? 'border-green-500 text-green-600 dark:text-green-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}">
        Active
        {#if otherActiveChats.length > 0}
          <span class="ml-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
            {otherActiveChats.length}
          </span>
        {/if}
      </button>
    </nav>
  </div>

  <!-- Queue List -->
  <div class="flex-1 overflow-y-auto">
    <!-- Search Input -->
    <div class="border-b border-gray-100 p-2 dark:border-neutral-700">
      <input
        type="search"
        bind:value={searchQuery}
        placeholder="Search conversations..."
        class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-500" />
    </div>

    {#if isLoading}
      <div class="space-y-3 p-4">
        {#each [1, 2, 3] as i}
          <div class="animate-pulse">
            <div class="h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-700"></div>
            <div class="mt-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-neutral-700"></div>
          </div>
        {/each}
      </div>
    {:else if getFilteredList().length === 0}
      <div class="p-4 text-center text-gray-500 dark:text-gray-400">
        <svg class="mx-auto mb-2 h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-sm">
          {#if activeTab === "queue"}
            No pending chats
          {:else if activeTab === "myChats"}
            No chats assigned to you
          {:else}
            No active chats
          {/if}
        </p>
      </div>
    {:else}
      <ul class="divide-y divide-gray-100 dark:divide-neutral-700">
        {#each getFilteredList() as conversation (conversation.id)}
          <li>
            <QueueCard {conversation} isSelected={selectedConversationId === conversation.id} showClaimButton={activeTab === "queue"} onSelect={() => onSelect(conversation)} onClaim={() => onClaim(conversation.id)} />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
