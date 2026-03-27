<script>
  import { onMount } from "svelte";
  import { archiveStore } from "$lib/stores/archiveStore.js";
  import { fetchArchives, triggerManualArchive } from "$lib/api/archiveApi.js";
  import { goto } from "$app/navigation";
  import Toast from "./Toast.svelte";

  let toastMessage = "";
  let toastType = "success";
  let showToast = false;

  // Local filter state
  let filters = {
    conversation_id: "",
    date_from: "",
    date_to: "",
    customer: "",
  };

  async function loadArchives(page = 1) {
    archiveStore.setLoading(true);

    const params = {
      page,
      ...(filters.conversation_id && { conversation_id: filters.conversation_id }),
      ...(filters.date_from && { date_from: filters.date_from }),
      ...(filters.date_to && { date_to: filters.date_to }),
      ...(filters.customer && { customer: filters.customer }),
    };

    const result = await fetchArchives(params);

    if (result.success) {
      archiveStore.setArchives(result.data);
    } else {
      archiveStore.setError(result.error);
    }
  }

  async function handleSearch() {
    await loadArchives(1);
  }

  async function handleReset() {
    filters = {
      conversation_id: "",
      date_from: "",
      date_to: "",
      customer: "",
    };
    archiveStore.resetFilters();
    await loadArchives(1);
  }

  function handleViewArchive(archive) {
    archiveStore.selectArchive(archive);
    goto(`/admin/chat/archives/${archive.id}`);
  }

  async function handleManualArchive() {
    const result = await triggerManualArchive(100);

    if (result.success) {
      toastMessage = `Archived ${result.data.archived} conversations`;
      toastType = "success";
      showToast = true;
      await loadArchives(1);
    } else {
      toastMessage = result.error || "Failed to trigger archive";
      toastType = "error";
      showToast = true;
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  onMount(() => {
    loadArchives();
  });
</script>

<div class="space-y-4">
  <!-- Search Filters -->
  <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
    <h3 class="mb-3 text-sm font-semibold text-gray-800 dark:text-neutral-200">Search Archives</h3>

    <div class="grid gap-4 md:grid-cols-5">
      <div>
        <label for="conversation_id" class="mb-1 block text-xs text-gray-600 dark:text-neutral-400">Conversation ID</label>
        <input
          id="conversation_id"
          type="text"
          bind:value={filters.conversation_id}
          placeholder="Search by ID..."
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200" />
      </div>

      <div>
        <label for="date_from" class="mb-1 block text-xs text-gray-600 dark:text-neutral-400">Date From</label>
        <input
          id="date_from"
          type="date"
          bind:value={filters.date_from}
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200" />
      </div>

      <div>
        <label for="date_to" class="mb-1 block text-xs text-gray-600 dark:text-neutral-400">Date To</label>
        <input
          id="date_to"
          type="date"
          bind:value={filters.date_to}
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200" />
      </div>

      <div>
        <label for="customer" class="mb-1 block text-xs text-gray-600 dark:text-neutral-400">Customer</label>
        <input
          id="customer"
          type="text"
          bind:value={filters.customer}
          placeholder="Name or email..."
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200" />
      </div>

      <div class="flex items-end gap-2">
        <button onclick={handleSearch} class="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Search</button>
        <button onclick={handleReset} class="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-600 dark:text-neutral-300">Reset</button>
      </div>
    </div>

    <div class="mt-4 flex justify-end">
      <button onclick={handleManualArchive} class="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">Run Manual Archive</button>
    </div>
  </div>

  <!-- Results List -->
  <div class="rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
    {#if $archiveStore.isLoading}
      <div class="p-8 text-center text-gray-500">Loading archives...</div>
    {:else if $archiveStore.error}
      <div class="p-8 text-center text-red-500">{$archiveStore.error}</div>
    {:else if $archiveStore.archives.length === 0}
      <div class="p-8 text-center text-gray-500">No archives found</div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-neutral-700 dark:text-neutral-400">
            <tr>
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">Subject</th>
              <th class="px-4 py-3">Customer</th>
              <th class="px-4 py-3">Archived Date</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
            {#each $archiveStore.archives as archive}
              <tr class="hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td class="px-4 py-3 font-mono text-xs">{archive.id}</td>
                <td class="px-4 py-3">{archive.subject || "No subject"}</td>
                <td class="px-4 py-3">
                  {#if archive.starter}
                    <div class="flex flex-col">
                      <span class="font-medium">{archive.starter.name || "Unknown"}</span>
                      <span class="text-xs text-gray-500">{archive.starter.email || ""}</span>
                    </div>
                  {:else}
                    <span class="text-gray-400">Unknown</span>
                  {/if}
                </td>
                <td class="px-4 py-3">{formatDate(archive.archived_at)}</td>
                <td class="px-4 py-3">
                  <button onclick={() => handleViewArchive(archive)} class="text-blue-600 hover:text-blue-800 dark:text-blue-400">View</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      {#if $archiveStore.pagination}
        <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-neutral-700">
          <div class="text-sm text-gray-600 dark:text-neutral-400">
            Showing page {$archiveStore.pagination.current_page} of {$archiveStore.pagination.last_page}
            ({$archiveStore.pagination.total} total)
          </div>
          <div class="flex gap-2">
            {#if $archiveStore.pagination.prev_page_url}
              <button onclick={() => loadArchives($archiveStore.pagination.current_page - 1)} class="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 dark:border-neutral-600">Previous</button>
            {/if}
            {#if $archiveStore.pagination.next_page_url}
              <button onclick={() => loadArchives($archiveStore.pagination.current_page + 1)} class="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 dark:border-neutral-600">Next</button>
            {/if}
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<Toast message={toastMessage} type={toastType} bind:visible={showToast} />
