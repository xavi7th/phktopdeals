<script>
	import { fade } from 'svelte/transition';
</script>

<div class="flex pr-4 pt-12 sm:pr-6 lg:pr-8 min-w-[70%] inset-0 md:left-1/4 absolute dark:bg-neutral-900" transition:fade>

  <div class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 animate-pulse">
    <div class="bg-gray-50 dark:bg-neutral-800 flex justify-between py-6">
      <div class="w-1/5">
        <div class="h-6 bg-gray-200 dark:bg-neutral-700 rounded mx-6 mt-3"></div>
      </div>
      <div class="w-1/5">
        <div class="h-6 bg-gray-200 dark:bg-neutral-700 rounded mx-6 mt-3"></div>
      </div>
      <div class="w-1/5">
        <div class="h-6 bg-gray-200 dark:bg-neutral-700 rounded mx-6 mt-3"></div>
      </div>
      <div class="w-1/5">
        <div class="h-6 bg-gray-200 dark:bg-neutral-700 rounded mx-6 mt-3"></div>
      </div>
      <div class="w-1/5">
        <div class="h-6 bg-gray-200 dark:bg-neutral-700 rounded mx-6 mt-3"></div>
      </div>
    </div>
    <div class="divide-y gap-y-8 divide-gray-200 dark:divide-neutral-700 pt-2">
      {#each Array(8) as _, idx}
        <div class="flex py-4">
          <div class="block whitespace-nowrap">
            <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
              <div class="flex items-center gap-x-3">
                <div class="w-10 h-10 bg-gray-200 dark:bg-neutral-700 rounded-full mr-2"></div>
                <div class="flex flex-column">
                  <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-24"></div>
                  <div class="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-20 mt-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="block w-72 whitespace-nowrap">
            <div class="px-6 py-3">
              <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-16"></div>
              <div class="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-32 mt-2"></div>
            </div>
          </div>
          <div class="block whitespace-nowrap">
            <div class="px-6 py-3">
              <div class="py-2 px-3 h-4 bg-gray-200 dark:bg-neutral-700 rounded w-24"></div>
            </div>
          </div>
          <div class="block whitespace-nowrap">
            <div class="px-6 py-3">
              <div class="text-sm h-4 bg-gray-200 dark:bg-neutral-700 rounded w-28"></div>
            </div>
          </div>
          <div class="block whitespace-nowrap">
            <div class="px-6 py-1.5">
              <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-32"></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
