<script>
  import { fade } from "svelte/transition";
</script>

<div class="absolute inset-0 flex min-w-[70%] pr-4 pt-12 sm:pr-6 md:left-1/4 lg:pr-8 dark:bg-neutral-900" transition:fade>
  <div class="min-w-full animate-pulse divide-y divide-gray-200 dark:divide-neutral-700">
    <div class="flex justify-between bg-gray-50 py-6 dark:bg-neutral-800">
      <div class="w-1/5">
        <div class="mx-6 mt-3 h-6 rounded bg-gray-200 dark:bg-neutral-700"></div>
      </div>
      <div class="w-1/5">
        <div class="mx-6 mt-3 h-6 rounded bg-gray-200 dark:bg-neutral-700"></div>
      </div>
      <div class="w-1/5">
        <div class="mx-6 mt-3 h-6 rounded bg-gray-200 dark:bg-neutral-700"></div>
      </div>
      <div class="w-1/5">
        <div class="mx-6 mt-3 h-6 rounded bg-gray-200 dark:bg-neutral-700"></div>
      </div>
      <div class="w-1/5">
        <div class="mx-6 mt-3 h-6 rounded bg-gray-200 dark:bg-neutral-700"></div>
      </div>
    </div>
    <div class="gap-y-8 divide-y divide-gray-200 pt-2 dark:divide-neutral-700">
      {#each Array(8) as _, idx}
        <div class="flex py-4">
          <div class="block whitespace-nowrap">
            <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
              <div class="flex items-center gap-x-3">
                <div class="mr-2 h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-700"></div>
                <div class="flex-column flex">
                  <div class="h-4 w-24 rounded bg-gray-200 dark:bg-neutral-700"></div>
                  <div class="mt-2 h-3 w-20 rounded bg-gray-200 dark:bg-neutral-700"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="block w-72 whitespace-nowrap">
            <div class="px-6 py-3">
              <div class="h-4 w-16 rounded bg-gray-200 dark:bg-neutral-700"></div>
              <div class="mt-2 h-3 w-32 rounded bg-gray-200 dark:bg-neutral-700"></div>
            </div>
          </div>
          <div class="block whitespace-nowrap">
            <div class="px-6 py-3">
              <div class="h-4 w-24 rounded bg-gray-200 px-3 py-2 dark:bg-neutral-700"></div>
            </div>
          </div>
          <div class="block whitespace-nowrap">
            <div class="px-6 py-3">
              <div class="h-4 w-28 rounded bg-gray-200 text-sm dark:bg-neutral-700"></div>
            </div>
          </div>
          <div class="block whitespace-nowrap">
            <div class="px-6 py-1.5">
              <div class="h-4 w-32 rounded bg-gray-200 dark:bg-neutral-700"></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
