<aside class="hidden lg:block lg:w-1/3">

  <div class="w-full overflow-y-scroll lg:overflow-y-auto bg-white dark:bg-neutral-700/30 dark:text-slate-200 px-[30px] pt-[40px] mb-[30px] hidden lg:block rounded-2xl shadow">
    <div class="flex flex-col">
      <div class="max-w-sm space-y-3 relative">
        <input type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50
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

      <div class="flex justify-around mt-5">
        <button type="button" class="py-1.5 px-5 inline-flex items-center font-medium rounded-lg border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none">
          MasterCard
        </button>
        <button type="button" class="py-1.5 px-5 inline-flex items-center font-medium rounded-lg border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none">
          Subscriptions
        </button>
      </div>
    </div>


    <div class="py-6">
      <div class="mb-1"><h1 class="text-black text-base font-500">Product categories</h1></div>

      <div class="filter-items">
        <ul>
          <li class="item flex justify-between items-center mb-5">
            <div class="flex space-x-[14px] items-center">
              <div>
                <div><input id="mobileLaptop" class="focus:outline-brand-500 accent-brand-500" type="checkbox" /></div>
              </div>
              <div><label for="mobileLaptop" class="text-xs font-black font-400 capitalize">Mobile &amp; Laptops</label></div>
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

  <a class="p-12 mt-5 xl:-ms-3 xl:me-3 group block rounded-2xl transition hover:drop-shadow-xl hover:shadow-sm hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] focus:outline-none focus:drop-shadow-xl focus:shadow-sm focus:-translate-y-1 focus:translate-x-1 focus:scale-[1.025]" href="/store">
    <div class="bg-white rounded-2xl dark:bg-neutral-900">
      <enhanced:img class="dark:hidden rounded-lg" src="$lib/images/buy-with-binance.webp?enhance" alt="shop-sidebar-img-thumb" />
      <enhanced:img class="dark:block hidden rounded-lg" src="$lib/images/buy-with-binance.webp?enhance" alt="shop-sidebar-img-thumb" />
    </div>
  </a>

</aside>
