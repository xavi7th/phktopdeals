<script>
    let regionSelectOptions = `{
    "hasSearch": false,
    "searchPlaceholder": "Search...",
    "searchClasses": "block text-sm border-gray-200 rounded-lg focus:border-brand-500 focus:ring-brand-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
    "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
    "placeholder": "10",
    "toggleTag": "<button type='button' aria-expanded='false'><span class='me-2' data-icon></span><span class='text-gray-800 dark:text-neutral-200' data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full lg:w-72 flex-initial cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600 focus:border-brand-500",
    "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
    "optionTemplate": "<div><div class='flex items-center'><div class='me-2' data-icon></div><div class='text-gray-800 dark:text-neutral-200' data-title></div></div></div>",
    "extraMarkup": "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
  }`;
</script>

<div class="sm:mx-10 bg-white dark:bg-[#404040] sm:mt-28 mb-28 rounded-xl shadow-lg p-10 px-4">
    <h1 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Verify Account</h1>
    <div class="flex justify-between items-center gap-4 px-6 mt-10 text-slate-800 dark:text-slate-200">
        <div class="flex items-center gap-2">
            <p class="grid place-content-center size-6 text-sm bg-[#FFDA1C] rounded-full">1</p>
            <span class="text-sm">ID document</span>
        </div>
        <hr class="flex-1" />
        <div class="flex items-center gap-2">
            <p class="grid place-content-center size-6 text-sm bg-[#64748b] rounded-full">2</p>
            <span class="text-sm">Proof of address</span>
        </div>
        <hr class="flex-1" />
        <div class="flex items-center gap-2">
            <p class="grid place-content-center size-6 text-sm bg-[#64748b] rounded-full">3</p>
            <span class="text-sm">Done</span>
        </div>
    </div>
    <div class="mt-8 sm:px-10 pb-12 text-slate-800 dark:text-slate-200">
        <div class="rounded-xl border border-dashed p-6 pb-12">
            <div class="flex flex-col items-center">
                <!-- <input type="text" name="" id="" class="block w-full border rounded-xl text-center"> -->
                <select id="region-select" data-hs-select={regionSelectOptions} class="hidden" value="Drivers License">
                    <option value="ID card">ID card</option>
                    <option value="Drivers License">Drivers License</option>
                </select>
                <span class="text-xs">Only image/PDF file are accepted ( Max size 1MB )</span>
            </div>
            <div class="flex flex-col items-center justify-center mt-8">
                <div class="size-20 rounded-full border"></div>
                <span class="text-[#FFDA1C]">Drage & Drop</span>
                <span>Or</span>
                <label class="block p-6 py-2.5 bg-[#FFDA1C] rounded-full shadow-md text-sm text-[#713f12] border border-transparent hover:bg-brand-500 focus:outline-none focus:bg-brand-500 disabled:opacity-50 disabled:pointer-events-none text-nowrap">
                    Browse File
                    <input type="file" class="hidden">
                </label>
            </div>
        </div>
    </div>
</div>