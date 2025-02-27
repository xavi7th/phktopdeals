<script>
  import { slide } from 'svelte/transition';
  import Typewriter from "svelte-typewriter";
  import { main_nav } from '$partials/Header.svelte';
  import SvgIcon from "$lib/Components/SvgIcon.svelte";

  let isLoading = false;

  let {pageData} = $props();
</script>

<section class="hero min-h-[95dvh] bg-gray-100 lg:min-h-[85dvh]">
  <enhanced:img class="hero-bkg-img absolute h-full w-full rounded-xl" src="$lib/images/hero.jpg?enhance&w=1920" alt="hero-img" />
  <div class="container-fluid hero-content relatize z-20 mx-auto h-fit px-4 pb-10">
    <div class="w-full">
      <div class="flex max-w-screen-sm flex-col md:w-4/5">
        <Typewriter mode="loop" element="h1" --cursor-color="white" --cursor-width="2px" interval={60} wordInterval={2000} unwriteInterval={80}>
          <span data-static>Buy</span>
          <span>eSim</span>
          <span>Software</span>
          <span>Gift Cards</span>
          <span>Google Play</span>
          <span>Phone Top-Up</span>
          <span>Games</span>
          <span>Spotify</span>
          <span>Netflix</span>
          <span>App Store</span>
          <span>Airbnb</span>

          <SvgIcon svgHeight={25} svgWidth={568} data-static class="typewriter-stroke !w-[clamp(150px,25vw,300px)]">
            <path data-static opacity="0.7" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round" />
          </SvgIcon>
        </Typewriter>

        <h2>With Bitcoin and other Cryptos</h2>
        <p>Online shop with USDT, USDC, and other stable coins is also supported.</p>

        <div class="max-w-xl space-y-3">
          <div>
            <div class="relative flex rounded-lg shadow-sm">
              <input
                type="text"
                id="hs-search-box-with-loading-5"
                name="hs-search-box-with-loading-5"
                class="block w-full rounded-s-lg border-gray-200 px-4 py-3 ps-11 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Input search" />
              <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                <svg
                  class="size-4 shrink-0 text-gray-400 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-e-md border border-transparent bg-brand-400
                            px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-brand-500
                            focus:bg-brand-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Start Shopping
                {#if isLoading}
                  <span class="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                  </span>
                {/if}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="my-4 flex flex-wrap items-center gap-3">
        {#each main_nav as {name, url}}
          <a
            class="mr-1 inline-flex items-center gap-x-3 rounded-full bg-white px-5 py-3 text-xs font-semibold text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none dark:bg-gray-900 dark:text-neutral-50"
            href={url}>
            {name}
          </a>
        {/each}

        {#each Array(3) as n}
          <span class="relative mr-0.5 hidden lg:block">
            <span class="absolute start-0 top-[-5px] flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-brand-50 opacity-25 dark:bg-brand-600"></span>
              <span class="relative inline-flex size-2 rounded-full bg-brand-400"></span>
            </span>
          </span>
        {/each}
      </div>

      {#await pageData}
      {:then pageData}
        <div class="mb-8 mt-28 grid h-max grid-cols-5 content-start gap-3" transition:slide={{ duration: 2000, axis: 'y' }}>

          {#if pageData.data.sliders?.large}
            <div class="order-last col-span-5 h-[200px] rounded-xl border bg-white shadow-sm sm:h-[300px] md:order-none md:col-span-3 lg:!h-[360px] dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70">
              <div class="h-full w-full rounded-lg bg-white shadow-md dark:bg-neutral-800">
                <div data-hs-carousel={`{"loadingClasses": "opacity-0", "isAutoPlay": "true"}`} class="relative h-full">
                  <div class="hs-carousel relative h-full w-full overflow-hidden rounded-lg bg-white">
                    <div class="hs-carousel-body absolute bottom-0 start-0 top-0 flex h-full flex-nowrap opacity-0 transition-transform duration-700">
                      {#each pageData.data.sliders.large as slider}
                        <div class="hs-carousel-slide">
                          <a href="{slider.url}">
                            <img class="h-full w-full rounded-xl" src="{slider.img_url}" alt="hero-img-thumb" />
                          </a>
                        </div>
                      {/each}
                    </div>
                  </div>

                  <button
                    type="button"
                    class="hs-carousel-prev hs-carousel:disabled:opacity-50 absolute inset-y-0 start-0 inline-flex h-full w-[46px] items-center justify-center rounded-s-lg text-gray-800 hover:bg-gray-800/10 focus:bg-gray-800/10 focus:outline-none disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                    <span class="text-2xl" aria-hidden="true">
                      <svg
                        class="size-5 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                    </span>
                    <span class="sr-only">Previous</span>
                  </button>
                  <button
                    type="button"
                    class="hs-carousel-next hs-carousel:disabled:opacity-50 absolute inset-y-0 end-0 inline-flex h-full w-[46px] items-center justify-center rounded-e-lg text-gray-800 hover:bg-gray-800/10 focus:bg-gray-800/10 focus:outline-none disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                    <span class="sr-only">Next</span>
                    <span class="text-2xl" aria-hidden="true">
                      <svg
                        class="size-5 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </span>
                  </button>

                  <div class="hs-carousel-pagination absolute bottom-3 end-0 start-0 flex justify-center space-x-2">
                    {#each Array(8) as n}
                      <span
                        class="size-3 cursor-pointer rounded-full border border-gray-400 hs-carousel-active:border-blue-700 hs-carousel-active:bg-blue-700 dark:border-neutral-600 dark:hs-carousel-active:border-blue-500 dark:hs-carousel-active:bg-blue-500">
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          {/if}

        </div>
      {:catch}
      {/await}
    </div>
  </div>
</section>

<style lang="scss">
  .hero {
    position: relative;

    > :global(picture) {
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: linear-gradient(100.06deg, #000 65.67%, #ffda1c 150.22%) !important;
        opacity: 0.75;
        z-index: 10;
      }
    }
  }
  .hero-content {
    --tw-text-opacity: 1;

    position: relative;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 9rem;
    color: rgb(255 255 255 / var(--tw-text-opacity));
    display: flex;
    flex-direction: column;

    @media (min-width: 600px) {
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }

    :global {
      h1 {
        font-size: 1.5rem;
        font-weight: 700;

        @media (min-width: 600px) {
          font-size: 2.25rem;
        }

        @media (min-width: 1280px) {
          font-size: 3rem;
        }

        &.cursor {
          .typing::after {
            height: 1.3ch;
            margin-left: 0.2ch;
            display: inline-block;
            vertical-align: middle;
          }
        }

        [data-static] * {
          display: inherit !important;
        }

        .typewriter-stroke {
          width: 12.5rem;

          @media (min-width: 960px) {
            margin-left: 6rem;
            width: 24rem;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
        }

        span:not([data-static]) {
          color: $themePrimary;
        }
      }
    }

    h2 {
      margin-bottom: 1.25rem;
      font-size: 1rem;

      @media (min-width: 960px) {
        font-size: 1.25rem;
      }

      @media (min-width: 1280px) {
        font-size: 2.25rem;
      }
    }

    p {
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
    }
  }
</style>
