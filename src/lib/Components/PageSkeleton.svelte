<script>
  import { fade } from "svelte/transition";
</script>

<div class="js-enabled absolute inset-0 flex min-w-[70%] pr-4 pt-12 sm:pr-6 md:left-1/4 lg:pr-8 dark:bg-neutral-900" transition:fade>
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

<!-- showing this noscript tag only to users who do not have JavaScript -->
<noscript>
  <style>
    .js-enabled {
      display: none !important;
    }
  </style>

  <div class="relative sm:mx-10">
    <div class="mt-7 hidden overflow-hidden rounded-xl bg-white shadow-lg md:block dark:bg-gray-600">
      <div class="animate-pulse overflow-auto">
        <div class="ml-6 inline-flex w-11/12 justify-between pb-8 pt-4">
          <div class="caption flex-1">
            <div class="h-5 w-1/2 rounded bg-gray-200"></div>
            <div class="mt-2 h-3 w-3/4 rounded bg-gray-200"></div>
          </div>
          <div class="table-action shrink-0">
            <div>
              <div class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-md bg-gray-200 px-4 py-2.5"></div>
            </div>
          </div>
        </div>

        <table class="w-full min-w-[700px] animate-pulse text-center">
          <thead class="h-14 bg-gray-200">
            <tr>
              <th scope="col" class="px-6 py-3 text-start">
                <div class="h-4 rounded bg-gray-400"></div>
              </th>
              <th scope="col" class="px-6 py-3 text-start">
                <div class="h-4 rounded bg-gray-400"></div>
              </th>
              <th scope="col" class="px-6 py-3 text-start">
                <div class="h-4 rounded bg-gray-400"></div>
              </th>
            </tr>
          </thead>
          <tfoot class="h-14 bg-gray-200">
            <tr>
              <th scope="col" class="px-6 py-3 text-start">
                <div class="h-4 rounded bg-gray-400"></div>
              </th>
              <th scope="col" class="px-6 py-3 text-start">
                <div class="h-4 rounded bg-gray-400"></div>
              </th>
              <th scope="col" class="px-6 py-3 text-start">
                <div class="h-4 rounded bg-gray-400"></div>
              </th>
            </tr>
          </tfoot>
          <tbody class="odd:*:bg-white even:*:bg-gray-100 dark:odd:*:bg-neutral-900 dark:even:*:bg-neutral-800">
            <tr class="text-start">
              <td class="size-px whitespace-nowrap text-start">
                <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                  <div class="flex items-center gap-x-3">
                    <div class="inline-block size-[38px] rounded-full bg-gray-200"></div>
                    <div class="flex grow flex-col gap-y-3">
                      <div class="block h-4 bg-gray-200 text-base"></div>
                      <div class="block h-4 text-wrap bg-gray-200 text-xs"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="size-px whitespace-nowrap">
                <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                  <div class="flex items-center gap-x-3">
                    <div class="flex grow flex-col gap-y-2">
                      <div class="h-4 w-1/2 rounded bg-gray-200"></div>
                      <div class="h-4 w-2/3 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="size-px whitespace-nowrap">
                <div class="h-10 rounded bg-gray-200 px-6 py-1.5"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="relative mt-8 grid gap-4 space-y-4 md:hidden">
      <div class="animate-pulse rounded-lg border bg-white p-4 shadow">
        <div class="-m-4 flex items-center justify-between border-b p-4">
          <div class="h-6 w-full rounded bg-gray-200"></div>
        </div>
        <div class="mt-4 py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
          <div class="flex items-center gap-x-3">
            <div class="inline-block h-10 w-10 rounded-full bg-gray-200"></div>
            <div class="flex grow flex-col gap-y-1.5">
              <div class="h-4 w-3/4 rounded bg-gray-200"></div>
              <div class="h-4 w-1/2 rounded bg-gray-200"></div>
              <div class="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-end gap-x-4">
          <div class="h-6 w-24 rounded bg-gray-200"></div>
          <div class="h-6 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>

    <div class="absolute inset-0 !my-0 flex items-center justify-center rounded-lg bg-black/65 py-3 pe-6 ps-6 text-center font-semibold text-neutral-200 lg:ps-3 xl:ps-0">
      <a href="?noJS=true">
        Data failed to load! <span class="underline">Click here</span>
        to try again.
      </a>
    </div>
  </div>
</noscript>
