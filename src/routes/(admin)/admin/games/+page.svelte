<script>
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import ProductListings from "../ProductListings.svelte";
  import { plusIcon, search } from "$lib/Components/iconPaths";

  export let data;

  $: ({ cards, meta } = data);
</script>

<!-- {#if $message}
  <div class="fixed top-24 end-3 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}/>
  </div>
{/if} -->

<div class="col-span-5 lg:col-span-4 lg:col-start-2">
  <div class="space-y-4 p-4 sm:space-y-6 sm:p-6">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="inline-block min-w-full p-1.5 align-middle">
          <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <div class="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">Games</h2>
                <p class="text-sm text-gray-600 dark:text-neutral-400">Add games, edit and more.</p>
              </div>

              <div class="px-4 py-3">
                <div class="relative max-w-xs">
                  <label for="hs-table-search" class="sr-only">Search</label>
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    class="block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Search for items" />
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <SvgIcon class="size-4 text-gray-400 dark:text-neutral-500" slot={search} />
                  </div>
                </div>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <a
                    class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    href="/admin/games/create">
                    {@html plusIcon}
                    Add Games
                  </a>
                </div>
              </div>
            </div>

            <ProductListings products={cards} {meta} basePageUrl="/admin/games" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
