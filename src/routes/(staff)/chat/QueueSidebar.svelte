<script>
  import QueueCard from "./QueueCard.svelte";

  let { queue = [], myChats = [], otherActiveChats = [], selectedConversationId = null, onSelect = () => {}, onClaim = () => {} } = $props();

  let activeTab = $state("queue"); // 'queue', 'myChats', 'active'

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
    {#if getDisplayList().length === 0}
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
        {#each getDisplayList() as conversation (conversation.id)}
          <li>
            <QueueCard {conversation} isSelected={selectedConversationId === conversation.id} showClaimButton={activeTab === "queue"} onSelect={() => onSelect(conversation)} onClaim={() => onClaim(conversation.id)} />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
