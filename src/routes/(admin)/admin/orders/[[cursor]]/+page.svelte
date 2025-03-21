<script>
  import { page } from "$app/stores";
  import { toCurrency } from "$lib/helpers";
  import Modal from "$partials/Modal.svelte";
  import Toast from "$lib/Components/Toast.svelte";
  import Table from "$lib/Components/Table.svelte";
  import { applyAction, enhance } from "$app/forms";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { preloadData, pushState, goto } from "$app/navigation";
  import TableSkeleton from "$lib/Components/TableSkeleton.svelte";
  import OrderDetailsPage from "../details/[orderId]/+page.svelte";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import { checkMarkFilledAlt, warningIcon } from "$lib/Components/iconPaths";

  export let data;
  /** @type {{ message: { type: string; msg: string; } }}*/
  export let form;

  $: ({ transactions } = data);

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

{#if form?.message}
  <div class="fixed end-3 top-24 z-[100] space-y-3">
    <Toast positioned={false} type={form?.message?.type} msg={form?.message?.msg} />
  </div>
{/if}

{#await transactions}
  <TableSkeleton />
{:then transactions}
  <Table tCaption="List of Orders" tDescription="Your order history will be listed here. You can also view your vouchers for completed transactions." navData={{ ...transactions.metadata, basePageUrl: "/admin/orders" }}>
    <svelte:fragment slot="thead">
      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Product</span>
      </th>

      <th scope="col" class="px-6 py-3 text-start">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Payment Details</span>
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
                <a
                  href="/admin/orders/details/{order.id}"
                  class="inline-flex items-center gap-x-1 text-sm font-medium text-brand-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-brand-500"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="create-order-modal"
                  data-hs-overlay="#manage-orders"
                  on:click={loadDetails}>
                  View Details
                </a>
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
                {#if !order.is_processed && !order.expired_at && order.valid_until}
                  <span class="block text-wrap text-sm text-gray-500 dark:text-neutral-500">
                    <span class="font-sem-bold text-gray-800 dark:text-neutral-400">Valid Until:</span>
                    {new Date(order.valid_until).toLocaleDateString()}
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
                <span class="block text-xl text-gray-600 dark:text-neutral-400">THERE ARE NO ORDERS ON THE PLATFORM</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    {/each}

    <svelte:fragment slot="mobile">
      {#each transactions.data || [] as order}
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
                  {order?.description || "N/A"}
                  {#if !order?.description?.includes("Wallet")}
                    purchase
                  {/if}
                </span>

                <span class="block text-base font-semibold text-gray-800 dark:text-neutral-400">
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
                <span class="block text-sm text-gray-600 dark:text-neutral-400">
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
            <a
              href="/admin/orders/details/{order.id}"
              class="rounded bg-teal-700 px-4 py-2 text-xs text-white hover:bg-teal-600"
              aria-haspopup="dialog"
              aria-expanded="true"
              aria-controls="view-order-details"
              data-hs-overlay="#view-order-details"
              on:click={loadDetails}>
              View Details
            </a>
          </div>
        </div>
      {:else}
        <div class="bg-white shadow rounded-lg p-4 border">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3 text-center">
              <div class="grow">
                <span class="block text-xl text-gray-600 dark:text-neutral-400">THERE ARE NO ORDERS ON THE PLATFORM</span>
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
  <svelte:fragment slot="footer">
    {#if $page.state.orderDetails?.order?.is_processing || $page.state.orderDetails?.order?.is_processed}
      <form
        action=""
        method="POST"
        use:enhance={({ formElement, formData, action, cancel }) =>
          async ({ result }) =>
            await applyAction(result)}>
        <input type="text" name="orderId" value={$page.state.orderDetails?.order?.id} class="hidden" />
        <LoadingButton class="w-auto bg-black px-3 py-2 font-medium transition-opacity duration-300 hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700">
          {#if $page.state.orderDetails?.order?.voucher_codes?.length}
            Resend
          {:else}
            Process and Email
          {/if} Vouchers
        </LoadingButton>
      </form>
    {/if}
  </svelte:fragment>
</Modal>
