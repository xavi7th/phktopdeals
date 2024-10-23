<script>
// @ts-nocheck

	import SvgIcon from '$lib/Components/SvgIcon.svelte';
    import HowItWorks from '$partials/home/HowItWorks.svelte';
	import SectionTitle from '$partials/SectionTitle.svelte';
    import { favoriteIcon, maximiseIcon } from '$lib/Components/iconPaths';

    import Mobile from '$lib/images/icons/mobile.svg'
    import Global from '$lib/images/icons/global.svg'
    import Utilities from '$lib/images/icons/utilities.svg'
    import GiftCards from '$lib/images/icons/GiftCards.svg'
    import Television from '$lib/images/icons/television.svg'
    import Landline from '$lib/images/icons/landline.svg'

    let selectedTopUp = 'Mobile'

    const topUps = [
        {
            caption: 'Mobile',
            image: Mobile,
            size: 'default',
        },
        {
            caption: 'Internet',
            image: Global,
            size: 50,
        },
        {
            caption: 'Utilities',
            image: Utilities,
            size: 40,
        },
        {
            caption: 'Vouchers',
            image: GiftCards,
            size: 40,
        },
        {
            caption: 'Television',
            image: Television,
            size: 40,
        },
        {
            caption: 'Landline',
            image: Landline,
            size: 40,
        },
    ]

</script>

<main>
    <section class="bg-gradient-to-l from-yellow-200 py-28 lg:py-40">
        <div class="container">
            <div class="row">
                <div class="grid lg:grid-cols-6 grid-cols-3 sm:gap-10 gap-2 px-2 pt-0 sm:px-10 md:px-20">
                  {#each topUps as item (item.caption)}
                    <button type="button" class="block item-wrapper w-full sm:w-10/12 ng-star-inserted" on:click={() => selectedTopUp = item.caption}>
                        <div class="item w-full">
                            <div class="card flex sm:h-40 h-12 flex-col items-center justify-center sm:rounded-3xl rounded-2xl bg-[#fdfdfd80] sm:border-t-8 border-t-4 border-black hover:border-yellow-400 active" class:border-yellow-400={selectedTopUp == item.caption}>
                                <img src={item.image} alt="world" class="sm:block hidden centered-image mx-auto sm:max-h-10 sm:max-w-10 md:max-h-10 md:max-w-10 lg:max-h-20 lg:max-w-20 mb-5">
                                <h1 class="font-exo-2 sm:text-2xl text-sm font-extrabold leading-normal text-[#7A7474] dark:text-white">{item.caption}</h1>
                            </div>
                        </div>
                    </button>
                  {/each}
                </div>
                {#if selectedTopUp == 'Mobile'}
                    <div class="px-2 pt-0 sm:px-10 md:px-20">
                        <div class="border-4 rounded-xl border-[#FFDA1C] mt-20">
                            <form action="" class="p-4 px-6">
                                <div class="flex md:flex-row flex-col justify-between gap-3">
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Destination country</span>
                                        <div class="relative w-full">
                                            <label class="absolute top-0 h-full w-[50px] bg-transparent rounded-md" for="country"></label>
                                            <input id="country" type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md w-full">
                                            <button class="absolute right-0 px-4 top-0 h-full text-sm bg-[#FFDA1C] rounded-md">Check</button>
                                        </div>
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Provider</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Amount</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                </div>
                                <div class="flex justify-end mt-10">
                                    <button type="button" class="px-8 top-0 h-full text-lg font-bold py-1.5 bg-[#FFDA1C] rounded-md">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                {:else if selectedTopUp == 'Internet'}
                    <div class="px-2 pt-0 sm:px-10 md:px-20">
                        <div class="border-4 rounded-xl border-[#FFDA1C] mt-20">
                            <form action="" class="p-4 px-6">
                                <div class="flex md:flex-row flex-col justify-between gap-3">
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Destination country</span>
                                        <div class="relative w-full">
                                            <label class="absolute top-0 h-full w-[50px] bg-transparent rounded-md" for="country"></label>
                                            <input id="country" type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md w-full">
                                            <button class="absolute right-0 px-4 top-0 h-full text-sm bg-[#FFDA1C] rounded-md">Check</button>
                                        </div>
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Provider</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Amount</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                </div>
                                <div class="flex justify-end mt-10">
                                    <button type="button" class="px-8 top-0 h-full text-lg font-bold py-1.5 bg-[#FFDA1C] rounded-md">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                {:else if selectedTopUp == 'Utilities'}
                    <div class="px-2 pt-0 sm:px-10 md:px-20">
                        <div class="border-4 rounded-xl border-[#FFDA1C] mt-20">
                            <form action="" class="p-4 px-6">
                                <div class="flex md:flex-row flex-col justify-between gap-3">
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Destination country</span>
                                        <div class="relative w-full">
                                            <label class="absolute top-0 h-full w-[50px] bg-transparent rounded-md" for="country"></label>
                                            <input id="country" type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md w-full">
                                            <button class="absolute right-0 px-4 top-0 h-full text-sm bg-[#FFDA1C] rounded-md">Check</button>
                                        </div>
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Provider</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Amount</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                </div>
                                <div class="flex justify-end mt-10">
                                    <button type="button" class="px-8 top-0 h-full text-lg font-bold py-1.5 bg-[#FFDA1C] rounded-md">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                {:else if selectedTopUp == 'Vouchers'}
                    <div class="container">
                    <div class="row">
                        <div class="w-full lg:flex lg:space-x-3 pt-40">
                            <div class="flex-1">
                                <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-3 gap-5 mb-8">
                        
                                {#each Array(10) as item}
                                <div class="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-sm hover:drop-shadow-xl dark:border-neutral-700 dark:bg-neutral-700/30 dark:shadow-neutral-700/70">
                                    <img class="h-auto w-full rounded-xl" src="{item.imgUrl}" alt="prod-thumb"/>
                          
                                    <div class="relative flex-1 px-4 py-2 md:px-5">
                                      <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                                        {item.name}
                                      </h3>
                                    </div>
                          
                                    <div class="flex items-end gap-1.5 transition-colors duration-300 bg-[#FFDA1C] hover:shadow-md shadow-[#FFDA1C] rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:border-brand-700 mt-1 text-sm text-black dark:text-brand-50 hover:text-white">
                                      <div class="flex flex-col gap-1 w-4/5">
                                          <span class="text-md text-black">Amount</span>
                                          <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                      </div>
                                      <button type="button">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48"><g fill="none" stroke="white" stroke-linejoin="round" stroke-width="4.25"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path stroke-linecap="round" d="m21 33l9-9l-9-9"/></g></svg>
                                      </button>
                                    </div>
                                  </div>
                                {/each}
                        
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    </div>
                
                {:else if selectedTopUp == 'Television'}
                    <div class="px-2 pt-0 sm:px-10 md:px-20">
                        <div class="border-4 rounded-xl border-[#FFDA1C] mt-20">
                            <form action="" class="p-4 px-6">
                                <div class="flex md:flex-row flex-col justify-between gap-3">
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Destination country</span>
                                        <div class="relative w-full">
                                            <label class="absolute top-0 h-full w-[50px] bg-transparent rounded-md" for="country"></label>
                                            <input id="country" type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md w-full">
                                            <button class="absolute right-0 px-4 top-0 h-full text-sm bg-[#FFDA1C] rounded-md">Check</button>
                                        </div>
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Provider</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Amount</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                </div>
                                <div class="flex justify-end mt-10">
                                    <button type="button" class="px-8 top-0 h-full text-lg font-bold py-1.5 bg-[#FFDA1C] rounded-md">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                {:else if selectedTopUp == 'Landline'}
                    <div class="px-2 pt-0 sm:px-10 md:px-20">
                        <div class="border-4 rounded-xl border-[#FFDA1C] mt-20">
                            <form action="" class="p-4 px-6">
                                <div class="flex md:flex-row flex-col justify-between gap-3">
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Destination country</span>
                                        <div class="relative w-full">
                                            <label class="absolute top-0 h-full w-[50px] bg-transparent rounded-md" for="country"></label>
                                            <input id="country" type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md w-full">
                                            <button class="absolute right-0 px-4 top-0 h-full text-sm bg-[#FFDA1C] rounded-md">Check</button>
                                        </div>
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Provider</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                    <div class="flex flex-col w-full gap-1">
                                        <span class="text-2xl font-bold dark:text-white text-black">Amount</span>
                                        <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md">
                                    </div>
                                </div>
                                <div class="flex justify-end mt-10">
                                    <button type="button" class="px-8 top-0 h-full text-lg font-bold py-1.5 bg-[#FFDA1C] rounded-md">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </section>
    <section class="container">
        <div class="row">
            <section class="mt-6 flex w-full flex-auto flex-col px-2 pt-0 sm:px-10 md:px-20">
            <HowItWorks />
    
            <div class="mb-3 flex justify-end mr-4">
                <a class="bg-brand hover:bg-brand-400 rounded-xl px-5 py-3" href="/installation-guide">
                Installation Guide
                </a>
            </div>
    
            <div class="mx-12 mt-20">
                <SectionTitle title="Related Questions" sectionClass="ml-0 !w-1/3" svgClass="!w-1/2 !stroke-brand-500"/>
    
    
                <div class="w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
                <div class="hs-accordion-group" data-hs-accordion-always-open>
                    <div class="hs-accordion active bg-white p-5 border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                    <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                        Accordion #1
                        <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"></path>
                        </svg>
                        <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"></path>
                        </svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                        <p class="text-gray-800 dark:text-neutral-200">
                        <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
                        </p>
                    </div>
                    </div>
    
                    <div class="hs-accordion bg-white p-5 border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                    <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                        Accordion #2
                        <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"></path>
                        </svg>
                        <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"></path>
                        </svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                        <p class="text-gray-800 dark:text-neutral-200">
                        <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
                        </p>
                    </div>
                    </div>
    
                    <div class="hs-accordion bg-white p-5 border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                    <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                        Accordion #3
                        <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"></path>
                        </svg>
                        <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"></path>
                        </svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                        <p class="text-gray-800 dark:text-neutral-200">
                        <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
    
            </div>
    
            </section>
        </div>
    </section>
</main>