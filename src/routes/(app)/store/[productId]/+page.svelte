<script>
  import { dev } from "$app/environment";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { checkPlus } from "$lib/Components/iconPaths";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { percentageCalculation, toCurrency } from "$lib/helpers";
  import ProcessInvoicePurchase from "./ProcessInvoicePurchase.svelte";
  import LoadingButton from "$lib/Components/FormInputs/LoadingButton.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
  import FloatingNumericTextInput from "$lib/Components/FormInputs/FloatingNumericTextInput.svelte";
  import { recordView } from "$lib/stores/recentlyViewed";
  import { enhance } from "$app/forms";
  import { cartStore } from "$stores/cartStore.js";
  import { page } from "$app/stores";
  import { addToCart } from "$lib/cart.remote.js";
  import { invalidateAll } from "$app/navigation";
  import { startPurchaseProductTour } from "$lib/tours";
  import TourTrigger from "$lib/Components/TourTrigger.svelte";

  let selectedDenomination = "btn-0";

  let { data } = $props();

  const { form, errors, message } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  let { product, user } = $derived(data);

  let cartActionLoading = false;
  let cartMessage = "";
  let addToCartLoading = $state(false);
  let addToCartMessage = $state("");
  let addToCartType = $state("success"); // 'success' | 'error'

  onMount(() => {
    if (product) {
      recordView({
        productId: product.id,
        title: product.product_name,
        imageUrl: product.product_image_url,
        price: product.product_price?.denominations?.[0] || 0,
      });
    }
    // Initialize cart store from localStorage for guests
    // (auth users' counts come from server via layout)
    if (!data.user?.email) {
      cartStore.initialize();
    }
  });

  function handleDenominationChange(e) {
    const target = e.target;
    const idx = parseInt(target.value.replace('btn-', ''), 10);
    const amount = sortedDenoms[idx] ?? 0;
    selectedDenomination = `btn-${idx}`;
    $form.unit_price = amount;
  }

  let sortedDenoms = $derived([...(product?.product_price?.denominations || [])].sort((a, b) => a - b));

  // Handle the addToCart form action result
  // For guests: the server returns product data, we update localStorage
  $effect(() => {
    if ($page.form?.cartAction === "guest") {
      cartStore.guestAdd({
        product_id: $page.form.product_id,
        product_name: $page.form.product_name,
        product_image_url: $page.form.product_image_url,
        unit_price: $page.form.unit_price,
        quantity: $page.form.quantity,
      });
      cartMessage = "Item added to cart!";
      const t = setTimeout(() => (cartMessage = ""), 3000);
      return () => clearTimeout(t);
    }
  });

  async function handleAddToCart() {
    addToCartLoading = true;
    try {
      const result = await addToCart({
        product_id: $form.product_id,
        unit_price: $form.unit_price,
        quantity: $form.quantity,
        product_name: product?.product_name || "",
        product_image_url: product?.product_image_url || "",
      });

      if (result.cartAction === "guest") {
        cartStore.guestAdd({
          product_id: result.product_id,
          product_name: result.product_name,
          product_image_url: result.product_image_url,
          unit_price: result.unit_price,
          quantity: result.quantity,
        });
        addToCartMessage = "Item added to cart!";
        addToCartType = "success";
      } else {
        addToCartMessage = result.message || "Item added to your cart!";
        addToCartType = "success";
        // Refresh layout data to update cart count badge
        await invalidateAll();
      }
    } catch (err) {
      addToCartMessage = err?.message || "Could not add item to cart.";
      addToCartType = "error";
    } finally {
      addToCartLoading = false;
      setTimeout(() => (addToCartMessage = ""), 3000);
    }
  }

  let totalPurchaseAmount = $derived(percentageCalculation($form.unit_price, $form.quantity, product.product_price.commission, product.percentage_discount, true));
  let paymentAmount = $derived(percentageCalculation($form.unit_price, $form.quantity, product.product_price.commission, product.percentage_discount, true, true));
  let discountedUnitPrice = $derived(percentageCalculation($form.unit_price, 1, product.product_price.commission, product.percentage_discount, true));
</script>

<svelte:head>
  <title>Purchase {product?.product_name} | HotDeals</title>
  <meta name="description" content="Purchase {product.product_name} from Hot Deals at very discounted prices. Blazing fast transactions and discreet are assured." />
</svelte:head>

<div class="container px-4 py-28 lg:py-40">
  <TourTrigger startTour={startPurchaseProductTour} />
  <div class="fixed bottom-0 left-0 z-[60] max-w-md">
    <SuperDebug data={{ $message, $form, $errors }} label="My form data" collapsible={true} display={dev} />
  </div>

  <main class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="hidden w-full text-white md:block md:pr-20">
      <div class="h-full">
        <img class="w-full rounded-xl" src={product.product_image_url} alt="hero-img-thumb" />
      </div>
    </div>
    <div>
      <div class="grid w-full grid-cols-12 items-center gap-5 overflow-hidden">
        <div class="col-span-3 mb-[30px] block max-h-[170px] md:hidden">
          <img class="w-full rounded-xl" src={product.product_image_url} alt="hero-img-thumb" />
        </div>
        <div class="col-span-9">
          <div class="title text-[20px] text-black sm:text-[30px] md:text-[38px] dark:text-white" style="font-weight: bold;">
            {product.product_name}
            <span class="text-base">({product.brand?.name})</span>
          </div>
        </div>
      </div>

      <div class="relative mt-5 overflow-hidden rounded-xl rounded-ss-3xl bg-brand-200 px-4 pb-8 pt-20 md:px-10 dark:bg-brand-900 dark:text-white">
        <div class="payment-steps-id absolute left-0 top-0 rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 text-center">
          <span class="font-bold text-white md:font-extrabold">1</span>
        </div>
        <h3 class="pb-6 text-xl font-medium md:text-2xl">Choose a Denomination</h3>

        {#if (product?.product_price?.denominations?.length || 0) > 7}
          <!-- Dropdown for products with many denominations -->
          {@const sortedDenoms = [...(product?.product_price?.denominations || [])].sort((a, b) => a - b)}
          <select
            class="w-full rounded-lg border border-transparent bg-brand px-4 py-3 font-medium text-brand-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-brand-700 dark:text-white"
            value={selectedDenomination}
            onchange={handleDenominationChange}>
            <option value="" disabled selected={!selectedDenomination || selectedDenomination === 'btn-0'}>
              Select a denomination
            </option>
            {#each sortedDenoms as amount, idx}
              <option value={`btn-${idx}`}>
                {toCurrency(amount)}
              </option>
            {/each}
          </select>
        {:else}
          <!-- Button grid for products with few denominations -->
          {@const sortedDenoms = [...(product?.product_price?.denominations || [])].sort((a, b) => a - b)}
          <div data-tour="denomination-grid" class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {#each sortedDenoms as amount, idx}
              <button
                type="button"
                class="group relative flex items-center justify-center rounded-lg border border-transparent bg-brand py-5 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:text-brand-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                class:selected={selectedDenomination == `btn-${idx}`}
                onclick={() => {
                  (selectedDenomination = `btn-${idx}`), ($form.unit_price = Number(amount) || 0);
                }}>
                {toCurrency(amount)}
                <span class="invisible absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-ee-2xl rounded-ss-md bg-white text-brand-600 group-[.selected]:visible">
                  {@html checkPlus}
                </span>
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <div class="relative mt-5 overflow-hidden rounded-xl rounded-ss-3xl bg-brand-200 px-4 pb-8 pt-20 md:px-10 dark:bg-brand-900 dark:text-white">
        <div class="payment-steps-id absolute left-0 top-0 rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 text-center">
          <span class="font-bold text-white md:font-extrabold">2</span>
        </div>
        <div class="flex flex-col gap-2 sm:gap-4">
          {#if !user?.email}
            <div data-tour="email-input"><FloatingTextInput name="email" type="email" label="Email Address :" placeholder="Value will be sent to this email address" bind:value={$form.email} msg={$errors.email} /></div>
          {/if}

          <div data-tour="quantity-input"><FloatingNumericTextInput
            name="quantity"
            label="Quantity"
            size="p-3"
            min={1}
            placeholder={`${toCurrency(discountedUnitPrice)} per Quantity`}
            bind:value={$form.quantity}
            isError={!!$errors.quantity}
            msg={$errors.quantity} /></div>
        </div>
      </div>

      <!-- Add to Cart button (Phase 21 — command-based) -->
      <div class="mt-5 overflow-hidden rounded-xl rounded-ss-3xl bg-brand-200 px-4 pb-6 pt-6 md:px-10 dark:bg-brand-900 dark:text-white">
        {#if addToCartMessage}
          <p class="mb-3 text-sm font-medium {addToCartType === 'error' ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}">
            {addToCartMessage}
          </p>
        {/if}

        <button data-tour="add-to-cart-btn"
          type="button"
          onclick={handleAddToCart}
          disabled={addToCartLoading || $form.unit_price <= 0}
          class="w-full bg-brand-200 px-10 py-4 font-medium text-brand-900 hover:bg-brand-300 focus:bg-brand-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-700 dark:text-white dark:hover:bg-brand-600">
          {addToCartLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      <div class="relative mt-5 overflow-hidden rounded-xl rounded-ss-3xl bg-brand-200 py-8 md:px-10 dark:bg-brand-900 dark:text-white" transition:slide={{ duration: 500 }}>
        <div class="payment-steps-id absolute left-0 top-0 rounded-ee-[2rem] rounded-ss-3xl bg-brand-800 text-center">
          <span class="font-bold text-white md:font-extrabold">3</span>
        </div>
        <div class="relative flex min-h-24 items-center justify-center">
          <div class="absolute flex shrink-0 flex-col items-center justify-center gap-3" transition:slide={{ duration: 900 }}>
            <div data-tour="pay-with-wallet-btn"><LoadingButton
              class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700"
              disabled={Number(totalPurchaseAmount) > user?.wallet_balance || totalPurchaseAmount <= 0 || (!user?.email && !$form.email)}
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="process-invoice-purchase-modal"
              data-hs-overlay="#process-invoice-purchase-modal">
              {#if !user?.email && !$form.email}
                Enter email address to proceed
              {:else}
                Pay with Wallet Funds {toCurrency(totalPurchaseAmount)}
              {/if}
            </LoadingButton></div>

            <ProcessInvoicePurchase data={$form} {paymentAmount} {user} />

            {#if paymentAmount > user?.wallet_balance}
              <span class="pb-6 text-end text-sm font-medium text-red-700">You have exceeded your wallet balance of {toCurrency(user?.wallet_balance)}</span>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-1 overflow-hidden rounded-xl bg-brand-200 p-4 px-[20px] py-[30px] md:col-span-2 md:px-[30px] dark:bg-brand-900 dark:text-white">
      <div class="overflow-hidden">
        <div>
          <div>
            <div>
              <div class="py-4">
                <h3 class="pb-6 text-xl font-medium md:text-2xl">Product Description / FAQs</h3>
              </div>
              <div style="transform: translateX(165px) translateX(-50%); transition-duration: 0.3s;"></div>
            </div>
          </div>
          <div class="!text-white">
            {@html product.faqs}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style lang="scss">
  .payment-steps-id {
    width: clamp(50px, 10vw, 75px);
    height: clamp(50px, 10vw, 65px);

    span {
      font-size: clamp(20px, 4.8vw, 48px);
      line-height: clamp(47px, 10vw, 60px);
    }
  }
</style>
