<aside class="hidden lg:block lg:w-1/3">
  <div class="mb-[30px] hidden w-full overflow-y-scroll rounded-2xl bg-white px-[30px] pt-[40px] shadow lg:block lg:overflow-y-auto dark:bg-neutral-700/30 dark:text-slate-200">
    <div class="flex flex-col">
      <div class="relative max-w-sm space-y-3">
        <input
          type="text"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-brand-500 disabled:pointer-events-none
              disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder="Search products" />

        <div class="pointer-events-none absolute inset-y-0 end-0 !mt-0 flex items-center pe-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
          <svg
            class="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M20.2 20.2l1.8 1.8" />
          </svg>
        </div>
      </div>

      <div class="mt-5 flex justify-around">
        <button
          type="button"
          class="inline-flex items-center rounded-lg border border-transparent bg-brand px-5 py-1.5 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          MasterCard
        </button>
        <button
          type="button"
          class="inline-flex items-center rounded-lg border border-transparent bg-brand px-5 py-1.5 font-medium text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          Subscriptions
        </button>
      </div>
    </div>

    <div class="py-6">
      <div class="mb-1"><h1 class="font-500 text-base text-black">Product categories</h1></div>

      <div class="filter-items">
        <ul>
          <li class="item mb-5 flex items-center justify-between">
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
          </li>
        </ul>
      </div>
    </div>
  </div>

  <a
    class="group mt-5 block rounded-2xl p-12 transition hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-sm hover:drop-shadow-xl focus:-translate-y-1 focus:translate-x-1 focus:scale-[1.025] focus:shadow-sm focus:outline-none focus:drop-shadow-xl xl:-ms-3 xl:me-3"
    href="/store">
    <div class="rounded-2xl bg-white dark:bg-neutral-900">
      <enhanced:img class="rounded-lg dark:hidden" src="$lib/images/buy-with-binance.webp?enhance" alt="shop-sidebar-img-thumb" />
      <enhanced:img class="hidden rounded-lg dark:block" src="$lib/images/buy-with-binance.webp?enhance" alt="shop-sidebar-img-thumb" />
    </div>
  </a>
</aside>
