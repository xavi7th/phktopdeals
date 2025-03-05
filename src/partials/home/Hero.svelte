<script>
  import Swiper from "swiper";
  import { tick } from "svelte";
  import { slide } from "svelte/transition";
  import Typewriter from "svelte-typewriter";
  import { main_nav } from "$partials/Header.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { Pagination, Autoplay } from "swiper/modules";

  /**
   * @typedef PageData
   * @property {import('$lib/types').PageSection} sections
   * @property {import('$lib/types').Service[]} services
   * @property { {small: import('$lib/types').Slider[], large: import('$lib/types').Slider[]} } sliders
   */

  /** @type { {pageData: Promise< { data: PageData } > } } */
  let { pageData } = $props();
  let sliders = $state({ small: [], large: [] }),
    isLoaded = $state(false),
    searchQuery = $state(undefined);

  pageData.then(async (pageData) => {
    sliders = pageData.data.sliders;
    await tick();
    isLoaded = true;
  });

  $effect(() => {
    const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");

    if (isLoaded && sliders?.small?.length > 0) {
      const slider = new Swiper(".small-sliders", {
        modules: [Autoplay],
        loop: true,
        enabled: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        cssMode: true,
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 200,
        breakpoints: {
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        },
      });

      const slider2 = new Swiper(".large-sliders", {
        modules: [Autoplay, Pagination],
        loop: true,
        enabled: true,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
          },
        },
        mousewheel: true,
        keyboard: true,
        cssMode: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 100,
      });

      return () => {
        slider?.destroy();
        slider2?.destroy();
      };
    }
  });
</script>

<section class="hero min-h-[95dvh] bg-gray-100 lg:min-h-[85dvh]">
  <enhanced:img class="hero-bkg-img absolute h-full w-full rounded-lg" src="$lib/images/hero.jpg?enhance&w=1920" alt="hero-img" />
  <div class="container-fluid hero-content relatize z-20 mx-auto h-fit px-4 pb-10">
    <div class="w-full">
      <div class="flex w-full flex-col">
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
        <p class="hidden lg:block">Online shop with USDT, USDC, and other stable coins is also supported.</p>

        <div class="max-w-xl space-y-3">
          <form action="/store/products" method="GET" class="relative flex rounded-lg text-gray-600 shadow-sm dark:text-gray-400">
            <input
              bind:value={searchQuery}
              type="text"
              id="hs-search-box-with-loading-5"
              name="s"
              class="block w-full rounded-s-lg border-gray-200 px-4 py-3 ps-11 text-sm shadow-sm focus:z-10 focus:border-brand-500 focus:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 dark:border-brand-600/50 dark:bg-neutral-900 dark:focus:ring-neutral-600"
              placeholder="Search for products" />
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
              class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-e-md border border-transparent bg-brand-400
                            px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-brand-500
                            focus:bg-brand-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
              Start Shopping
              {#if !isLoaded}
                <span class="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white" role="status" aria-label="loading">
                  <span class="sr-only">Loading...</span>
                </span>
              {/if}
            </button>
          </form>
        </div>
      </div>

      <div class="my-4 flex flex-wrap items-center gap-3">
        {#each main_nav as { name, url }}
          <a
            class="mr-1 inline-flex items-center gap-x-3 rounded-full bg-white px-5 py-3 text-xs font-semibold text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none dark:bg-gray-900 dark:text-neutral-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
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

      {#if isLoaded && (sliders.large?.length > 0 || sliders.small?.length > 0)}
        <div class="mb-8 mt-8 h-max content-start lg:mt-16" transition:slide={{ duration: 2000, axis: "y" }}>
          {#if sliders.large.length > 0}
            <div class="h-[200px] rounded-lg bg-white shadow-sm sm:h-[300px] lg:!h-[360px] dark:bg-neutral-900 dark:shadow-neutral-700/70">
              <div class="h-full w-full rounded-lg bg-white shadow-md dark:bg-neutral-800">
                <div class="swiper large-sliders h-full">
                  <div class="swiper-wrapper h-full">
                    {#each sliders.large as slider}
                      <div class="swiper-slide h-full w-full rounded-xl">
                        <span class="block h-full w-full rounded-md border border-brand-500 bg-cover bg-center bg-no-repeat" style="background-image: url({slider.img_url});"></span>
                      </div>
                    {/each}
                  </div>

                  <div class="swiper-pagination"></div>
                  <div class="autoplay-progress">
                    <svg viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          {/if}

          {#if sliders.small.length > 0}
            <h3 class="mb-2 mt-6 px-5 text-xl font-semibold text-neutral-200 md:mt-12 md:text-2xl lg:mb-4 lg:font-bold">Hot Items</h3>

            <div class="swiper small-sliders !px-5">
              <div class="swiper-wrapper">
                {#each sliders.small as slider}
                  <div class="swiper-slide h-48 rounded-md bg-white shadow-sm dark:bg-neutral-900 dark:shadow-neutral-700/70">
                    <a href={slider.url} target="_blank">
                      <!-- <img class="h-full rounded-xl" src="{slider.img_url}" alt="hero-img-thumb" /> -->
                      <span class="block h-28 w-full rounded-md border border-brand-500 bg-cover md:h-48" style="background-image: url({slider.img_url});"></span>
                    </a>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/if}
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

  .autoplay-progress {
    --swiper-theme-color: theme("colors.brand.500");
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 10;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--swiper-theme-color);
  }

  .autoplay-progress svg {
    --progress: 0;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
    stroke-width: 4px;
    stroke: var(--swiper-theme-color);
    fill: none;
    stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
  }
</style>
