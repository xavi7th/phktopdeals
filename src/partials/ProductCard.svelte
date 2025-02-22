<script>
  import { percentageCalculation } from "$lib/helpers";

  /** @type {import('$lib/types').ProdSummary} */
  export let product;
</script>

<div
  class="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-sm hover:drop-shadow-xl dark:border-neutral-700 dark:bg-neutral-700/30 dark:shadow-neutral-700/70">
  <img class="h-[120px] rounded-xl" src={product?.img_url} alt={product.name} />

  <div class="relative flex-1 px-4 py-2 md:px-5">
    <h3 class="text-xs text-gray-800 dark:text-white">
      {product?.name}
    </h3>
  </div>

  <div class="absolute -right-10 top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4">
    <!-- <a href={`store/${product?.name_slug}_${product?.id}`}>
      <span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html maximizeIcon}</span>
    </a> -->
    <!-- <a href="#/">
      <span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html favoriteIcon}</span>
    </a> -->
  </div>

  <a
    href={`store/${product?.name_slug}_${product?.id}`}
    class="mt-1 tracking-tighter rounded-b-xl border-t bg-brand px-2 py-1 text-center text-[0.7rem] text-gray-700 transition-colors duration-300 hover:bg-brand-500 hover:text-white md:px-3 md:py-2 dark:border-brand-900 dark:bg-brand-700 dark:text-brand-50">
    BUY NOW <span class="text-lg font-bold text-black dark:text-white pl-2 inline-block">{percentageCalculation(product.min_price, 1, 0, product.percentage_discount)}</span>
  </a>
</div>
