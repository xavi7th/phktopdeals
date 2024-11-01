<script>
	import { fade } from 'svelte/transition';
</script>

<div class="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto min-w-[70%] inset-0 md:left-1/4 absolute" transition:fade>

  <div role="status" class="p-4 space-y-4 rounded shadow animate-pulse md:p-6 min-w-96">
    <div class="header pt-4 py-8">
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-12"></div>
      <div class="flex items-center justify-center mt-4">
          <svg class="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
          </svg>
          <div class="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
          <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>

    <div class="contents divide-y divide-gray-200 animate-pulse dark:divide-gray-700 md:py-6 dark:border-gray-700">
      <div class="flex items-center justify-between">
          <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
          <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
          <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
          <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
          <div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
    </div>

      <span class="sr-only">Loading...</span>
  </div>
</div>
