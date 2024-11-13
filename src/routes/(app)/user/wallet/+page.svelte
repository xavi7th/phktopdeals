<script>
    import Table from '$lib/Components/Table.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<section class="col-span-5 mx-auto min-w-[70%] px-4 py-16 sm:px-6 lg:col-span-4 lg:col-start-2 lg:px-8 lg:py-24">
    <div class="flex justify-between items-center bg-white dark:bg-[#404040] shadow-md sm:mx-10 rounded-lg p-3.5">
        <div class="flex sm:gap-8 gap-3 items-center">
            <div class="bg-[#FFDA1C70] border-[#FFDA1C] size-16 rounded-md grid place-content-center">

            </div>
            <div>
                <p class="text-xs text-slate-800 dark:text-slate-400">Current Balance</p>
                <p class="text-xl text-slate-800 dark:text-slate-100">$0.00</p>
            </div>
        </div>
        <div>
            <button type="button" class="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-normal text-gray-800 rounded-md border border-transparent bg-brand-400 hover:bg-brand-500 focus:outline-none focus:bg-brand-500 disabled:opacity-50 disabled:pointer-events-none text-nowrap shadow-md">
                Recharge Wallet
              </button>
        </div>
    </div>
    <Table />
</section>
