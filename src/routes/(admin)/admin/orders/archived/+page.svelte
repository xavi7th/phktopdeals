<script>
  import { page } from "$app/stores";
  import { toCurrency } from "$lib/helpers";
  import Toast from "$lib/Components/Toast.svelte";
  import Table from "$lib/Components/Table.svelte";
  import DateFilterChips from "$lib/Components/DateFilterChips.svelte";
  import { enhance } from "$app/forms";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import { checkMarkFilledAlt, warningIcon } from "$lib/Components/iconPaths";

  export let data;
  /** @type {{ message: { type: string; msg: string; } }}*/
  export let form;

  $: ({ transactions } = data);
</script>

{#if form?.message}
  <div class="fixed end-3 top-24 z-[100] space-y-3">
    <Toast positioned={false} type={form?.message?.type} msg={form?.message?.msg} />
  </div>
{/if}

{#await transactions}
  <TableSkeleton />
{:then transactions}
  <div class="mb-4 flex items-center justify-between px-2">
    <DateFilterChips baseUrl="/admin/orders/archived" showMonthPicker />
    <a
      class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      href="/admin/orders">
      View Active Orders
    </a>
  </div>

  <Table tCaption="Archived Orders" tDescription="Archived orders are hidden from the main orders page." navData={{ ...transactions.metadata, basePageUrl: "/admin/orders/archived" }}>
    <svelte:fragment slot="thead">
      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Product</span>
      </th>

      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Payment Details</span>
      </th>

      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Actions</span>
      </th>
    </svelte:fragment>

    {#each transactions.data || [] as order}
      <tr class="text-start">
        <td class="size-px whitespace-nowrap text-start">
          <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
            <div class="flex items-center gap-x-3">
              <img class="inline-block size-[38px] rounded-full" src={order.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
              <div class="flex grow flex-col gap-y-1">
                <span class="block text-base font-semibold text-gray-800 dark:text-neutral-200">
                  {order?.description || "N/A"}
                  {#if !order?.description?.includes("Wallet")}
                    purchase
                  {/if}
                </span>
                <span class="block text-wrap text-xs font-semibold text-gray-800 dark:text-neutral-500">
                  <span class="font-light text-gray-500">Transaction ID:</span>
                  #{order.id}
                </span>
              </div>
            </div>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
            <div class="flex items-center gap-x-3">
              <div class="flex grow flex-col">
                <span class="block text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Amount: <span class="font-semibold">{toCurrency(order.price_amount)}</span>
                  <span
                    class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {order.status == 'finished' || order.status == 'confirmed'
                      ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'
                      : (order.status == 'waiting' || order.status == 'confirming' || order.status == 'partially paid') && !order.expired_at
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500'
                        : order.status == 'processing' || order.status == 'sending'
                          ? 'bg-purple-200 text-purple-800 dark:bg-purple-500/10 dark:text-purple-500'
                          : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'} rounded-full">
                    <SvgIcon class="size-2.5" svgHeight={16} slot={order.is_processed ? checkMarkFilledAlt : warningIcon} />
                    {order?.expired_at ? "Expired" : order?.status}
                  </span>
                </span>
                <span class="block text-sm text-gray-600 dark:text-neutral-200">
                  Pay Amount:
                  <span>
                    {#if order.pay_currency === "NGN"}
                      {toCurrency(order.pay_amount, order.pay_currency.toUpperCase())}
                    {:else}
                      {order.pay_amount}
                      <span class="uppercase">{order.pay_currency}</span>
                    {/if}
                  </span>
                </span>
                <span class="block text-sm text-gray-600 dark:text-neutral-200">
                  Payment Method: <span>{order.payment_method.toUpperCase().replaceAll("_", " ")}</span>
                </span>
              </div>
            </div>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="flex gap-3 px-6 py-1.5">
            <form action="?/unarchive" method="POST" use:enhance>
              <input type="text" class="hidden" name="id" value={order.id} />
              <button
                type="submit"
                class="m-0 inline-flex items-center gap-x-1 border-0 bg-transparent p-0 text-sm font-medium text-teal-600 decoration-2 shadow-none hover:underline focus:underline focus:outline-none dark:text-teal-500">
                Unarchive
              </button>
            </form>
          </div>
        </td>
      </tr>
    {:else}
      <tr>
        <td class="size-px whitespace-nowrap" colspan="3">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3 text-center">
              <div class="grow">
                <span class="block text-xl text-gray-600 dark:text-neutral-400">THERE ARE NO ARCHIVED ORDERS</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    {/each}
  </Table>
{/await}
