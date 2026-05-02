<script>
  import { percentageCalculation, toCurrency } from "$lib/helpers";
  import { addToCart } from "$lib/cart.remote.js";
  import { cartStore } from "$stores/cartStore.js";
  import { goto } from "$app/navigation";

  /** @type { {product: import('$lib/types').ProdSummary} } */
  let { product } = $props();

  let addingToCart = $state(false);
  let addMessage = $state("");
  let addMessageType = $state("success");

  async function handleAddToCart() {
    if (!product) return;
    addingToCart = true;
    try {
      const minPrice = product.min_price || 0;
      const result = await addToCart({
        product_id: product.id,
        unit_price: minPrice,
        quantity: 1,
        product_name: product.name || "",
        product_image_url: product.img_url || "",
      });

      if (result.cartAction === "guest") {
        cartStore.guestAdd({
          product_id: result.product_id,
          product_name: result.product_name,
          product_image_url: result.product_image_url,
          unit_price: result.unit_price,
          quantity: result.quantity,
        });
        addMessage = "Added to cart!";
        addMessageType = "success";
      } else {
        addMessage = result.message || "Added to cart!";
        addMessageType = "success";
      }
    } catch (err) {
      addMessage = err?.message || "Could not add to cart.";
      addMessageType = "error";
    } finally {
      addingToCart = false;
      setTimeout(() => (addMessage = ""), 2500);
    }
  }
</script>

<div
  class="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-sm hover:drop-shadow-xl dark:border-neutral-700 dark:bg-neutral-700/30 dark:shadow-neutral-700/70">
  <img class="h-[120px] rounded-xl" src={product?.img_url} alt={product.name} />

  <div class="relative flex-1 px-4 py-2 md:px-5">
    {#if product?.brand?.logo_url}
      <img class="mb-1 h-4 object-contain" src={product.brand.logo_url} alt={product.brand.name} onerror={(e) => (e.currentTarget.style.display = "none")} />
    {/if}
    <h3 class="text-xs text-gray-800 dark:text-white">
      {product?.name}
    </h3>
    {#if product?.brand?.name}
      <p class="text-[0.6rem] text-gray-500 dark:text-neutral-400">
        {product.brand.name}
      </p>
    {/if}
  </div>

  <div class="absolute -right-10 top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4">
    <!-- <a href={`store/${product?.name_slug}_${product?.id}`}>
      <span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html maximizeIcon}</span>
    </a> -->
    <!-- <a href="#/">
      <span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html favoriteIcon}</span>
    </a> -->
  </div>

  <!-- Price area — now has Add to Cart button -->
  <div class="mt-1 flex items-center gap-2 rounded-b-xl border-t bg-brand px-2 py-1 dark:border-brand-900 dark:bg-brand-700">
    <!-- Add to Cart button -->
    <button
      type="button"
      onclick={handleAddToCart}
      disabled={addingToCart || product.disabled_at}
      class="shrink-0 rounded bg-brand-600 px-2 py-1 text-xs font-bold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
      title="Add to Cart">
      {addingToCart ? "..." : "+"}
    </button>

    <!-- Price link -->
    {#if product.min_price == product.max_price}
      <a href={`/store/${product?.name_slug}_${product?.id}`} class="flex-1 text-center text-[0.7rem] tracking-tighter text-gray-700 transition-colors duration-300 hover:text-white dark:text-brand-50">
        <span class="inline-block pl-2 text-lg font-bold text-black dark:text-white">{percentageCalculation(product.min_price, 1, 0, product.percentage_discount)}</span>
      </a>
    {:else}
      <a href={`/store/${product?.name_slug}_${product?.id}`} class="flex-1 text-center text-[0.7rem] tracking-tighter text-gray-700 transition-colors duration-300 hover:text-white dark:text-brand-50">
        <span class="block pl-2 text-lg font-bold text-black dark:text-white">
          {percentageCalculation(product.min_price, 1, 0, product.percentage_discount)} - {percentageCalculation(product.max_price, 1, 0, product.percentage_discount)}
        </span>
      </a>
    {/if}

    <!-- Inline success/error message -->
    {#if addMessage}
      <span class="text-xs {addMessageType === 'error' ? 'text-red-600' : 'text-green-700'}">{addMessage}</span>
    {/if}
  </div>
</div>
