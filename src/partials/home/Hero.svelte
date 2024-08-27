<script>
	import Typewriter from 'svelte-typewriter';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { shuffle } from '$lib/helpers';

  let isLoading = false;
</script>

<section class="hero min-h-[95dvh] bg-gray-100 lg:min-h-[85dvh]" style="background-image: url('https://images.unsplash.com/photo-1659710173823-b4362e0ab9c7?q=80&w=1920&h=800&fit=crop'); background-size: cover; background-position: center;">
	<div class="container-fluid hero-content mx-auto h-fit px-4 pb-10">
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

          <SvgIcon svgHeight={25} svgWidth={568} data-static class="typewriter-stroke">
            <path data-static opacity="0.7" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round"/>
          </SvgIcon>
        </Typewriter>

        <h2>With Bitcoin and other Cryptos</h2>
        <p>Online shop with USDT, USDC, and other stable coins is also supported.</p>

        <div class="max-w-xl space-y-3">
          <div>
            <div class="relative flex rounded-lg shadow-sm">
              <input type="text" id="hs-search-box-with-loading-5" name="hs-search-box-with-loading-5" class="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Input search">
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                <svg class="shrink-0 size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <button type="button" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold text-gray-800
                            rounded-e-md border border-transparent bg-brand-400 hover:bg-brand-500 focus:outline-none
                            focus:bg-brand-500 disabled:opacity-50 disabled:pointer-events-none text-nowrap">
                Start Shopping
                {#if isLoading}
                  <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                  </span>
                {/if}
              </button>
            </div>
          </div>
        </div>
			</div>

      <div class="my-4 flex flex-wrap items-center gap-3">
        {#each shuffle(['Restaurants', 'Groceries', 'Games', 'Softwares', 'Subscriptions', 'VISA Cards']).slice(0, 3) as item}
          <a class="mr-1 inline-flex items-center gap-x-3 rounded-full bg-white px-5 py-3 text-xs font-medium text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none dark:bg-gray-900 dark:text-neutral-50 font-semibold" href="#">{item}</a>
        {/each}

        {#each Array(3) as n}
          <span class="relative mr-0.5">
            <span class="flex absolute top-[-5px] start-0 size-2">
              <span class="animate-ping absolute inline-flex size-full rounded-full bg-brand-50 opacity-25 dark:bg-brand-600"></span>
              <span class="relative inline-flex rounded-full size-2 bg-brand-400"></span>
            </span>
          </span>
        {/each}
      </div>

      <div class="grid grid-cols-5 gap-3 mt-28 mb-8 h-80">
        <div class="bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <a href="http://goofle.com" target="_blank">
            <enhanced:img class="h-full rounded-xl" src="$lib/images/buy-with-gate.io.svg?enhance" alt="hero-img-thumb" />
          </a>
        </div>

        <div class="col-span-3 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">

          <div class="w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
            <div data-hs-carousel='{ `{"loadingClasses": "opacity-0", "isAutoPlay": "true"}` }' class="relative">
              <div class="hs-carousel relative overflow-hidden w-full h-80 bg-white rounded-lg">
                <div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-2.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-1.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-2.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-1.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-2.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-1.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-2.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                  <div class="hs-carousel-slide">
                    <a href="/shop" target="_blank">
                      <enhanced:img class="h-full w-full rounded-xl" src="$lib/images/sliders/hero-slider-1.png?enhance" alt="hero-img-thumb" />
                    </a>
                  </div>
                </div>
              </div>

              <button type="button" class="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                <span class="text-2xl" aria-hidden="true">
                  <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </span>
                <span class="sr-only">Previous</span>
              </button>
              <button type="button" class="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                <span class="sr-only">Next</span>
                <span class="text-2xl" aria-hidden="true">
                  <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </span>
              </button>

              <div class="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
                {#each Array(8) as n}
                  <span class="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500"></span>
                {/each}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <a href="/shop" target="_blank">
            <enhanced:img class="h-full rounded-xl" src="$lib/images/buy-with-binance.webp?enhance" alt="hero-img-thumb" />
          </a>
        </div>
      </div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero {
		position: relative;

		&::before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			width: 100%;
			background: linear-gradient(100.06deg, #000 65.67%, #ffda1c 150.22%) !important;
			opacity: 0.75;
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
            margin-top: -2rem;
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
