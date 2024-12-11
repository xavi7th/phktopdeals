<script>
  import { plusIcon } from "$lib/Components/iconPaths";
  import PageNavigation from "$lib/Components/PageNavigation.svelte";

  export let data;

  let basePageUrl = "/admin/brands";

  $: ({ cards, meta } = data);
</script>

<div class="col-span-5 lg:col-span-4 lg:col-start-2">
  <div class="space-y-4 p-4 sm:space-y-6 sm:p-6">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="inline-block min-w-full p-1.5 align-middle">
          <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <div class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">Brand</h2>
                <p class="text-sm text-gray-600 dark:text-neutral-400">Add Brand, edit and more.</p>
              </div>

              <div class="px-4 py-3">
                <div class="relative max-w-xs">
                  <label for="hs-table-search" class="sr-only">Search</label>
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    class="block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Search for items" />
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      class="size-4 text-gray-400 dark:text-neutral-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <a
                    class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    href="{basePageUrl}/create">
                    {@html plusIcon}
                    Add Brand
                  </a>
                </div>
              </div>
            </div>

            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead class="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th scope="col" class="w-full px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Product Details</span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-end"></th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                {#each cards as card}
                  <tr>
                    <td class="whitespace-nowrap px-6">
                      <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                        <div class="flex items-center gap-x-3">
                          <div class="grow">
                            <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.name}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="flex gap-3 px-6 py-1.5">
                        <a class="inline-flex items-center gap-x-1 text-sm font-medium text-brand-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-brand-500" href="#">Edit</a>
                        <form action="/?delete" class="inline-flex items-center gap-x-1 text-sm font-medium text-red-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-red-500">
                          <input type="text" class="hidden" bind:value={card.id} />
                          <button type="submit" class="m-0 border-0 bg-transparent p-0 shadow-none">Delete</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                {:else}
                  <tr>
                    <td class="size-px whitespace-nowrap" colspan="4">
                      <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div class="flex items-center gap-x-3 text-center">
                          <div class="grow">
                            <span class="block text-xl text-gray-600 dark:text-neutral-200">NO PRODUCTS CREATED</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>

            <PageNavigation navData={{ ...meta, basePageUrl }} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
