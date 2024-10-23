<script>
    import Table from '$lib/Components/Table.svelte';
</script>
<section class="pb-28">
    <div class="sm:mx-10 bg-white dark:bg-[#404040] sm:mt-28 rounded-xl shadow-md p-10">
        <h1 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Referrals</h1>
        <p class="mt-10 text-sm text-slate-800 dark:text-slate-200">We're giving our best customers a chance to try our new Refer-a-Friend program before anyone else. After verification of your email, refer your friends & family to cryptomate.online and earn $5 when they spend $50! <a href="#" class="text-[#FFDA1C] hover:underline">Terms and conditions</a></p>
    
        <div class="relative flex rounded-lg shadow-sm mt-6">
            <input type="text" id="hs-search-box-with-loading-5" name="hs-search-box-with-loading-5" class="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Input search" value="https://cryptomate.online/auth/sign-up?referral_code=okyhb">
            <button type="button" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold text-gray-800
                          rounded-md border border-transparent bg-brand-400 hover:bg-brand-500 focus:outline-none
                          focus:bg-brand-500 disabled:opacity-50 disabled:pointer-events-none text-nowrap">
              Copy
            </button>
        </div>
    </div>
    <Table />
</section>
