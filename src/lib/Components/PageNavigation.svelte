<script>
  import SvgIcon from './SvgIcon.svelte';
  import { leftAngle, rightAngle } from './iconPaths';

  /** @type { { basePageUrl: string;  total?: number; items_count?: number; next_page_cursor?: string; prev_page_cursor?: string; } } */
  export let navData;
</script>

<div class="grid gap-3 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
  {#if navData.items_count && navData.total}
    <div>
      <p class="text-sm text-gray-600 dark:text-neutral-400">
        Showing <span class="font-semibold text-gray-800 dark:text-neutral-200">{navData.items_count}</span>
        out of
        <span class="font-semibold text-gray-800 dark:text-neutral-200">{navData.total}</span>
        results
      </p>
    </div>
  {/if}

  <div>
    <div class="inline-flex gap-x-2">
      <a
        href={`${navData.basePageUrl}/${navData.prev_page_cursor || "#"}`}
        class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 {!navData.prev_page_cursor
          ? 'pointer-events-none opacity-50'
          : ''}">
        <SvgIcon class="size-4 shrink-0" slot={leftAngle} />
        Prev
      </a>

      <a
        href={`${navData.basePageUrl}/${navData.next_page_cursor || "#"}`}
        class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 {!navData.next_page_cursor
          ? 'pointer-events-none opacity-50'
          : ''}">
        Next
        <SvgIcon class="size-4 shrink-0" slot={rightAngle} />
      </a>
    </div>
  </div>
</div>
