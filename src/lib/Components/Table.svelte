<script>
  import SvgIcon from "./SvgIcon.svelte";
  import { upDownAngleIcon } from "./iconPaths";
  import PageNavigation from "./PageNavigation.svelte";

  export let tCaption = undefined;
  export let tDescription = undefined;
  /** @type {number | undefined} */
  export let totalDataCount = undefined;

  /** @type { undefined | { basePageUrl: string;  total?: number; items_count?: number; next_page_cursor?: string; prev_page_cursor?: string; } } */
  export let navData = undefined;

  let itemsPerPage = navData?.items_count || 15;
</script>

<div data-tour="transaction-list" class="mt-7 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-600 {$$slots.mobile ? 'hidden md:block' : ''}" {...$$restProps}>
  <!-- <div class="flex flex-col items-center gap-5 border-b border-[#00000020] px-5 py-7 pb-9 sm:flex-row sm:px-10">
		<div class="flex w-full sm:w-[280px]">
			<input type="date" name="" id="" class="block w-full rounded-xl border" />
		</div>
		<div class="flex w-full sm:w-[280px]">
			<input type="date" name="" id="" class="block w-full rounded-xl border" />
		</div>
		<div class="flex h-full w-full sm:w-auto">
			<button type="button" class="flex h-full w-full items-center justify-center gap-2 rounded-xl border p-2 px-5 py-2.5 text-sm text-brand-700 hover:bg-brand-200 sm:w-auto">
				<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 15 15" stroke="currentColor">
          <path fill="none" d="m8.5 8.5l2 2M7 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5Zm.5 5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"></path>
        </svg>
				Search
			</button>
		</div>
	</div> -->

  <div class="overflow-auto">
    <div class="ml-6 inline-flex w-11/12 justify-between pb-8 pt-4 text-start text-xl font-semibold text-gray-600 dark:text-neutral-300">
      <div class="caption flex-1">
        <span>{tCaption}</span>
        {#if tDescription}
          <p class="text-sm font-light text-gray-400 dark:text-neutral-400">{tDescription}</p>
        {/if}
      </div>
      <div class="table-action flex shrink-0 items-center justify-end">
        <slot name="tableAction" />
      </div>
    </div>

    <table class="w-full min-w-[400px] text-center">
      <thead class="h-14 bg-gray-50 text-slate-800 dark:bg-neutral-700 dark:text-slate-100">
        <slot name="thead">
          <tr>
            <th>S/N</th>
            <th>Order Number</th>
            <th>Amount Paid</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Balance</th>
          </tr>
        </slot>
      </thead>
      <tbody class="border odd:*:bg-white even:*:bg-gray-100 dark:border-neutral-800 dark:odd:*:bg-neutral-900 dark:even:*:bg-neutral-800">
        <slot>
          <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
            <td>1</td>
            <td>#re135</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
            <td>1</td>
            <td>#re135</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </slot>
      </tbody>
      <tfoot class="h-14 bg-gray-50 text-slate-800 dark:bg-neutral-700 dark:text-slate-100">
        <slot name="thead">
          <tr>
            <th>S/N</th>
            <th>Order Number</th>
            <th>Amount Paid</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Balance</th>
          </tr>
        </slot>
      </tfoot>
    </table>

    <div class="mt-4 flex items-center justify-between gap-7 border-t border-gray-300 px-5 py-3 text-slate-800 sm:px-10 dark:text-slate-100">
      <div class="relative flex items-center gap-x-8">
        <p class="text-xs">Items per page</p>
        <select
          class="relative flex w-full flex-initial cursor-pointer gap-x-2 text-nowrap rounded-lg border border-gray-200 bg-white bg-none py-3 pe-9 ps-4 text-start text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:w-20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
          bind:value={itemsPerPage}>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <div class="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2">
          <SvgIcon class="size-4 shrink-0" slot={upDownAngleIcon} />
        </div>

        {#if totalDataCount && itemsPerPage}
          <p class="text-xs">{itemsPerPage} of {totalDataCount}</p>
        {/if}
      </div>

      <div class="flex gap-5">
        {#if navData}
          <PageNavigation {navData} />
        {/if}
      </div>
    </div>
  </div>
</div>

<div data-tour="transaction-list-mobile" class="mt-8 grid gap-4 space-y-4 {$$slots.mobile ? 'md:hidden' : 'hidden'}" class:md:hidden={$$slots.mobile}>
  <div class="ml-6 inline-flex w-11/12 flex-col justify-end pb-8 pt-4 text-start text-xl font-semibold text-gray-600 dark:text-neutral-300">
    <div class="caption flex-1">
      <span>{tCaption}</span>
      {#if tDescription}
        <p class="text-sm font-light text-gray-400 dark:text-neutral-400">{tDescription}</p>
      {/if}
    </div>
    <div class="table-action mt-8 flex shrink-0 items-center justify-end">
      <slot name="tableAction" />
    </div>
  </div>

  <slot name="mobile"></slot>

  <div class="mt-4 items-center justify-between gap-7 border-t border-gray-300 px-5 py-3 text-slate-800 sm:px-10 dark:text-slate-100">
    <div class="relative flex items-center justify-end gap-x-8">
      <p class="shrink-0 text-xs">Items per page</p>
      <select
        class="relative inline-flex flex-initial cursor-pointer gap-x-2 text-nowrap rounded-lg border border-gray-200 bg-white bg-none py-3 pe-9 ps-4 text-start text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:w-20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
        bind:value={itemsPerPage}>
        <option value={15}>15</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

      <div class="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2">
        <SvgIcon class="size-4 shrink-0" slot={upDownAngleIcon} />
      </div>

      {#if totalDataCount && itemsPerPage}
        <p class="text-xs">{itemsPerPage} of {totalDataCount}</p>
      {/if}
    </div>

    {#if navData}
      <PageNavigation {navData} />
    {/if}
  </div>
</div>
