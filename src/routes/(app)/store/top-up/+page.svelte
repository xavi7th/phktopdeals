<script>
  // @ts-nocheck

  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import HowItWorks from "$partials/home/HowItWorks.svelte";
  import SectionTitle from "$partials/SectionTitle.svelte";
  import { favoriteIcon, maximizeIcon } from "$lib/Components/iconPaths";

  import Mobile from "$lib/images/icons/mobile.svg";
  import Global from "$lib/images/icons/global.svg";
  import Utilities from "$lib/images/icons/utilities.svg";
  import GiftCards from "$lib/images/icons/GiftCards.svg";
  import Television from "$lib/images/icons/television.svg";
  import Landline from "$lib/images/icons/landline.svg";

  let selectedTopUp = "Mobile";

  const topUps = [
    {
      caption: "Mobile",
      image: Mobile,
      size: "default",
    },
    {
      caption: "Internet",
      image: Global,
      size: 50,
    },
    {
      caption: "Utilities",
      image: Utilities,
      size: 40,
    },
    {
      caption: "Vouchers",
      image: GiftCards,
      size: 40,
    },
    {
      caption: "Television",
      image: Television,
      size: 40,
    },
    {
      caption: "Landline",
      image: Landline,
      size: 40,
    },
  ];
</script>

<main>
  <section class="bg-gradient-to-l from-yellow-200 py-28 lg:py-40">
    <div class="container">
      <div class="row">
        <div class="grid grid-cols-3 gap-2 px-2 pt-0 sm:gap-10 sm:px-10 md:px-20 lg:grid-cols-6">
          {#each topUps as item (item.caption)}
            <button type="button" class="item-wrapper ng-star-inserted block w-full sm:w-10/12" on:click={() => (selectedTopUp = item.caption)}>
              <div class="item w-full">
                <div
                  class="card active flex h-12 flex-col items-center justify-center rounded-2xl border-t-4 border-black bg-[#fdfdfd80] hover:border-yellow-400 sm:h-40 sm:rounded-3xl sm:border-t-8"
                  class:border-yellow-400={selectedTopUp == item.caption}>
                  <img src={item.image} alt="world" class="centered-image mx-auto mb-5 hidden sm:block sm:max-h-10 sm:max-w-10 md:max-h-10 md:max-w-10 lg:max-h-20 lg:max-w-20" />
                  <h1 class="font-exo-2 text-sm font-extrabold leading-normal text-[#7A7474] sm:text-2xl dark:text-white">{item.caption}</h1>
                </div>
              </div>
            </button>
          {/each}
        </div>
        {#if selectedTopUp == "Mobile"}
          <div class="px-2 pt-0 sm:px-10 md:px-20">
            <div class="mt-20 rounded-xl border-4 border-[#FFDA1C]">
              <form action="" class="p-4 px-6">
                <div class="flex flex-col justify-between gap-3 md:flex-row">
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Destination country</span>
                    <div class="relative w-full">
                      <label class="absolute top-0 h-full w-[50px] rounded-md bg-transparent" for="country"></label>
                      <input id="country" type="text" class="w-full rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                      <button class="absolute right-0 top-0 h-full rounded-md bg-[#FFDA1C] px-4 text-sm">Check</button>
                    </div>
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Provider</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Amount</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                </div>
                <div class="mt-10 flex justify-end">
                  <button type="button" class="top-0 h-full rounded-md bg-[#FFDA1C] px-8 py-1.5 text-lg font-bold">Next</button>
                </div>
              </form>
            </div>
          </div>
        {:else if selectedTopUp == "Internet"}
          <div class="px-2 pt-0 sm:px-10 md:px-20">
            <div class="mt-20 rounded-xl border-4 border-[#FFDA1C]">
              <form action="" class="p-4 px-6">
                <div class="flex flex-col justify-between gap-3 md:flex-row">
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Destination country</span>
                    <div class="relative w-full">
                      <label class="absolute top-0 h-full w-[50px] rounded-md bg-transparent" for="country"></label>
                      <input id="country" type="text" class="w-full rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                      <button class="absolute right-0 top-0 h-full rounded-md bg-[#FFDA1C] px-4 text-sm">Check</button>
                    </div>
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Provider</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Amount</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                </div>
                <div class="mt-10 flex justify-end">
                  <button type="button" class="top-0 h-full rounded-md bg-[#FFDA1C] px-8 py-1.5 text-lg font-bold">Next</button>
                </div>
              </form>
            </div>
          </div>
        {:else if selectedTopUp == "Utilities"}
          <div class="px-2 pt-0 sm:px-10 md:px-20">
            <div class="mt-20 rounded-xl border-4 border-[#FFDA1C]">
              <form action="" class="p-4 px-6">
                <div class="flex flex-col justify-between gap-3 md:flex-row">
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Destination country</span>
                    <div class="relative w-full">
                      <label class="absolute top-0 h-full w-[50px] rounded-md bg-transparent" for="country"></label>
                      <input id="country" type="text" class="w-full rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                      <button class="absolute right-0 top-0 h-full rounded-md bg-[#FFDA1C] px-4 text-sm">Check</button>
                    </div>
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Provider</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Amount</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                </div>
                <div class="mt-10 flex justify-end">
                  <button type="button" class="top-0 h-full rounded-md bg-[#FFDA1C] px-8 py-1.5 text-lg font-bold">Next</button>
                </div>
              </form>
            </div>
          </div>
        {:else if selectedTopUp == "Vouchers"}
          <div class="container">
            <div class="row">
              <div class="w-full pt-40 lg:flex lg:space-x-3">
                <div class="flex-1">
                  <div class="mb-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-3">
                    {#each Array(10) as item}
                      <div
                        class="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-sm hover:drop-shadow-xl dark:border-neutral-700 dark:bg-neutral-700/30 dark:shadow-neutral-700/70">
                        <img class="h-auto w-full rounded-xl" src={item.imgUrl} alt="prod-thumb" />

                        <div class="relative flex-1 px-4 py-2 md:px-5">
                          <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                            {item.name}
                          </h3>
                        </div>

                        <div
                          class="mt-1 flex items-end gap-1.5 rounded-b-xl bg-[#FFDA1C] px-4 py-3 text-sm text-black shadow-[#FFDA1C] transition-colors duration-300 hover:text-white hover:shadow-md md:px-5 md:py-4 dark:border-brand-700 dark:text-brand-50">
                          <div class="flex w-4/5 flex-col gap-1">
                            <span class="text-md text-black">Amount</span>
                            <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                          </div>
                          <button type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48">
                              <g fill="none" stroke="white" stroke-linejoin="round" stroke-width="4.25">
                                <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                                <path stroke-linecap="round" d="m21 33l9-9l-9-9" />
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else if selectedTopUp == "Television"}
          <div class="px-2 pt-0 sm:px-10 md:px-20">
            <div class="mt-20 rounded-xl border-4 border-[#FFDA1C]">
              <form action="" class="p-4 px-6">
                <div class="flex flex-col justify-between gap-3 md:flex-row">
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Destination country</span>
                    <div class="relative w-full">
                      <label class="absolute top-0 h-full w-[50px] rounded-md bg-transparent" for="country"></label>
                      <input id="country" type="text" class="w-full rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                      <button class="absolute right-0 top-0 h-full rounded-md bg-[#FFDA1C] px-4 text-sm">Check</button>
                    </div>
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Provider</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Amount</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                </div>
                <div class="mt-10 flex justify-end">
                  <button type="button" class="top-0 h-full rounded-md bg-[#FFDA1C] px-8 py-1.5 text-lg font-bold">Next</button>
                </div>
              </form>
            </div>
          </div>
        {:else if selectedTopUp == "Landline"}
          <div class="px-2 pt-0 sm:px-10 md:px-20">
            <div class="mt-20 rounded-xl border-4 border-[#FFDA1C]">
              <form action="" class="p-4 px-6">
                <div class="flex flex-col justify-between gap-3 md:flex-row">
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Destination country</span>
                    <div class="relative w-full">
                      <label class="absolute top-0 h-full w-[50px] rounded-md bg-transparent" for="country"></label>
                      <input id="country" type="text" class="w-full rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                      <button class="absolute right-0 top-0 h-full rounded-md bg-[#FFDA1C] px-4 text-sm">Check</button>
                    </div>
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Provider</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                  <div class="flex w-full flex-col gap-1">
                    <span class="text-2xl font-bold text-black dark:text-white">Amount</span>
                    <input type="text" class="rounded-md border border-black/30 focus:border-[#FFDA1C]" />
                  </div>
                </div>
                <div class="mt-10 flex justify-end">
                  <button type="button" class="top-0 h-full rounded-md bg-[#FFDA1C] px-8 py-1.5 text-lg font-bold">Next</button>
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

        <div class="mb-3 mr-4 flex justify-end">
          <a class="rounded-xl bg-brand px-5 py-3 hover:bg-brand-400" href="/installation-guide">Installation Guide</a>
        </div>

        <div class="mx-12 mt-20">
          <SectionTitle title="Related Questions" sectionClass="ml-0 !w-1/3" svgClass="!w-1/2 !stroke-brand-500" />

          <div class="w-full rounded-lg bg-white shadow-md dark:bg-neutral-800">
            <div class="hs-accordion-group" data-hs-accordion-always-open>
              <div class="hs-accordion active -mt-px border bg-white p-5 first:rounded-t-lg last:rounded-b-lg dark:border-neutral-700 dark:bg-neutral-800" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                <button
                  class="hs-accordion-toggle inline-flex w-full items-center justify-between gap-x-3 rounded-lg py-3 text-start font-semibold text-gray-800 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-50 hs-accordion-active:text-blue-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 dark:focus:outline-none dark:hs-accordion-active:text-blue-500"
                  aria-expanded="true"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                  Accordion #1
                  <svg
                    class="block size-4 hs-accordion-active:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                  <svg
                    class="hidden size-4 hs-accordion-active:block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"></path>
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                  class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                  <p class="text-gray-800 dark:text-neutral-200">
                    <em>This is the third item's accordion body.</em>
                    It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
                    transitions.
                  </p>
                </div>
              </div>

              <div class="hs-accordion -mt-px border bg-white p-5 first:rounded-t-lg last:rounded-b-lg dark:border-neutral-700 dark:bg-neutral-800" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                <button
                  class="hs-accordion-toggle inline-flex w-full items-center justify-between gap-x-3 rounded-lg py-3 text-start font-semibold text-gray-800 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-50 hs-accordion-active:text-blue-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 dark:focus:outline-none dark:hs-accordion-active:text-blue-500"
                  aria-expanded="false"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                  Accordion #2
                  <svg
                    class="block size-4 hs-accordion-active:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                  <svg
                    class="hidden size-4 hs-accordion-active:block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"></path>
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                  class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                  <p class="text-gray-800 dark:text-neutral-200">
                    <em>This is the third item's accordion body.</em>
                    It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
                    transitions.
                  </p>
                </div>
              </div>

              <div class="hs-accordion -mt-px border bg-white p-5 first:rounded-t-lg last:rounded-b-lg dark:border-neutral-700 dark:bg-neutral-800" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                <button
                  class="hs-accordion-toggle inline-flex w-full items-center justify-between gap-x-3 rounded-lg py-3 text-start font-semibold text-gray-800 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-50 hs-accordion-active:text-blue-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 dark:focus:outline-none dark:hs-accordion-active:text-blue-500"
                  aria-expanded="false"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                  Accordion #3
                  <svg
                    class="block size-4 hs-accordion-active:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                  <svg
                    class="hidden size-4 hs-accordion-active:block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"></path>
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                  class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                  <p class="text-gray-800 dark:text-neutral-200">
                    <em>This is the third item's accordion body.</em>
                    It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
                    transitions.
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
