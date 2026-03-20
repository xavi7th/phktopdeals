<script>
  import MessageBubble from "./MessageBubble.svelte";
  import CannedResponseDropdown from "./CannedResponseDropdown.svelte";

  let {
    conversation,
    messages = [],
    customer = null,
    staffList = [],
    pagination = null,
    onLoadMore = () => {},
    onTransfer = () => {},
    onResolve = () => {},
    onSendMessage = () => {},
    onCannedResponseSelect = () => {},
  } = $props();

  let messageInput = $state("");
  let isSending = $state(false);
  let showTransferDropdown = $state(false);
  let showResolveConfirm = $state(false);
  let showCannedDropdown = $state(false);
  let messagesContainer;
  let isLoadingMore = $state(false);

  const MAX_MESSAGE_LENGTH = 1000;

  // Auto-scroll to bottom when messages change
  $effect(() => {
    if (messagesContainer && messages) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 50);
    }
  });

  async function handleLoadMore() {
    if (isLoadingMore || !pagination?.next_cursor) return;
    isLoadingMore = true;
    try {
      await onLoadMore(pagination.next_cursor);
    } finally {
      isLoadingMore = false;
    }
  }

  function handleCannedResponseSelect(response) {
    messageInput = response.content;
    showCannedDropdown = false;
    onCannedResponseSelect(response);
  }

  function handleInput(event) {
    messageInput = event.target.value;
    // Resize textarea
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  async function handleSendMessage(event) {
    event.preventDefault();
    if (!messageInput.trim() || isSending) return;

    isSending = true;
    try {
      const result = await onSendMessage(messageInput.trim());
      if (result?.success) {
        messageInput = "";
      }
    } finally {
      isSending = false;
    }
  }

  async function handleTransfer(staffId) {
    showTransferDropdown = false;
    await onTransfer(staffId);
  }

  async function handleResolve() {
    showResolveConfirm = false;
    await onResolve();
  }

  function getStatusBadge(status) {
    const badges = {
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      claimed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      resolved: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    };
    return badges[status] || badges.pending;
  }
</script>

<div class="flex h-full flex-col">
  <!-- Conversation Header -->
  <div class="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
    <div class="flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-700">
        <span class="text-lg font-medium text-gray-600 dark:text-gray-300">
          {customer?.name?.charAt(0).toUpperCase() || "G"}
        </span>
      </div>
      <div>
        <h2 class="font-semibold text-gray-900 dark:text-white">
          {customer?.name || "Guest"}
        </h2>
        <span class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium {getStatusBadge(conversation?.status)}">
          {conversation?.status || "pending"}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <!-- Transfer Dropdown -->
      <div class="relative">
        <button
          onclick={() => (showTransferDropdown = !showTransferDropdown)}
          class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600">
          Transfer
        </button>

        {#if showTransferDropdown}
          <div class="absolute right-0 z-10 mt-1 w-56 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            <div class="p-2">
              <p class="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">Select staff to transfer</p>
              {#if staffList.length === 0}
                <p class="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">No other staff available</p>
              {:else}
                {#each staffList as staff (staff.id)}
                  <button onclick={() => handleTransfer(staff.id)} class="w-full rounded px-2 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-neutral-700">
                    <span class="font-medium text-gray-900 dark:text-white">{staff.name}</span>
                    <span class="ml-1 text-gray-500 dark:text-gray-400">({staff.email})</span>
                    {#if staff.is_online}
                      <span class="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    {/if}
                  </button>
                {/each}
              {/if}
            </div>
          </div>
        {/if}
      </div>

      <!-- Resolve Button -->
      {#if conversation?.status !== "resolved"}
        <button onclick={() => (showResolveConfirm = true)} class="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">Resolve</button>
      {/if}
    </div>
  </div>

  <!-- Resolve Confirmation -->
  {#if showResolveConfirm}
    <div class="border-b border-green-200 bg-green-50 px-4 py-2 dark:border-green-800 dark:bg-green-900/20">
      <p class="text-sm text-green-800 dark:text-green-200">Are you sure you want to resolve this conversation?</p>
      <div class="mt-2 flex gap-2">
        <button onclick={handleResolve} class="rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700">Yes, Resolve</button>
        <button
          onclick={() => (showResolveConfirm = false)}
          class="rounded border border-green-300 bg-white px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-50 dark:border-green-600 dark:bg-transparent dark:text-green-400">
          Cancel
        </button>
      </div>
    </div>
  {/if}

  <!-- Messages -->
  <div bind:this={messagesContainer} class="flex-1 space-y-4 overflow-y-auto p-4">
    <!-- Load More -->
    {#if pagination?.has_more}
      <div class="flex justify-center py-2">
        <button
          onclick={handleLoadMore}
          disabled={isLoadingMore}
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-700">
          {isLoadingMore ? "Loading..." : "Load older messages"}
        </button>
      </div>
    {/if}

    {#if messages.length === 0}
      <div class="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
        <p>No messages yet</p>
      </div>
    {:else}
      {#each messages as message (message.id)}
        <MessageBubble {message} />
      {/each}
    {/if}
  </div>

  <!-- Message Input -->
  <form onsubmit={handleSendMessage} class="border-t border-gray-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
    <div class="flex items-end gap-2">
      <!-- Canned Response Button -->
      <div class="relative">
        <button
          type="button"
          onclick={() => (showCannedDropdown = !showCannedDropdown)}
          class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-700"
          title="Canned responses">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </button>

        {#if showCannedDropdown}
          <CannedResponseDropdown {customer} onSelect={handleCannedResponseSelect} onClose={() => (showCannedDropdown = false)} />
        {/if}
      </div>

      <div class="flex-1">
        <textarea
          value={messageInput}
          placeholder="Type your reply..."
          rows="1"
          maxlength={MAX_MESSAGE_LENGTH}
          class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
          oninput={handleInput}
          onkeydown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={!messageInput.trim() || isSending}
        class="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
        {isSending ? "Sending..." : "Send"}
      </button>
    </div>
    <!-- Character Counter -->
    <div class="mt-1 flex justify-end">
      <span class="text-xs {messageInput.length > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-400'}">
        {messageInput.length}/{MAX_MESSAGE_LENGTH}
      </span>
    </div>
  </form>
</div>
