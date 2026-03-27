<script>
  import { goto } from "$app/navigation";
  import { toCurrency } from "$lib/helpers";
  import CostTrendChart from "$lib/Components/CostTrendChart.svelte";
  import CostByPatternChart from "$lib/Components/CostByPatternChart.svelte";
  import CostByProviderChart from "$lib/Components/CostByProviderChart.svelte";

  let { data } = $props();

  let fromDate = $state(data.from || "");
  let toDate = $state(data.to || "");

  let costData = $derived(data.costData);

  function applyFilter() {
    const params = new URLSearchParams();
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    goto(`?${params}`, { invalidateAll: true });
  }

  function formatUsd(value) {
    return toCurrency(Number(value || 0), "$");
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString();
  }
</script>

<svelte:head>
  <title>AI Cost Dashboard - Admin</title>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-6 p-4">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-neutral-200">AI Cost Dashboard</h1>

    <!-- Date Range Filter -->
    <div class="flex items-center gap-3">
      <input type="date" bind:value={fromDate} class="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200" />
      <span class="text-sm text-gray-500">to</span>
      <input type="date" bind:value={toDate} class="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200" />
      <button onclick={applyFilter} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Filter</button>
    </div>
  </div>

  {#await costData}
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each Array(4) as _}
        <div class="h-24 animate-pulse rounded-xl border bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800"></div>
      {/each}
    </div>
  {:then costs}
    <!-- Metric Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <p class="text-sm text-gray-500 dark:text-neutral-400">Total Cost</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-neutral-100">
          {formatUsd(costs.totals?.total_cost)}
        </p>
      </div>
      <div class="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <p class="text-sm text-gray-500 dark:text-neutral-400">Avg Cost / Conversation</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-neutral-100">
          {formatUsd(costs.totals?.unique_conversations > 0 ? costs.totals.total_cost / costs.totals.unique_conversations : 0)}
        </p>
      </div>
      <div class="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <p class="text-sm text-gray-500 dark:text-neutral-400">Total Tokens</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-neutral-100">
          {formatNumber((costs.totals?.total_prompt_tokens || 0) + (costs.totals?.total_completion_tokens || 0))}
        </p>
      </div>
      <div class="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <p class="text-sm text-gray-500 dark:text-neutral-400">Conversations</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-neutral-100">
          {formatNumber(costs.totals?.unique_conversations)}
        </p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <h2 class="mb-3 text-lg font-semibold text-gray-800 dark:text-neutral-200">Cost by Pattern</h2>
        <CostByPatternChart patterns={costs.by_pattern || []} />
      </div>

      <div class="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <h2 class="mb-3 text-lg font-semibold text-gray-800 dark:text-neutral-200">Cost by Provider</h2>
        <CostByProviderChart providers={costs.by_provider || []} />
      </div>
    </div>

    <div class="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <h2 class="mb-3 text-lg font-semibold text-gray-800 dark:text-neutral-200">Cost Trend</h2>
      <CostTrendChart timeline={costs.timeline || []} />
    </div>
  {:catch error}
    <div class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">Failed to load cost data. Please try again.</div>
  {/await}
</div>
