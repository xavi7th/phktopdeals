<script>
  import { page } from "$app/state";
  import { debounce } from "$lib/helpers";
  import { afterNavigate } from "$app/navigation";
  import { main_nav } from "$partials/Header.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { filterFunnel, plus } from "$lib/Components/iconPaths";

  /** @type { HTMLFormElement } */
  let form;
  let url = "";
  let searchQuery = "";

  afterNavigate(() => {
    url = window.location.origin + window.location.pathname;
  });

  const sendQuery = debounce(() => {
    if (searchQuery) {
      form.requestSubmit();
    }
  }, 1500);
</script>

<aside class="hidden pr-4 md:block md:w-4/12 lg:w-3/12">
  <div class="mb-[30px] hidden w-full overflow-y-scroll rounded-2xl bg-white px-[30px] pt-[40px] shadow md:block md:overflow-y-auto dark:bg-neutral-700/30 dark:text-slate-200">
    <div class="flex flex-col">
      <div class="relative max-w-sm space-y-3">
        <form action={url} method="GET" bind:this={form}>
          <input
            type="search"
            bind:value={searchQuery}
            on:input={sendQuery}
            name="s"
            class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-brand-500 disabled:pointer-events-none
                disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Search products" />

          <div class="pointer-events-none absolute inset-y-0 end-0 !mt-0 flex items-center pe-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            <SvgIcon class="size-4 shrink-0 text-gray-500 dark:text-neutral-500" slot={filterFunnel} />
          </div>
        </form>
      </div>

      <!-- <div class="mt-5 flex justify-around">
        <button
          type="button"
          class="inline-flex items-center rounded-lg border border-transparent bg-brand px-5 py-1.5 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          MasterCard
        </button>
      </div> -->
    </div>

    <div class="py-6">
      <div class="mb-1"><h1 class="font-500 text-base text-black dark:text-gray-500">Product Categories</h1></div>

      <div class="filter-items">
        <ul>
          <li class="item mb-5 flex items-center justify-between">
            <div class="flex items-center space-x-[14px]">
              <div>
                <a
                  class="p-3.5 capitalize tracking-tighter text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-gray-300 dark:hover:text-gray-500 dark:focus:text-gray-500"
                  href="/store/products"
                  aria-current={page.url.pathname == "/store/products" ? "page" : undefined}>
                  All Products
                </a>
              </div>
            </div>
            <SvgIcon strokeWidth={3.5} class="size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" slot={plus} />
          </li>
          {#each main_nav as { name, url }}
            <li class="item mb-5 flex items-center justify-between">
              <div class="flex items-center space-x-[14px]">
                <div>
                  <a
                    class="p-3.5 capitalize tracking-tighter text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-gray-300 dark:hover:text-gray-500 dark:focus:text-gray-500"
                    href={url}
                    aria-current={page.url.pathname.includes(url) ? "page" : undefined}>
                    {name}
                  </a>
                </div>
              </div>
              <SvgIcon strokeWidth={3.5} class="size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" slot={plus} />
            </li>
          {/each}
          <!-- <li class="item mb-5 flex items-center justify-between">
            <div class="flex items-center space-x-[14px]">
              <div>
                <div><input id="mobileLaptop" class="accent-brand-500 focus:outline-brand-500" type="checkbox" /></div>
              </div>
              <div><label for="mobileLaptop" class="font-400 text-xs font-black capitalize">Mobile &amp; Laptops</label></div>
            </div>
            <div>
              <span class="cursor-pointer">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="4" width="10" height="2" fill="#C4C4C4"></rect>
                  <rect x="6" width="10" height="2" transform="rotate(90 6 0)" fill="#C4C4C4"></rect>
                </svg>
              </span>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</aside>
