<script>
    import '@splidejs/svelte-splide/css';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import { favoriteIcon, maximiseIcon } from '$lib/Components/iconPaths';

    const splideCarousel = {
        label: 'List Of Item In Carousel',
        type: 'slide',
        gap: '0.5rem',
        perPage: 5,
        perMove: 5,
        arrows: false,
        pagination: false,
        rewind: false,
        breakpoints: {
            1200: {
                perPage: 4,
            },
            767: {
                perPage: 3,
            },
            640: {
                perPage: 2,
            }
        }
    }

    export let list;
</script>

<section>
    <Splide 
        options={splideCarousel}
        aria-label="List Of Item In Carousel">
        {#each [1,2,3,4,5,6,7,8,9,10] as n}
            <SplideSlide>
                <div class="group overflow-hidden relative flex flex-col bg-white shadow rounded-xl dark:bg-neutral-700/30 dark:border-neutral-700 dark:shadow-neutral-700/70 transition hover:drop-shadow-xl hover:shadow-sm hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025]">
    
                    {#if n%2 == 0}
                    <enhanced:img class="w-full h-auto rounded-xl" src="$lib/images/games-6.avif?aspect=400:320&fit=cover" alt="hero-img-thumb" />
                    {:else if n%3 == 0}
                    <enhanced:img class="w-full h-auto rounded-xl" src="$lib/images/games-5.avif?aspect=400:320&fit=cover" alt="hero-img-thumb" />
                    {:else}
                    <enhanced:img class="w-full h-auto rounded-xl" src="$lib/images/games-3.avif?aspect=400:320&fit=cover" alt="hero-img-thumb" />
                    {/if}
    
                    <div class="px-4 md:px-5 py-2 md:py-3 flex-1 relative min-h-28">
                    <h3 class="text-lg font-bold text-gray-800 dark:text-white border-b-2 pb-3 mb-5">VISA Card</h3>
    
                    <div class="flex items-center justify-center mt-4 absolute bottom-0 right-0 left-0">
                        <div class="flex basis-1/2 justify-center border-[#e5e5e5] border-r-2 flex-1">
                        <enhanced:img class="h-8 w-8 self-center sm:h-10 sm:w-10 ng-star-inserted" src="$lib/images/icons/steam.svg?enhance"/>
                        <enhanced:img class="h-10 w-10 sm:w-12" src="$lib/images/icons/others.svg?enhance" />
                        </div>
                        <div class="text-exo-2 basis-1/2 text-center text-2xl font-bold text-[#484C50] dark:text-white">$49.85</div>
                    </div>
    
                    </div>
    
                    <div class="flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                    <a href="#"><span class="w-10 h-10 flex justify-center items-center bg-gray-100/80 hover:bg-brand-200/80 rounded">{@html maximiseIcon }</span></a>
                    <a href="#"><span class="w-10 h-10 flex justify-center items-center bg-gray-100/80 hover:bg-brand-200/80 rounded">{@html favoriteIcon }</span></a>
                    </div>
    
                    <button class="transition-colors duration-300 bg-brand hover:bg-brand-500 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-brand-900 dark:border-brand-700 mt-1 text-sm text-black dark:text-brand-50 hover:text-white">
                    ADD TO CART
                    </button>
                </div>
            </SplideSlide>
        {/each}
    </Splide>
</section>
