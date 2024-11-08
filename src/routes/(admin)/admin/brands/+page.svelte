<script>
		import { plusIcon } from '$lib/Components/iconPaths';
    import SvgIcon from '$lib/Components/SvgIcon.svelte';
    import { leftAngle, rightAngle } from '$lib/Components/iconPaths';

    /** @type {import('./$types').PageData} */
    export let data;

    let basePageUrl = "/admin/brands";

    $: ( { cards, meta } = data ) ;
</script>

<div class="col-span-5 lg:col-span-4 lg:col-start-2">
  <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Brand
                </h2>
                <p class="text-sm text-gray-600 dark:text-neutral-400">
                  Add Brand, edit and more.
                </p>
              </div>

              <div class="py-3 px-4">
                <div class="relative max-w-xs">
                  <label for="hs-table-search" class="sr-only">Search</label>
                  <input type="text" name="hs-table-search" id="hs-table-search" class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search for items">
                  <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg class="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <a class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" href="{basePageUrl}/create">
                    {@html plusIcon}
                    Add Brand
                  </a>
                </div>
              </div>
            </div>

            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead class="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th scope="col" class="px-6 py-3 w-full text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Product Details
                      </span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-end"></th>
                </tr>
              </thead>
            
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                {#each cards as card}
                  <tr>
                    <td class="px-6 whitespace-nowrap">
                      <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div class="flex items-center gap-x-3">
                          <div class="grow">
                            <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.name}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-1.5 flex gap-3">
                        <a class="inline-flex items-center gap-x-1 text-sm text-brand-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-brand-500" href="#">
                          Edit
                        </a>
                        <form action="/?delete" class="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-red-500">
                          <input type="text" class="hidden" bind:value={card.id}>
                          <button type="submit" class="bg-transparent p-0 m-0 border-0 shadow-none">Delete</button>
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
            
            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
              <div>
                <p class="text-sm text-gray-600 dark:text-neutral-400">
                  Showing <span class="font-semibold text-gray-800 dark:text-neutral-200">{meta.items_count}</span> out of <span class="font-semibold text-gray-800 dark:text-neutral-200">{meta.total}</span> results
                </p>
              </div>
            
              <div>
                <div class="inline-flex gap-x-2">
                  <a href={`${basePageUrl}/${meta.prev_page_cursor || '#'}`} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 {! meta.prev_page_cursor ? 'opacity-50 pointer-events-none' : ''}">
                    <SvgIcon class="shrink-0 size-4" slot={leftAngle}/>
                    Prev
                  </a>
            
                  <a href={`${basePageUrl}/${meta.next_page_cursor || '#'}`} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 {! meta.next_page_cursor ? 'opacity-50 pointer-events-none' : ''}">
                    Next
                    <SvgIcon class="shrink-0 size-4" slot={rightAngle}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>