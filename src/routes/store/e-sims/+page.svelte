<script>
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
  import HowItWorks from '$partials/home/HowItWorks.svelte';
	import SectionTitle from '$partials/SectionTitle.svelte';

</script>

<main class="container">
  <div class="row">
      <section class="bg-gradient-to-l from-yellow-200 py-28 lg:py-40">
        <div class="background mx-auto max-w-screen-sm">
          <h1 class="text-6xl text-brand-500 sm:text-4xl font-bold mb-4">Stay Connected</h1>
          <p class="text-2xl font-bold text-gray-500"> wherever you travel, at affordable rates </p>

          <div class="mt-10 flex flex-col sm:w-full md:w-full lg:w-4/5">
            <div class="space-y-3 relative w-full mb-0.5">
              <input type="text" class="py-3 px-4 block w-full border-gray-300 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50
                    disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Search products">

              <div class="absolute inset-y-0 end-0 !mt-0 flex items-center pointer-events-none pe-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414" />
                  <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M20.2 20.2l1.8 1.8" />
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2 mt-2">
              <button type="button" class="py-1.5 px-5 font-medium rounded-lg drop-shadow-xl shadow-sm shadow-black/70 text-gray-600 focus:outline-none bg-transparent hover:bg-brand-300 focus:bg-brand-300 disabled:opacity-50 disabled:pointer-events-none">
                MasterCard
              </button>
              <button type="button" class="py-1.5 px-5 font-medium rounded-lg drop-shadow-xl shadow-sm shadow-black/70 text-gray-600 focus:outline-none bg-transparent hover:bg-brand-300 focus:bg-brand-300 disabled:opacity-50 disabled:pointer-events-none">
                Subscriptions
              </button>
              <button type="button" class="py-1.5 px-5 font-medium rounded-lg drop-shadow-xl shadow-sm shadow-black/70 text-gray-600 focus:outline-none bg-transparent hover:bg-brand-300 focus:bg-brand-300 disabled:opacity-50 disabled:pointer-events-none">
                Subscriptions
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center pb-10 md:px-20 sm:px-10 px-2 mt-20 w-4/5 mx-auto">
          <SectionTitle title="Popular Destinations:" sectionClass="ml-0" svgClass="!w-1/2 !stroke-brand-500"/>

          <div class="grid sm:grid-cols-4 grid-cols-3 gap-4 justify-center">

            {#each [1,2,3,4,5] as n}
              <a href="/" class="h-14 bg-transparent hover:bg-brand-200 border-2 border-brand-600 rounded-xl shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="relative w-1/3 overflow-hidden rounded-s-lg">
                  <enhanced:img class="size-full absolute top-0 start-0 object-cover" src="$lib/images/flags/uk.svg?h=200" alt="hero-img-thumb" />
                </div>
                <div class="h-full inline-flex flex-1 items-center pl-3">
                  <h3 class="text-lg font-bold text-gray-600/90 dark:text-gray-100 p3 sm:p5 sm:pr-1">
                    UK
                  </h3>
                </div>
              </a>
            {/each}

          </div>

          <div class="flex flex-row-reverse">
            <button class="bg-brand hover:bg-brand-400 rounded-xl px-5 py-3">
              <span class="">Show all destinations </span>
            </button>
          </div>
        </div>
      </section>


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
</main>
