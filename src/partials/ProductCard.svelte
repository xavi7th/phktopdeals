<script>
  import { toCurrency } from "$lib/helpers";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { favoriteIcon, maximizeIcon } from "$lib/Components/iconPaths";

  const splideCarousel = {
    label: "List Of Items In Carousel",
    type: "loop",
    gap: "1rem",
    perPage: 5,
    perMove: 2,
    arrows: true,
    pagination: false,
    rewind: false,
    lazyLoad: "nearby",
    breakpoints: {
      1200: {
        perPage: 4,
      },
      767: {
        perPage: 3,
      },
      640: {
        perPage: 2,
        perMove: 1,
      },
    },
  };

  /** @type {import('$lib/types').ProdSummary[]} */
  export let products = [];
</script>

<section>
  <Splide options={splideCarousel} aria-label="List Of products in this category">
    {#each products as product}
      <SplideSlide>
        <div
          class="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-sm hover:drop-shadow-xl dark:border-neutral-700 dark:bg-neutral-700/30 dark:shadow-neutral-700/70">
          <img class="h-[296px] w-[237px] rounded-xl" data-splide-lazy={product.img_url} alt="prod-thumb" />

          <div class="relative flex-1 px-4 py-2 md:px-5">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">
              {product.name}
            </h3>
          </div>

          <div class="absolute -right-10 top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4">
            <a href={`store/${product.name_slug}_${product.id}`}>
              <span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html maximizeIcon}</span>
            </a>
            <a href="#/">
              <span class="flex h-10 w-10 items-center justify-center rounded bg-gray-100/80 hover:bg-brand-200/80">{@html favoriteIcon}</span>
            </a>
          </div>

          <a
            href={`store/${product.name_slug}_${product.id}`}
            class="mt-1 text-balance rounded-b-xl border-t bg-brand px-4 py-3 text-center text-sm font-bold text-black transition-colors duration-300 hover:bg-brand-500 hover:text-white md:px-5 md:py-4 dark:border-brand-700 dark:bg-brand-900 dark:text-brand-50">
            BUY NOW from {toCurrency(product.min_price)}
          </a>
        </div>
      </SplideSlide>
    {/each}
  </Splide>
</section>
