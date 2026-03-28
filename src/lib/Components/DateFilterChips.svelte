<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  /**
   * @typedef {Object} Props
   * @property {string} baseUrl
   * @property {boolean} [showMonthPicker]
   */

  /** @type {Props} */
  let { baseUrl = "", showMonthPicker = false } = $props();

  const filters = [
    { label: "Last 7 days", days: 7 },
    { label: "Last month", days: 30 },
    { label: "Last quarter", days: 90 },
    { label: "Last year", days: 365 },
  ];

  function getDateRange(days) {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    return {
      from: from.toISOString().split("T")[0],
      to: to.toISOString().split("T")[0],
    };
  }

  function handleFilterClick(days) {
    const { from, to } = getDateRange(days);
    goto(`${baseUrl}?date_from=${from}&date_to=${to}`);
  }

  function handleReset() {
    goto(baseUrl);
  }

  function handleMonthChange(e) {
    const val = e.target.value;
    if (!val) return;
    const [year, month] = val.split("-");
    const from = new Date(Number(year), Number(month) - 1, 1);
    const to = new Date(Number(year), Number(month), 0);
    goto(`${baseUrl}?date_from=${from.toISOString().split("T")[0]}&date_to=${to.toISOString().split("T")[0]}`);
  }

  let activeFilter = $derived.by(() => {
    const url = $page.url;
    const dateFrom = url.searchParams.get("date_from");
    const dateTo = url.searchParams.get("date_to");
    if (!dateFrom || !dateTo) return -1;

    const today = new Date();
    const from = new Date(dateFrom);
    const diffDays = Math.round((today - from) / (1000 * 60 * 60 * 24));

    for (let i = 0; i < filters.length; i++) {
      if (Math.abs(diffDays - filters[i].days) <= 1) return i;
    }
    return -1;
  });
</script>

<div class="flex flex-wrap items-center gap-2">
  {#each filters as filter, i}
    <button
      type="button"
      onclick={() => handleFilterClick(filter.days)}
      class="inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors {activeFilter === i
        ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"}">
      {filter.label}
    </button>
  {/each}

  {#if activeFilter >= 0}
    <button
      type="button"
      onclick={handleReset}
      class="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700">
      Clear
    </button>
  {/if}

  {#if showMonthPicker}
    <input
      type="month"
      onchange={handleMonthChange}
      class="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700" />
  {/if}
</div>
