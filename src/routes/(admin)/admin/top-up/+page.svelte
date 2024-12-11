<script>
  import { toCurrency } from "$lib/helpers";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { leftAngle, plusIcon, rightAngle } from "$lib/Components/iconPaths";

  export let data;

  $: ({ cards, meta } = data);
</script>

<div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="inline-block min-w-full p-1.5 align-middle">
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <div class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">Products</h2>
            <p class="text-sm text-gray-600 dark:text-neutral-400">Add Product, edit and more.</p>
          </div>

          <div>
            <div class="inline-flex gap-x-2">
              <a
                class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                href="/admin/top-up/create">
                {@html plusIcon}
                Add Top Up
              </a>
            </div>
          </div>
        </div>

        <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead class="bg-gray-50 dark:bg-neutral-800">
            <tr>
              <th scope="col" class="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0">
                <div class="flex items-center gap-x-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Card Details</span>
                </div>
              </th>

              <th scope="col" class="px-6 py-3 text-start">
                <div class="flex items-center gap-x-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Price Details</span>
                </div>
              </th>

              <th scope="col" class="px-6 py-3 text-start">
                <div class="flex items-center gap-x-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Discount Details</span>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-end">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
            {#each [] as card}
              <tr>
                <td class="size-px whitespace-nowrap">
                  <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                    <div class="flex items-center gap-x-3">
                      <img class="inline-block size-[38px] rounded-full" src={card.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
                      <div class="grow">
                        <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{card.product_name}</span>
                        <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">{card.product_category.toString()}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="h-px w-72 whitespace-nowrap">
                  <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                    <div class="flex items-center gap-x-3">
                      <div class="grow">
                        <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                          Commission Percentage: <span class="font-semibold">{card.product_price.commission}%</span>
                          <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                            Denominations: <br />
                            {card.product_price.denominations?.map((x) => toCurrency(x))}
                          </span>
                        </span>
                        {#if card.product_price.flexible}
                          <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Minimum Custom Price: {toCurrency(card.product_price.min)}</span>
                        {/if}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="size-px whitespace-nowrap">
                  <div class="px-6 py-3">
                    <span
                      class="inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {card.percentage_discount
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500'} rounded-full">
                      <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      {#if card.percentage_discount}
                        {card.percentage_discount}% discount until {card.discount_until}
                      {:else}
                        None
                      {/if}
                    </span>
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
                        <span class="block text-xl text-gray-600 dark:text-neutral-200">NO CARDS CREATED</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>

        <div class="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
          <div>
            <p class="text-sm text-gray-600 dark:text-neutral-400">
              <span class="font-semibold text-gray-800 dark:text-neutral-200">12</span>
              results
            </p>
          </div>

          {#if false}
            <div>
              <div class="inline-flex gap-x-2">
                <a
                  href={meta.prev_page_url || "#"}
                  class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  <SvgIcon class="size-4 shrink-0" slot={leftAngle} />
                  Prev
                </a>

                <a
                  href={meta.next_page_url || "#"}
                  class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  Next
                  <SvgIcon class="size-4 shrink-0" slot={rightAngle} />
                </a>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
