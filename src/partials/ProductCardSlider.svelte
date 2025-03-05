<script>
  import ProductCard from "$partials/ProductCard.svelte";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";

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
      1680: {
        perPage: 7,
      },
      1200: {
        perPage: 6,
      },
      767: {
        perPage: 3,
      },
      640: {
        perPage: 3,
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
        <ProductCard {product} />
      </SplideSlide>
    {/each}
  </Splide>
</section>
