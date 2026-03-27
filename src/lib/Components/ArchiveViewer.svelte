<script>
  import { archiveStore } from "$lib/stores/archiveStore.js";
  import { fetchArchive } from "$lib/api/archiveApi.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let isLoading = $state(true);
  let error = $state(null);

  // Get archive ID from URL
  let archiveId = $derived($page.params.id);

  // Load archive data on mount
  onMount(async () => {
    await loadArchive();
  });

  async function loadArchive() {
    isLoading = true;
    error = null;

    const result = await fetchArchive(archiveId);

    if (result.success) {
      archiveStore.selectArchive(result.data.conversation, result.data.archived_data);
    } else {
      error = result.error;
    }

    isLoading = false;
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleBack() {
    archiveStore.clearSelection();
    goto("/admin/chat/archives");
  }

  // Helper to determine if message is from staff
  function isStaffMessage(sender) {
    return sender?.type === "user" && sender?.name;
  }

  // Reactive derived values
  let archiveData = $derived($archiveStore.archiveData);
  let conversation = $derived($archiveStore.selectedArchive);
</script>

<div class="space-y-4">
  <!-- Back Button -->
  <button onclick={handleBack} class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-neutral-400">
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    Back to Archives
  </button>

  {#if isLoading}
    <div class="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-neutral-700 dark:bg-neutral-800">
      <p class="text-gray-500">Loading archive...</p>
    </div>
  {:else if error}
    <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-900/20">
      {error}
    </div>
  {:else if archiveData}
    <!-- Archive Header -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3">
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-neutral-700 dark:text-neutral-200">Archived</span>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-neutral-100">
              {conversation?.subject || "No Subject"}
            </h2>
          </div>
          <p class="mt-1 text-sm text-gray-500 dark:text-neutral-400">
            ID: <span class="font-mono">{conversation?.id}</span>
          </p>
        </div>
        <div class="text-right text-sm text-gray-500 dark:text-neutral-400">
          <p>Archived: {formatDate(conversation?.archived_at)}</p>
        </div>
      </div>

      <!-- Metadata -->
      {#if archiveData.metadata}
        <div class="mt-4 grid gap-4 border-t border-gray-200 pt-4 md:grid-cols-3 dark:border-neutral-700">
          <div>
            <p class="text-xs text-gray-500 dark:text-neutral-400">Message Count</p>
            <p class="font-medium text-gray-900 dark:text-neutral-100">{archiveData.metadata.message_count || 0}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-neutral-400">Event Count</p>
            <p class="font-medium text-gray-900 dark:text-neutral-100">{archiveData.metadata.event_count || 0}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-neutral-400">Original Status</p>
            <p class="font-medium text-gray-900 dark:text-neutral-100">{archiveData.metadata.original_status || "N/A"}</p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Messages -->
    <div class="rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
      <div class="border-b border-gray-200 px-4 py-3 dark:border-neutral-700">
        <h3 class="font-semibold text-gray-900 dark:text-neutral-100">Messages</h3>
      </div>

      <div class="max-h-[500px] space-y-4 overflow-y-auto p-4">
        {#if archiveData.messages && archiveData.messages.length > 0}
          {#each archiveData.messages as message (message.id || message.created_at)}
            {@const isStaff = isStaffMessage(message.sender)}
            <div class="flex {isStaff ? 'justify-end' : 'justify-start'}">
              <div class="max-w-[70%] {isStaff ? 'order-2' : 'order-1'}">
                {#if !isStaff}
                  <p class="mb-1 ml-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                    {message.sender?.name || "Guest"}
                  </p>
                {/if}
                <div class="rounded-lg px-3 py-2 {isStaff ? 'rounded-br-sm bg-orange-500 text-white' : 'rounded-bl-sm bg-gray-100 text-gray-900 dark:bg-neutral-700 dark:text-white'}">
                  <p class="whitespace-pre-wrap break-words text-sm">
                    {message.content}
                  </p>
                </div>
                <p class="mt-1 text-xs text-gray-400 dark:text-gray-500 {isStaff ? 'mr-1 text-right' : 'ml-1'}">
                  {formatDate(message.created_at)}
                </p>
              </div>
            </div>
          {/each}
        {:else}
          <p class="text-center text-gray-500">No messages in this archive</p>
        {/if}
      </div>
    </div>

    <!-- Events -->
    {#if archiveData.events && archiveData.events.length > 0}
      <div class="rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <div class="border-b border-gray-200 px-4 py-3 dark:border-neutral-700">
          <h3 class="font-semibold text-gray-900 dark:text-neutral-100">Events</h3>
        </div>

        <div class="divide-y divide-gray-200 dark:divide-neutral-700">
          {#each archiveData.events as event}
            <div class="flex items-center gap-3 px-4 py-2">
              <span class="text-xs text-gray-500">{formatDate(event.created_at)}</span>
              <span class="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {event.type}
              </span>
              <span class="text-sm text-gray-700 dark:text-neutral-300">{event.description || event.data || ""}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>
