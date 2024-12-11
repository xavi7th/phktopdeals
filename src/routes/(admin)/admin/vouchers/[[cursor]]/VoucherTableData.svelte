<script>
  import { toCurrency } from "$lib/helpers";
  import { createEventDispatcher } from "svelte";
  import Table from "$lib/Components/Table.svelte";

  const dispatch = createEventDispatcher();

  export let vouchers,
    metadata = {};

  let basePageUrl = "/admin/vouchers";
</script>

<Table
  tCaption="List of Voucher Codes for Products"
  tDescription="Create voucher codes that can be sent to customers when they make a purchase. You can create, update or delete new voucher codes"
  navData={{ ...metadata, basePageUrl }}>
  <svelte:fragment slot="tableAction">
    <div>
      <button
        class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-md border border-transparent bg-brand-400 px-4 py-2.5 text-sm font-normal text-gray-800 shadow-md hover:bg-brand-500 focus:bg-brand-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-brand-950 dark:text-neutral-300 dark:hover:bg-brand-900 dark:focus:bg-brand-900"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="create-voucher-modal"
        data-hs-overlay="#manage-vouchers"
        on:click={() => dispatch("create")}>
        Create Voucher
      </button>
    </div>
  </svelte:fragment>

  <svelte:fragment slot="thead">
    <th scope="col" class="px-6 py-3 text-start">
      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Product / Code</span>
    </th>

    <th scope="col" class="px-6 py-3 text-start">
      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Details</span>
    </th>

    <th scope="col" class="px-6 py-3 text-start">
      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Actions</span>
    </th>
  </svelte:fragment>

  {#each vouchers as voucher}
    <tr class="text-start">
      <td class="size-px whitespace-nowrap text-start">
        <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
          <div class="flex items-center gap-x-3">
            <img class="inline-block size-[38px] rounded-full" src={voucher.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
            <div class="flex grow flex-col gap-y-3">
              <span class="block text-base font-semibold text-gray-800 dark:text-neutral-200">
                <span class="font-light text-gray-800">Voucher Code:</span>
                {voucher.code}
              </span>
              <span class="block text-wrap text-xs text-gray-500 dark:text-neutral-500">
                <span class="font-semibold text-gray-800">Product Name:</span>
                {voucher.product_name}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td class="size-px whitespace-nowrap">
        <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
          <div class="flex items-center gap-x-3">
            <div class="flex grow flex-col gap-y-2">
              <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                Amount: <span class="font-semibold">{toCurrency(voucher.amount)}</span>
                <span
                  class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {voucher.is_sold
                    ? 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'
                    : 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'} rounded-full">
                  <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                  {#if voucher.is_sold}
                    Sold
                  {:else}
                    Available
                  {/if}
                </span>
              </span>
              {#if voucher.is_sold}
                <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                  <span class="font-sem-bold text-gray-600">Purchased By:</span>
                  {voucher.app_user_name} (${voucher.app_user_email})
                </span>
                <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                  <span class="font-sem-bold text-gray-600">Transaction ID:</span>
                  #{voucher.user_transaction_id}
                </span>
              {/if}
              <span class="block text-nowrap text-sm text-gray-500 dark:text-neutral-500">
                <span class="font-semibold text-gray-800">Email Template:</span>
                {voucher.email_template || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td class="size-px whitespace-nowrap">
        <div class="px-6 py-1.5">
          <div class="hs-dropdown relative inline-block [--placement:bottom-right]">
            <button
              id="hs-table-dropdown-1"
              type="button"
              class="hs-dropdown-toggle inline-flex items-center justify-center gap-2 rounded-lg px-2 py-1.5 align-middle text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown">
              <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
            <div
              class="hs-dropdown-menu duration z-10 mt-2 hidden min-w-40 divide-y divide-gray-200 rounded-lg bg-white p-2 opacity-0 shadow-2xl transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-table-dropdown-1">
              <div class="py-2 first:pt-0 last:pb-0">
                <button
                  class="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="create-voucher-modal"
                  data-hs-overlay="#manage-vouchers"
                  on:click={() => dispatch("edit", voucher)}>
                  Edit Voucher
                </button>

                <a
                  href="/admin/vouchers/email-preview/{voucher.id}"
                  class="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  on:click={() => dispatch("edit", voucher)}>
                  Preview Email
                </a>
              </div>

              <div class="py-2 first:pt-0 last:pb-0">
                <button
                  class="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="delete-voucher-modal"
                  data-hs-overlay="#delete-voucher"
                  on:click={() => dispatch("delete", voucher)}>
                  Delete Voucher
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  {:else}
    <tr>
      <td class="size-px whitespace-nowrap" colspan="4">
        <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
          <div class="flex items-center gap-x-3 text-center">
            <div class="grow">
              <span class="block text-xl text-gray-600 dark:text-neutral-200">NO VOUCHER CODES FOR PRODUCTS YET</span>
            </div>
          </div>
        </div>
      </td>
    </tr>
  {/each}

  <svelte:fragment slot="mobile">
    {#each vouchers as voucher}
      <div class="rounded-lg border bg-white p-4 shadow">
        <div class="-m-4 flex items-center justify-between border-b p-4">
          <h2 class="text-2xl font-normal text-gray-800">
            <span class="text-base font-light">Voucher Code:</span>
            <span class="block font-bold capitalize">{voucher.code}</span>
          </h2>
        </div>
        <div class="mt-4 py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
          <div class="flex items-center gap-x-3">
            <img class="inline-block size-[38px] rounded-full" src={voucher.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
            <div class="flex grow flex-col gap-y-1.5">
              <span class="block text-wrap text-xs text-gray-500 dark:text-neutral-500">
                <span class="font-semibold text-gray-800">Product Name:</span>
                {voucher.product_name}
              </span>

              <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                Amount: <span class="font-semibold">{toCurrency(voucher.amount)}</span>
                {#if voucher.is_sold}
                  <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                    <span class="font-sem-bold text-gray-600">Purchased By:</span>
                    {voucher.app_user_name} (${voucher.app_user_email})
                  </span>
                  <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                    <span class="font-sem-bold text-gray-600">Transaction ID:</span>
                    #{voucher.user_transaction_id}
                  </span>
                {/if}

                <span
                  class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {voucher.is_sold
                    ? 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'
                    : 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'} rounded-full">
                  <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                  {#if voucher.is_sold}
                    Sold
                  {:else}
                    Available
                  {/if}
                </span>
              </span>

              <span class="block text-nowrap text-sm text-gray-500 dark:text-neutral-500">
                <span class="font-semibold text-gray-800">Email Template:</span>
                {voucher.email_template || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-end gap-x-4">
          <button
            class="rounded bg-yellow-400 px-4 py-2 text-xs text-black hover:bg-yellow-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="create-voucher-modal"
            data-hs-overlay="#manage-vouchers"
            on:click={() => dispatch("edit", voucher)}>
            Edit
          </button>
          <button
            class="rounded bg-red-500 px-4 py-2 text-xs text-white hover:bg-red-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="delete-voucher-modal"
            data-hs-overlay="#delete-voucher"
            on:click={() => dispatch("delete", voucher)}>
            Delete
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-white shadow rounded-lg p-4 border">
        <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
          <div class="flex items-center gap-x-3 text-center">
            <div class="grow">
              <span class="block text-xl text-gray-600 dark:text-neutral-200">NO VOUCHER CODES FOR PRODUCTS YET</span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </svelte:fragment>
</Table>
