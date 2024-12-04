<script>
  export let category;
</script>

<main class="col-span-4 mb-8 grid grid-cols-5 grid-cols-subgrid flex-wrap gap-3 px-2 lg:grid-cols-5">
  {#each category as item, index}
    <a
      class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg focus:shadow-lg focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70"
      href="/">
      <div class="relative overflow-hidden rounded-xl bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70">
        {#if index % 2 == 0}
          <img class="h-56 w-full rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105" src={item.imgUrl} alt="card-thumb" />
        {:else if index % 3 == 0}
          <img class="h-56 w-full rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105" src={item.imgUrl} alt="card-thumb" />
        {:else}
          <img class="h-56 w-full rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105" src={item.imgUrl} alt="card-thumb" />
        {/if}

        <div class="absolute bottom-0 end-0 start-0">
          <div
            class="rounded-b-xl bg-black/70 px-4 py-3 text-center font-semibold text-gray-500 text-white group-hover:bg-brand-400 group-hover:text-black md:px-5 md:py-4 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-500">
            {item.title}
          </div>
        </div>
      </div>
    </a>
  {/each}
</main>
