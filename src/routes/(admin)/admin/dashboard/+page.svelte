<script>
  import Table from "$lib/Components/Table.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import { checkMarkFilledAlt, warningIcon } from "$lib/Components/iconPaths";

  let { data } = $props();

  let { transactions } = data;
</script>

<div class="space-y-4 p-4 sm:space-y-6 sm:p-6">
  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
    <div class="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <div class="p-4 md:p-5">
        <div class="flex items-center gap-x-2">
          <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Total users</p>
          <div class="hs-tooltip">
            <div class="hs-tooltip-toggle">
              <svg
                class="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span
                class="hs-tooltip-content invisible absolute z-10 inline-block rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 dark:bg-neutral-700"
                role="tooltip">
                The number of daily users
              </span>
            </div>
          </div>
        </div>

        <div class="mt-1 flex items-center gap-x-2">
          <h3 class="text-xl font-medium text-gray-800 sm:text-2xl dark:text-neutral-200">72,540</h3>
          <span class="flex items-center gap-x-1 text-green-600">
            <svg
              class="inline-block size-4 self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <span class="inline-block text-sm">1.7%</span>
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <div class="p-4 md:p-5">
        <div class="flex items-center gap-x-2">
          <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Sessions</p>
        </div>

        <div class="mt-1 flex items-center gap-x-2">
          <h3 class="text-xl font-medium text-gray-800 sm:text-2xl dark:text-neutral-200">29.4%</h3>
        </div>
      </div>
    </div>

    <div class="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <div class="p-4 md:p-5">
        <div class="flex items-center gap-x-2">
          <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Avg. Click Rate</p>
        </div>

        <div class="mt-1 flex items-center gap-x-2">
          <h3 class="text-xl font-medium text-gray-800 sm:text-2xl dark:text-neutral-200">56.8%</h3>
          <span class="flex items-center gap-x-1 text-red-600">
            <svg
              class="inline-block size-4 self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
              <polyline points="16 17 22 17 22 11" />
            </svg>
            <span class="inline-block text-sm">1.7%</span>
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <div class="p-4 md:p-5">
        <div class="flex items-center gap-x-2">
          <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Pageviews</p>
        </div>

        <div class="mt-1 flex items-center gap-x-2">
          <h3 class="text-xl font-medium text-gray-800 sm:text-2xl dark:text-neutral-200">92,913</h3>
        </div>
      </div>
    </div>
  </div>

  {#await transactions}
    <TableSkeleton />
  {:then transactions}
    <Table tCaption="Latest Orders" tDescription="Last 10 orders received and their current status." navData={{ ...transactions.metadata, basePageUrl: "/admin/dashboard" }}>
      <svelte:fragment slot="tableAction">
        <div class="grid gap-3 md:flex md:items-center md:justify-between">
          <div>
            <div class="inline-flex gap-x-2">
              <a
                class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#">
                View all
              </a>
            </div>
          </div>
        </div>
      </svelte:fragment>

      <svelte:fragment slot="thead">
        <tr>
          <th scope="col" class="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0">
            <div class="flex items-center gap-x-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">User</span>
            </div>
          </th>

          <th scope="col" class="px-6 py-3 text-start">
            <div class="flex items-center gap-x-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Requested Item</span>
            </div>
          </th>

          <th scope="col" class="px-6 py-3 text-start">
            <div class="flex items-center gap-x-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Status / Request Date</span>
            </div>
          </th>

          <th scope="col" class="px-6 py-3 text-start">
            <div class="flex items-center gap-x-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Actions</span>
            </div>
          </th>
        </tr>
      </svelte:fragment>

      {#each transactions.data?.users || [] as user, i}
        {@const transaction = transactions.data?.orders[i]}
        <tr class="text-start">
          <td class="size-px whitespace-nowrap">
            <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
              <div class="flex items-center gap-x-3">
                <span class="inline-flex size-[38px] items-center justify-center rounded-full border border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                  <span class="text-sm font-medium leading-none text-gray-800 dark:text-neutral-200">{user?.full_name[0]}</span>
                </span>
                <div class="grow">
                  <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{user.full_name}</span>
                  <span class="block text-sm text-gray-500 dark:text-neutral-500">{user.email}</span>
                </div>
              </div>
            </div>
          </td>
          <td class="h-px w-72 whitespace-nowrap">
            <div class="px-6 py-3">
              <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{transaction.description}</span>
              <span class="block text-sm text-gray-500 dark:text-neutral-500">Ref: {transaction.payment_id}</span>
            </div>
          </td>
          <td class="size-px whitespace-nowrap">
            <div class="px-6 py-3 text-start">
              <span class="mb-1 block text-sm font-semibold text-gray-800 dark:text-neutral-200">{new Date(transaction.transaction_date).toLocaleDateString()}</span>

              <span
                class="inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {transaction.status == 'finished' || transaction.status == 'confirmed'
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'
                  : (transaction.status == 'waiting' || transaction.status == 'confirming' || transaction.status == 'partially paid') && !transaction.is_processed
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500'
                    : transaction.status == 'processing' || transaction.status == 'sending'
                      ? 'bg-purple-200 text-purple-800 dark:bg-purple-500/10 dark:text-purple-500'
                      : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'} rounded-full">
                <SvgIcon class="size-2.5" svgHeight={16} slot={transaction.is_processed ? checkMarkFilledAlt : warningIcon} />
                {transaction?.is_processed ? "Finished" : transaction?.status}
              </span>
            </div>
          </td>
          <td class="size-px whitespace-nowrap">
            <div class="px-6 py-1.5">
              {#if transaction.is_processed || transaction.status == "finished"}
                <a class="inline-flex items-center gap-x-1 text-sm font-medium text-teal-600 dark:text-teal-500" href="/#">Already Processed</a>
              {:else}
                <a class="inline-flex items-center gap-x-1 text-sm font-medium text-brand-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-brand-500" href="#">Mark Processed</a>
              {/if}
            </div>
          </td>
        </tr>
      {/each}
    </Table>
  {/await}
</div>
