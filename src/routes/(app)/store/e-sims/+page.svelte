<script>
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
  import HowItWorks from '$partials/home/HowItWorks.svelte';
	import SectionTitle from '$partials/SectionTitle.svelte';

  export let data;

  $: ({e_sim} = data);
</script>

<main>
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

    <div class="flex flex-col justify-center pb-10 md:px-20 sm:px-10 px-2 mt-20 sm:w-4/5 mx-auto">
      <SectionTitle title="Popular Destinations:" sectionClass="ml-0" svgClass="!w-1/2 !stroke-brand-500"/>

      <main class="flex-1">
        <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-3 gap-5 mb-8">

          {#each e_sim.available_esim as item}
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
                    <input type="text" class="border border-black/30 focus:border-[#FFDA1C] rounded-md" placeholder={item.placeholder}>
                </div>
                <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48"><g fill="none" stroke="white" stroke-linejoin="round" stroke-width="4.25"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path stroke-linecap="round" d="m21 33l9-9l-9-9"/></g></svg>
                </button>
              </div>
            </div>
          {/each}

        </div>
      </main>

      <div class="flex flex-row-reverse">
        <button class="bg-brand hover:bg-brand-400 rounded-xl px-5 py-3">
          <span class="">Available E-sims</span>
        </button>
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
                {#each e_sim.faq as item}
                  <div class="hs-accordion bg-white p-5 border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                    <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                      {item.title}
                      <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                      <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"></path>
                      </svg>
                    </button>
                    <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                      <p class="text-gray-800 dark:text-neutral-200">
                        <em>{item.description}
                      </p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
  
          </div>
  
        </section>
    </div>
  </section>
</main>
