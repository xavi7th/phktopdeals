<script>
  import { fade } from "svelte/transition";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import ProductCardSlider from "$partials/ProductCardSlider.svelte";

  export let sectionTitle = "";
  /** @type {import('$lib/types').PageSectionContent} */
  export let content;
</script>

{#if content.items?.length}
  <section class="mt-12 w-full" transition:fade={{ duration: 1000 }}>
    <div class="container-fluid lg:container">
      <div class="row px-4">
        <div class="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 class="text-title relative">
            {sectionTitle.replace("_", " ")}
            <SvgIcon svgHeight={25} svgWidth={568} data-static class="absolute -bottom-9 left-1/2 !w-1/4">
              <path data-static opacity="1" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="1" stroke-width="5" stroke-linecap="round" />
            </SvgIcon>
          </h2>
        </div>

        <ProductCardSlider products={content.items} />
      </div>
    </div>
  </section>
{/if}
