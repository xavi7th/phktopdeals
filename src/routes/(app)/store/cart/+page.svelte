<script>
  import { enhance } from "$app/forms";
  import { toCurrency } from "$lib/helpers";
  import { cartStore, cartTotal } from "$stores/cartStore.js";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";

  let { data } = $props();

  // Sync store with server data on load
  onMount(() => {
    if (data.isGuest) {
      cartStore.initialize(); // load guest cart from localStorage
    } else {
      cartStore.initialize(data.cartItems);
    }
  });

  // Local UI state
  let removingId = $state(null);
  let updatingId = $state(null);
  let checkoutLoading = $state(false);
</script>

<svelte:head>
  <title>Your Cart | PHK Hot Deals</title>
</svelte:head>

<div class="container px-4 py-28 lg:py-40">
  <h1 class="mb-8 text-2xl font-bold text-black md:text-3xl dark:text-white">Your Cart</h1>

  {#if data.isGuest}
    <!-- Guest: show localStorage cart + login prompt -->
    {#if $cartStore.items.length === 0}
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 size-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <p class="mb-4 text-gray-500">Your cart is empty.</p>
        <a href="/store/products" class="rounded-lg bg-brand px-6 py-3 font-medium text-brand-900 hover:bg-brand-700">Browse Products</a>
      </div>
    {:else}
      <div class="mb-4 rounded-lg border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-950">
        <p class="text-sm text-brand-700 dark:text-brand-300">
          You are browsing as a guest. <a href="/login" class="font-medium underline">Sign in</a>
          to save your cart and checkout with wallet funds.
        </p>
      </div>

      <ul class="space-y-4">
        {#each $cartStore.items as item (item.id)}
          <li class="flex items-center gap-4 rounded-xl bg-brand-100 p-4 dark:bg-brand-900">
            <div class="flex-1">
              <p class="font-medium text-black dark:text-white">{item.product_name}</p>
              <p class="text-sm text-gray-500">{toCurrency(item.unit_price)} each</p>
              <p class="text-sm font-semibold text-brand-700">Qty: {item.quantity} — Subtotal: {toCurrency(item.unit_price * item.quantity)}</p>
            </div>
            <button type="button" onclick={() => cartStore.guestRemove(item.id)} class="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50">Remove</button>
          </li>
        {/each}
      </ul>

      <div class="mt-6 rounded-xl bg-brand-200 p-6 dark:bg-brand-900">
        <p class="text-lg font-bold text-black dark:text-white">Total: {toCurrency($cartTotal)}</p>
        <a href="/login" class="mt-4 inline-block rounded-lg bg-black px-8 py-3 font-medium text-white hover:bg-gray-700">Sign in to Checkout</a>
      </div>
    {/if}
  {:else}
    <!-- Auth user: server-loaded cart -->
    {#if data.cartItems.length === 0}
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 size-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <p class="mb-4 text-gray-500">Your cart is empty.</p>
        <a href="/store/products" class="rounded-lg bg-brand px-6 py-3 font-medium text-brand-900 hover:bg-brand-700">Browse Products</a>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Cart items list -->
        <div class="lg:col-span-2">
          <ul class="space-y-4">
            {#each data.cartItems as item (item.id)}
              <li class="flex items-start gap-4 rounded-xl bg-brand-100 p-4 dark:bg-brand-900">
                {#if item.product?.image_url}
                  <img src={item.product.image_url} alt={item.product.name} class="size-20 rounded-lg object-cover" />
                {/if}

                <div class="flex-1">
                  <p class="font-semibold text-black dark:text-white">{item.product?.name}</p>
                  {#if item.product?.brand}
                    <p class="text-xs text-gray-500">{item.product.brand}</p>
                  {/if}
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {toCurrency(item.unit_price)} each
                  </p>
                  <p class="mt-1 font-semibold text-brand-700 dark:text-brand-400">
                    Subtotal: {toCurrency(item.subtotal)}
                  </p>

                  <!-- Quantity update form -->
                  <form
                    method="POST"
                    action="?/updateQty"
                    use:enhance={() => {
                      updatingId = item.id;
                      return async ({ update }) => {
                        await update({ invalidateAll: true });
                        updatingId = null;
                      };
                    }}
                    class="mt-2 flex items-center gap-2">
                    <input type="hidden" name="item_id" value={item.id} />
                    <label class="text-sm text-gray-500">Qty:</label>
                    <select
                      name="quantity"
                      onchange={(e) => e.target.form.requestSubmit()}
                      disabled={updatingId === item.id}
                      class="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:bg-neutral-800 dark:text-white">
                      {#each Array.from({ length: 99 }, (_, i) => i + 1) as qty}
                        <option value={qty} selected={qty === item.quantity}>{qty}</option>
                      {/each}
                    </select>
                    {#if updatingId === item.id}
                      <span class="text-xs text-gray-400">Updating…</span>
                    {/if}
                  </form>
                </div>

                <!-- Remove button -->
                <form
                  method="POST"
                  action="?/removeItem"
                  use:enhance={() => {
                    removingId = item.id;
                    return async ({ update }) => {
                      await update({ invalidateAll: true });
                      removingId = null;
                    };
                  }}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <button type="submit" disabled={removingId === item.id} class="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50">
                    {removingId === item.id ? "Removing…" : "Remove"}
                  </button>
                </form>
              </li>
            {/each}
          </ul>

          <!-- Clear cart -->
          <form method="POST" action="?/clearCart" use:enhance class="mt-4">
            <button type="submit" class="text-sm text-gray-500 hover:text-red-600">Clear Cart</button>
          </form>
        </div>

        <!-- Order summary sidebar -->
        <div>
          <div class="sticky top-28 rounded-xl bg-brand-200 p-6 dark:bg-brand-900">
            <h2 class="mb-4 text-lg font-bold text-black dark:text-white">Order Summary</h2>

            <div class="space-y-2 text-sm">
              {#each data.cartItems as item}
                <div class="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{item.product?.name} ×{item.quantity}</span>
                  <span>{toCurrency(item.subtotal)}</span>
                </div>
              {/each}
            </div>

            <hr class="my-4 border-gray-300 dark:border-gray-700" />

            <div class="flex justify-between font-bold text-black dark:text-white">
              <span>Total</span>
              <span>{toCurrency(data.cartTotal)}</span>
            </div>

            <div class="mt-2 flex justify-between text-sm text-gray-500">
              <span>Wallet balance</span>
              <span class:text-red-600={data.walletBalance < data.cartTotal}>{toCurrency(data.walletBalance)}</span>
            </div>

            {#if data.walletBalance < data.cartTotal}
              <p class="mt-3 rounded-lg bg-red-100 px-3 py-2 text-xs text-red-700">
                Insufficient balance. You need {toCurrency(data.cartTotal - data.walletBalance)} more.
                <a href="/user/transactions/top-up/choose-payment-method" class="ml-1 font-medium underline">Top up</a>
              </p>
            {/if}

            <form
              method="POST"
              action="?/checkout"
              use:enhance={() => {
                checkoutLoading = true;
                return async ({ update }) => {
                  await update({ invalidateAll: true });
                  checkoutLoading = false;
                };
              }}>
              <button
                type="submit"
                disabled={checkoutLoading || data.walletBalance < data.cartTotal}
                class="mt-6 flex w-full items-center justify-center rounded-lg bg-black px-8 py-3 font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
                {checkoutLoading ? "Processing…" : "Proceed to Checkout"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- closes grid grid-cols-1 -->
    {/if}
  {/if}
</div>
