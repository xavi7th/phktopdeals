<script>
      let platformSelectOptions = `{
        "hasSearch": true,
        "searchPlaceholder": "Search...",
        "searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-brand-500 focus:ring-brand-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
        "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
        "placeholder": "Select Platform ...",
        "toggleTag": "<button type='button' aria-expanded='false'><span class='me-2' data-icon></span><span class='text-gray-800 dark:text-neutral-200' data-title></span></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full lg:w-72 flex-initial cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600 focus:border-brand-500",
        "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
        "optionTemplate": "<div><div class='flex items-center'><div class='me-2' data-icon></div><div class='text-gray-800 dark:text-neutral-200' data-title></div></div></div>",
        "extraMarkup": "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
    }`;
</script>

<div class="container py-28 lg:py-40 px-4">
    <div>
      <main class="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
        <div class="w-full px-40">
            <div class="">
                <enhanced:img class="w-full h-auto rounded-xl" src="$lib/images/games-6.avif?aspect=400:320&fit=cover" alt="hero-img-thumb" />
            </div>
        </div>
        <div class="w-full bg-green-400">
            <div>
                <div class="title font-black" style="font-size: 40px; font-weight: bold;">The Title</div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi maiores deleniti ullam distinctio velit tenetur quo, dolorem reiciendis. Consequatur placeat ipsum corrupti optio, iste delectus. Veniam modi laborum odio alias? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi maiores deleniti ullam distinctio velit tenetur quo, dolorem reiciendis. Consequatur placeat ipsum corrupti optio, iste delectus. Veniam modi laborum odio alias?</p>
                <br>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi maiores deleniti ullam distinctio velit tenetur quo, dolorem reiciendis. Consequatur placeat ipsum corrupti optio, iste delectus. Veniam modi laborum odio alias?</p>
            </div>
        </div>
      </main>
    </div>
    <div class="bg-brand-100 p-4 rounded-lg">
        <div class="flex sm:flex-row flex-col sm:gap-4 gap-2">
            <div class="space-y-3 relative w-full">
                <input type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-brand-500 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search products">
            
                <div class="absolute inset-y-0 end-0 !mt-0 flex items-center pointer-events-none pe-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414" />
                    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M20.2 20.2l1.8 1.8" />
                  </svg>
                </div>
            </div>
            <select id="platform-select" data-hs-select={platformSelectOptions} class="hidden">
                <option value="">Choose</option>
                <option value="AF" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/af.png' alt='Af' />"}`}'>
                  Steam
                </option>
                <option value="AX" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/ax.png' alt='AI' />"}`}'>
                  EA Games
                </option>
                <option value="AL" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/al.png' alt='Al' />"}`}'>
                  Battle.net
                </option>
                <option value="DZ" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/dz.png' alt='Alg' />"}`}'>
                  Ubisoft
                </option>
                <option value="AS" data-hs-select-option='{`{"icon": "<img class='inline-block size-4 rounded-full' src='../assets/vendor/svg-country-flags/png100px/as.png' alt='AS' />"}`}'>
                  American Samoa
                </option>
            </select>
            <button type="button" class="py-1.5 px-5 inline-flex items-center font-medium rounded-lg border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none" style="width: 200px; justify-content: center;">
                Add To Cart
            </button>
        </div>
        <div class="py-2 md:py-3 flex-1 mt-4">

            <div class="flex flex-wrap items-start gap-1.5 border-t-2 pt-3">
              {#each Array(10) as item}
                <span class="inline-flex items-center py-1 px-2 rounded-full text-sm bg-brand-200 text-brand-900 dark:bg-brand-800/30 dark:text-brand-400">10 USDT</span>
              {/each}
            </div>
        </div>
    </div>
</div>
  