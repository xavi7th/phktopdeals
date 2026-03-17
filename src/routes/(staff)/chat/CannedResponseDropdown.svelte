<script>
  import { onMount } from "svelte";
  import { fetchCannedResponses, previewCannedResponse } from "$lib/api/staffApi.js";

  let { customer = null, onSelect = () => {}, onClose = () => {} } = $props();

  let cannedResponses = $state([]);
  let categories = $state([]);
  let selectedCategory = $state("");
  let isLoading = $state(true);
  let previewContent = $state("");
  let expandedContent = $state("");
  let isPreviewing = $state(false);

  onMount(async () => {
    await loadCannedResponses();
  });

  async function loadCannedResponses() {
    isLoading = true;
    try {
      const result = await fetchCannedResponses(selectedCategory || null);
      if (result?.success) {
        cannedResponses = result.data.canned_responses || [];
        categories = result.data.categories || [];
      }
    } catch (error) {
      console.error("Failed to load canned responses:", error);
    } finally {
      isLoading = false;
    }
  }

  async function handleCategoryChange(event) {
    selectedCategory = event.target.value;
    await loadCannedResponses();
  }

  async function handlePreview(response) {
    previewContent = response.content;
    isPreviewing = true;

    try {
      const variables = {
        customer_name: customer?.name || "Customer",
        order_id: "",
        staff_name: "",
      };
      const result = await previewCannedResponse(response.content, variables);
      if (result?.success) {
        expandedContent = result.data.expanded_content || "";
      }
    } catch (error) {
      console.error("Failed to preview canned response:", error);
      expandedContent = response.content;
    }
  }

  function handleSelect(response) {
    // Expand macros before sending
    let content = response.content;
    if (customer) {
      content = content.replace(/\{\{customer_name\}\}/g, customer.name || "Customer");
      content = content.replace(/\{\{order_id\}\}/g, "");
      content = content.replace(/\{\{staff_name\}\}/g, "");
    }
    onSelect({ ...response, content });
  }

  function handleClose() {
    onClose();
  }
</script>

<div class="absolute bottom-full left-0 z-20 mb-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-gray-200 px-3 py-2 dark:border-neutral-700">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Canned Responses</h3>
    <button onclick={handleClose} class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Category Filter -->
  <div class="border-b border-gray-200 px-3 py-2 dark:border-neutral-700">
    <select value={selectedCategory} onchange={handleCategoryChange} class="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-neutral-600 dark:bg-neutral-700 dark:text-white">
      <option value="">All Categories</option>
      {#each categories as category (category.value)}
        <option value={category.value}>{category.label}</option>
      {/each}
    </select>
  </div>

  <!-- Preview Panel -->
  {#if isPreviewing}
    <div class="border-b border-gray-200 bg-gray-50 p-3 dark:border-neutral-700 dark:bg-neutral-700">
      <p class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Preview (macros expanded):</p>
      <div class="rounded border border-gray-200 bg-white p-2 text-sm dark:border-neutral-600 dark:bg-neutral-800">
        {expandedContent || previewContent}
      </div>
      <div class="mt-2 flex justify-end gap-2">
        <button onclick={() => (isPreviewing = false)} class="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-600">Back</button>
        <button onclick={() => handleSelect({ content: previewContent })} class="rounded bg-orange-500 px-2 py-1 text-xs font-medium text-white hover:bg-orange-600">Use This</button>
      </div>
    </div>
  {/if}

  <!-- Response List -->
  <div class="max-h-60 overflow-y-auto">
    {#if isLoading}
      <div class="p-4 text-center text-sm text-gray-500">Loading...</div>
    {:else if cannedResponses.length === 0}
      <div class="p-4 text-center text-sm text-gray-500">No canned responses found</div>
    {:else}
      {#each cannedResponses as response (response.id)}
        <button onclick={() => handlePreview(response)} class="w-full border-b border-gray-100 px-3 py-2 text-left hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-700">
          <p class="truncate text-sm font-medium text-gray-900 dark:text-white">{response.title}</p>
          <p class="truncate text-xs text-gray-500 dark:text-gray-400">{response.content}</p>
          <span class="mt-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 dark:bg-neutral-600 dark:text-gray-300">
            {response.category_label || response.category}
          </span>
        </button>
      {/each}
    {/if}
  </div>
</div>
