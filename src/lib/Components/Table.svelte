<script>
    let regionSelectOptions = `{
    "hasSearch": false,
    "searchPlaceholder": "Search...",
    "searchClasses": "block text-sm border-gray-200 rounded-lg focus:border-brand-500 focus:ring-brand-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
    "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
    "placeholder": "10",
    "toggleTag": "<button type='button' aria-expanded='false'><span class='me-2' data-icon></span><span class='text-gray-800 dark:text-neutral-200' data-title></span></button>",
    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full lg:w-20 flex-initial cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600 focus:border-brand-500",
    "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
    "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
    "optionTemplate": "<div><div class='flex items-center'><div class='me-2' data-icon></div><div class='text-gray-800 dark:text-neutral-200' data-title></div></div></div>",
    "extraMarkup": "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500 dark:text-neutral-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
  }`;
</script>

<div class="sm:mx-10 bg-white dark:bg-[#404040] mt-7 rounded-xl shadow-lg overflow-hidden">
    <div class="flex sm:flex-row flex-col gap-5 items-center sm:px-10 px-5 py-7 pb-9 border-b border-[#00000020]">
        <div class="flex sm:w-[280px] w-full">
            <input type="date" name="" id="" class="block w-full border rounded-xl">
        </div>
        <div class="flex sm:w-[280px] w-full">
            <input type="date" name="" id="" class="block w-full border rounded-xl">
        </div>
        <div class="flex h-full sm:w-auto w-full">
            <button type="button" class="flex items-center justify-center gap-2 p-2 py-2.5 px-5 border rounded-xl h-full text-sm text-[#FFDA1C] hover:bg-[#FFDA1C10] sm:w-auto w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 15 15"><path fill="none" stroke="#FFDA1C" d="m8.5 8.5l2 2M7 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5Zm.5 5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"></path></svg>
                Search
            </button>
        </div>
    </div>
    <div class="flex gap-7 sm:px-10 px-5 items-center py-3 border-b border-[#00000020] text-slate-800 dark:text-slate-100">
        <p class="text-xs">Items per page</p>
        <div class="flex w-[70px]">
            <!-- <input type="text" name="" id="" class="block w-full border rounded-xl text-center"> -->
            <select id="region-select" data-hs-select={regionSelectOptions} class="hidden" value="10">
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
        </div>
        <p class="text-xs">0 of 0</p>
        <div class="flex gap-5">

        </div>
    </div>
    <div class="overflow-auto">
        <table class="w-full min-w-[700px] text-center">
            <tr class="h-14 text-slate-800 dark:text-slate-100">
                <th>S/N</th>
                <th>Order Number</th>
                <th>Amount Paid</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Balance</th>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 border-y border-[#00000020] text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="h-14 text-slate-800 dark:text-slate-100">
                <td>1</td>
                <td>#re135</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
        </table>
    </div>
</div>