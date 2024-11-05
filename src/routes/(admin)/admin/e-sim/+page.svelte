<script>
  import { leftAngle, plusIcon, rightAngle } from '$lib/Components/iconPaths';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { toCurrency } from '$lib/helpers';

  /** @type {import('./$types').PageData} */
  export let data

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
                  E-Sim
                </h2>
                <p class="text-sm text-gray-600 dark:text-neutral-400">
                  Add E-sim, edit and more.
                </p>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <a class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" href="/admin/e-sim/create">
                    {@html plusIcon}
                    Add E-sim
                  </a>
                </div>
              </div>
            </div>

            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead class="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <!-- <th scope="col" class="ps-6 py-3 text-start">
                    <label for="hs-at-with-checkboxes-main" class="flex">
                      <input type="checkbox" class="shrink-0 border-gray-300 rounded text-brand-600 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-brand-500 dark:checked:border-brand-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main">
                      <span class="sr-only">Checkbox</span>
                    </label>
                  </th> -->

                  <th scope="col" class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Product Name
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Coverage
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Data Amount
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Cost
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Validity
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Created At
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                  {#each [] as card}
                    <tr>
                      <!-- <td class="size-px whitespace-nowrap">
                        <div class="ps-6 py-3">
                          <label for="hs-at-with-checkboxes-1" class="flex">
                            <input type="checkbox" class="shrink-0 border-gray-300 rounded text-brand-600 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-brand-500 dark:checked:border-brand-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-1">
                            <span class="sr-only">Checkbox</span>
                          </label>
                        </div>
                      </td> -->
                      <td class="w-72 whitespace-nowrap">
                        <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                          <div class="flex items-center gap-x-3">
                            <img class="inline-block size-[38px] rounded-full" src={card.product_image_url} alt="Avatar">
                            <div class="grow">
                              <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.product_name}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="h-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.coverage}</span>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.data_amount}</span>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{toCurrency(card.cost)}</span>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="text-sm text-gray-500 dark:text-neutral-500">{card.validity}</span>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="text-sm text-gray-500 dark:text-neutral-500">{card.created_at}</span>
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
                              <span class="block text-xl text-gray-600 dark:text-neutral-200">NO CARDS CREATED</span>
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
                  <span class="font-semibold text-gray-800 dark:text-neutral-200">12</span> results
                </p>
              </div>

              {#if false}
                <div>
                  <div class="inline-flex gap-x-2">
                    <a href={meta.prev_page_url || '#'} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                      <SvgIcon class="shrink-0 size-4" slot={leftAngle}/>
                      Prev
                    </a>

                    <a href="{meta.next_page_url || '#'}" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                      Next
                      <SvgIcon class="shrink-0 size-4" slot={rightAngle}/>
                    </a>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
