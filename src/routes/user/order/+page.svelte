<script>
	import Table from '$lib/Components/Table.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let currentTab = 'All Orders';

    const orderTabs = [
        {
            caption: 'All Orders',
            amount: 0,
            icon: '',
        },
        {
            caption: 'GIFT CARDS',
            amount: 0,
            icon: '',
        },
        {
            caption: 'Games',
            amount: 0,
            icon: '',
        },
        {
            caption: 'eSIMs',
            amount: 0,
            icon: '',
        },
        {
            caption: 'TOPUP',
            amount: 0,
            icon: '',
        },
    ]
</script>

<section class="pb-28 lg:py-[130px] w-full">
    <div class="sm:mx-10 grid sm:grid-cols-5 grid-cols-3 gap-6">
        {#each orderTabs as tab}
            <button class="grid place-content-center bg-white dark:bg-[#404040] shadow-lg p-[16px] rounded-xl border border-slate-100 dark:border-slate-500 text-slate-800 dark:text-slate-100" class:border-[#FFDA1C]={currentTab === tab.caption} on:click={() => currentTab = tab.caption}>
                <div class="bg-[#FFDA1C30] border-[#FFDA1C] size-16 rounded-full grid place-content-center mx-auto mb-4">
                    
                </div>
                <p class="text-[16px] flex items-center gap-1.5">{tab.caption} 
                    <!-- <span class="text-[#FFDA1C] text-[24px]">{tab.amount}</span> -->
                </p>
            </button>
        {/each}
    </div>
    <Table />
</section>