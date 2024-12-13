<script>
  import { page } from "$app/stores";
  import { toCurrency } from "$lib/helpers";
  import Modal from "$partials/Modal.svelte";
  import Table from "$lib/Components/Table.svelte";
  import { preloadData, pushState, goto } from "$app/navigation";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import OrderDetailsPage from "../details/[orderId]/+page.svelte";

  export let data;

  let currentTab = "All Orders";

  $: ({ pageData, orderTabs, filter } = data);

  /**
   * @param {(MouseEvent|KeyboardEvent) & { currentTarget: HTMLAnchorElement }} e
   */
  let loadDetails = async (e) => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();

    const { href } = e.currentTarget;
    const result = await preloadData(href);

    if (result.type === "loaded" && result.status === 200) {
      pushState(href, { orderDetails: result.data });

      setTimeout(() => {
        window.HSOverlay?.open("#view-order-details");
      }, 300);
    } else {
      goto(href);
    }
  };
</script>

<div class="grid grid-cols-3 gap-6 sm:mx-10 sm:grid-cols-5">
  {#each orderTabs as tab}
    <a
      href={tab.filter ? "/user/orders?filter=" + tab.filter : "/user/orders"}
      class="grid place-content-center rounded-xl border bg-white p-[16px] text-slate-800 shadow-lg dark:border-neutral-600 dark:bg-neutral-800 dark:text-slate-100"
      class:!border-brand-700={filter === tab.filter}
      class:!dark:border-2={filter === tab.filter}
      on:click={() => (filter = tab.filter)}>
      <div class="mx-auto mb-4 grid size-16 place-content-center rounded-full border-yellow-400 bg-yellow-400/20">
        {@html tab.icon}
      </div>
      <p class="flex items-center justify-center gap-1.5 text-[13px]">
        {tab.caption}
      </p>
    </a>
  {/each}
</div>

{#await pageData}
  <TableSkeleton />
{:then pageData}
  <Table tCaption="List of Orders" tDescription="Your order history will be listed here. You can also view your vouchers for completed transactions." navData={{ ...pageData.metadata, basePageUrl: "/user/orders" }}>
    <svelte:fragment slot="thead">
      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Product</span>
      </th>

      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Payment Details</span>
      </th>
    </svelte:fragment>

    {#each pageData.data as order}
      <tr class="text-start">
        <td class="size-px whitespace-nowrap text-start">
          <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
            <div class="flex items-center gap-x-3">
              <img class="inline-block size-[38px] rounded-full" src={order.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
              <div class="flex grow flex-col gap-y-1">
                <span class="block text-base font-semibold text-gray-800 dark:text-neutral-200">
                  {order.description}
                </span>
                <span class="block text-wrap text-xs font-semibold text-gray-800 dark:text-neutral-500">
                  <span class="font-light text-gray-500">Transaction ID:</span>
                  #{order.id}
                </span>
                {#if order.is_processed}
                  <a
                    href="/user/orders/details/{order.id}"
                    class="flex w-32 items-center rounded-lg pt-2 text-sm text-gray-800 underline dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="create-order-modal"
                    data-hs-overlay="#manage-orders"
                    on:click={loadDetails}>
                    View Voucher Codes
                  </a>
                {/if}
              </div>
            </div>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
            <div class="flex items-center gap-x-3">
              <div class="flex grow flex-col">
                <span class="block text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Amount: <span class="font-semibold">{toCurrency(order.pay_amount)}</span>
                  <span
                    class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {!order.is_processed
                      ? 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'
                      : 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'} rounded-full">
                    <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    {order.status}
                  </span>
                </span>
                <span class="block text-sm text-gray-600 dark:text-neutral-200">
                  Pay Amount: <span>{order.pay_amount} {order.pay_currency.toUpperCase()}</span>
                </span>
                <span class="block text-sm text-gray-600 dark:text-neutral-200">
                  Payment Method: <span>{order.payment_method.toUpperCase().replaceAll("_", " ")}</span>
                </span>
                {#if !order.is_processed && !order.expired_at}
                  <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                    <span class="font-sem-bold text-gray-800">Valid Until:</span>
                    {new Date(order.valid_until || "").toLocaleDateString()}
                  </span>
                {/if}
                {#if order.expired_at}
                  <span class="block text-wrap text-sm text-red-600 dark:text-red-600">
                    <span class="font-sem-bold text-red-600">Expired:</span>
                    {new Date(order.expired_at).toLocaleDateString()}
                  </span>
                {/if}
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
                <span class="block text-xl text-gray-600 dark:text-neutral-200">THERE ARE NO ORDERS ON YOUR ACCOUNT YET</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    {/each}

    <svelte:fragment slot="mobile">
      {#each pageData.data as order}
        <div class="rounded-lg border border-gray-200 bg-slate-50 p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-md dark:shadow-neutral-700/40">
          <div class="-m-4 flex items-center justify-between border-b border-gray-200 p-4 dark:border-neutral-700">
            <h2 class="text-2xl font-normal text-gray-800 dark:text-gray-400">
              <span class="text-base font-light">Order ID:</span>
              <span class="font-bold capitalize">#{order.id}</span>
            </h2>
          </div>
          <div class="mt-4 py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
            <div class="flex items-center gap-x-3">
              <img class="inline-block size-[38px] rounded-full" src={order.product_image_url} alt="Avatar" referrerpolicy="no-referrer" />
              <div class="flex grow flex-col gap-y-1.5">
                <span class="block text-wrap text-lg font-semibold text-gray-700 dark:text-neutral-300">
                  {order.description}
                </span>

                <span class="block text-base font-semibold text-gray-800 dark:text-neutral-400">
                  Amount: <span class="font-semibold">{toCurrency(order.pay_amount)}</span>
                  <span
                    class="ml-3 inline-flex items-center gap-x-1 px-1.5 py-1 text-xs font-medium {!order.is_processed
                      ? 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500'
                      : 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'} rounded-full">
                    <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    {order.status}
                  </span>
                </span>
                <span class="block text-sm text-gray-600 dark:text-neutral-400">
                  Pay Amount: <span>{order.pay_amount} {order.pay_currency.toUpperCase()}</span>
                </span>
                <span class="block text-sm text-gray-600 dark:text-neutral-400">
                  Payment Method: <span>{order.payment_method.toUpperCase().replaceAll("_", " ")}</span>
                </span>
                {#if !order.is_processed && !order.expired_at}
                  <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                    <span class="font-sem-bold text-gray-800">Valid Until:</span>
                    {new Date(order.valid_until || "").toLocaleDateString()}
                  </span>
                {/if}
                {#if order.expired_at}
                  <span class="block text-wrap text-sm text-red-600 dark:text-red-600">
                    <span class="font-sem-bold text-red-600">Expired:</span>
                    {new Date(order.expired_at).toLocaleDateString()}
                  </span>
                {/if}
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            {#if order.is_processed}
              <a
                href="/user/orders/details/{order.id}"
                class="rounded bg-teal-700 px-4 py-2 text-xs text-white hover:bg-teal-600"
                aria-haspopup="dialog"
                aria-expanded="true"
                aria-controls="view-order-details"
                data-hs-overlay="#view-order-details"
                on:click={loadDetails}>
                Voucher Codes
              </a>
            {/if}
          </div>
        </div>
      {:else}
        <div class="bg-white shadow rounded-lg p-4 border">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3 text-center">
              <div class="grow">
                <span class="block text-xl text-gray-600 dark:text-neutral-200">NO ORDER CODES FOR PRODUCTS YET</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </svelte:fragment>
  </Table>
{/await}

<Modal
  title="Details"
  name="view-order-details"
  on:close={() => {
    setTimeout(() => history.back(), 600);
  }}>
  <div slot="content">
    <OrderDetailsPage data={$page.state.orderDetails || { order: {} }} isModal />
  </div>
  <div slot="footer"></div>
</Modal>
