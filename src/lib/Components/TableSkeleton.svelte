<!-- @see https://dev.to/kvetoslavnovak/enhancing-degressive-enhancement-of-streaming-3ehj -->
<script>
  import { browser } from "$app/environment";
  import { onDestroy } from "svelte";

  let className = undefined;

  export { className as class };

  onDestroy(() => {
    if (browser) {
      setTimeout(() => window.HSStaticMethods.autoInit(), 1500);
    }
  });
</script>

<!-- showing this div only to users who have JavaScript enabled -->
<div class="col-span-5 animate-pulse space-y-4 p-4 sm:space-y-6 sm:p-6 lg:col-span-4 lg:col-start-2 {className} js-enabled">
  <div class="mt-7 hidden overflow-hidden rounded-xl bg-white shadow-lg md:block dark:bg-gray-700">
    <div class="hidden animate-pulse overflow-auto md:block">
      <div class="ml-6 inline-flex w-11/12 justify-between pb-8 pt-4">
        <div class="caption flex-1">
          <div class="h-5 w-1/2 rounded bg-gray-200"></div>
          <div class="mt-2 h-3 w-3/4 rounded bg-gray-200"></div>
        </div>
        <div class="table-action shrink-0">
          <div>
            <div class="inline-flex h-8 w-28 items-center justify-center gap-x-2 text-nowrap rounded-md bg-gray-200 px-4 py-2.5"></div>
          </div>
        </div>
      </div>

      <table class="js-enabled w-full min-w-[700px] animate-pulse p-8 text-center">
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
          {#each Array(10) as _}
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
              <td class="size-px whitespace-nowrap pr-4">
                <div class="h-10 rounded bg-gray-200 px-6 py-1.5"></div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="mt-8 grid gap-4 space-y-4 md:hidden">
    {#each Array(5) as _}
      <div class="rounded-lg border bg-white p-4 shadow">
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
    {/each}
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
