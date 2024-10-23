<script>
  export let category;
</script>

<main class="grid grid-cols-subgrid col-span-4 lg:grid-cols-5 grid-cols-5 gap-3 mb-8 px-2 flex-wrap">

  {#each category as item, index}
    <a class="flex flex-col group bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-lg focus:outline-none focus:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" href="/">
      <div class="relative bg-white shadow-md rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 overflow-hidden">
        {#if (index%2 == 0)}
          <img class="w-full h-56 rounded-xl group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out" src={item.imgUrl} alt="card-thumb" />
        {:else if (index%3 == 0)}
          <img class="w-full h-56 rounded-xl group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out" src={item.imgUrl} alt="card-thumb" />
        {:else}
          <img class="w-full h-56 rounded-xl group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out" src={item.imgUrl} alt="card-thumb" />
        {/if}

        <div class="absolute bottom-0 start-0 end-0">
          <div class="bg-black/70 group-hover:bg-brand-400 rounded-b-xl py-3 px-4 md:py-4 md:px-5 text-white group-hover:text-black dark:bg-neutral-900/90 dark:border-neutral-700 text-gray-500 dark:text-neutral-500 font-semibold text-center">
            {item.title}
          </div>
        </div>
      </div>
    </a>
  {/each}

</main>
