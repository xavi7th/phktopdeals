<script>
	import Sidebar from '$partials/gift-cards/Sidebar.svelte';
	import { favoriteIcon, maximiseIcon } from '$lib/Components/iconPaths';
  import { percentageCalculation } from '$lib/helpers';

  export let data;

  $: ({gift_cards} = data)
</script>

<div class="container">
  <div class="row">

    <div class="w-full lg:flex lg:space-x-3 pt-40">
      <Sidebar />

      <main class="flex-1">
        <div class="grid lg:grid-cols-3 grid-cols-1 xl:gap-3 gap-5 mb-8">

          {#each gift_cards as item}
            <div class="group overflow-hidden relative flex flex-col bg-white shadow rounded-xl dark:bg-neutral-700/30 dark:border-neutral-700 dark:shadow-neutral-700/70 transition hover:drop-shadow-xl hover:shadow-sm hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025]">
              <img class="w-full h-auto rounded-t-xl" src={item.imgUrl} alt={item.name}>

              <div class="px-4 md:px-5 py-2 md:py-3 flex-1">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white border-b-2 pb-3 mb-5">{item.name}</h3>

                <div class="flex flex-wrap items-start gap-1.5">
                  {#each item.price_tags.denominations as denomination}
                    <span class="inline-flex items-center py-1 px-2 rounded-full text-xs bg-brand-200 text-brand-900 dark:bg-brand-800/30 dark:text-brand-400">{percentageCalculation(denomination, item.price_tags.commission)} USDT</span>
                  {/each}
                </div>
              </div>

              <div class="flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                <a href="#"><span class="w-10 h-10 flex justify-center items-center bg-gray-100/80 hover:bg-brand-200/80 rounded">{@html maximiseIcon }</span></a>
                <a href="#"><span class="w-10 h-10 flex justify-center items-center bg-gray-100/80 hover:bg-brand-200/80 rounded">{@html favoriteIcon }</span></a>
              </div>

              <a href={item.url} class="transition-colors duration-300 bg-brand hover:bg-brand-500 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-brand-900 dark:border-brand-700 mt-1 text-sm text-black dark:text-brand-50 hover:text-white text-center">
                ADD TO CART
              </a>
            </div>
          {/each}

        </div>
      </main>
    </div>

  </div>
</div>
