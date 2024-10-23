<script>
	import Table from '$lib/Components/Table.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let currentTab = 'All Orders';

    const orderTabs = [
        {
            caption: 'All Orders',
            amount: 0,
            icon: `<svg class="size-[35px]" viewBox="0 0 24 24">
                <g fill="none" class="stroke-[#FFDA1C]" stroke-width="2">
                    <rect width="14" height="17" x="5" y="4" rx="2" />
                    <path stroke-linecap="round" d="M9 9h6m-6 4h6m-6 4h4" />
                </g>
            </svg>`,
        },
        {
            caption: 'GIFT CARDS',
            amount: 0,
            icon: `<svg class="size-[35px]" viewBox="0 0 20 20">
                <path class="fill-[#FFDA1C]" d="M4.75 4A2.75 2.75 0 0 0 2 6.75v5.5A2.75 2.75 0 0 0 4.75 15h8.5A2.75 2.75 0 0 0 16 12.25v-5.5A2.75 2.75 0 0 0 13.25 4zM3 12.25V10h3.293l-1.647 1.646a.5.5 0 0 0 .708.708L7 10.707V14H4.75A1.75 1.75 0 0 1 3 12.25M3 9V6.75C3 5.784 3.784 5 4.75 5H7v1.268A2 2 0 0 0 4.268 9zm4 0H6a1 1 0 1 1 1-1zm1 0V8a1 1 0 1 1 1 1zm3-1a2 2 0 0 0-3-1.732V5h5.25c.966 0 1.75.784 1.75 1.75V9h-4.268A2 2 0 0 0 11 8m-.646 3.646L8.707 10H15v2.25A1.75 1.75 0 0 1 13.25 14H8v-3.293l1.646 1.647a.5.5 0 0 0 .708-.708M6.75 17c-.855 0-1.619-.39-2.123-1.002L4.75 16h8.5A3.75 3.75 0 0 0 17 12.25v-5.5l-.002-.123A2.74 2.74 0 0 1 18 8.75v3.5A4.75 4.75 0 0 1 13.25 17z" />
            </svg>`,
        },
        {
            caption: 'Games',
            amount: 0,
            icon: `<svg class="size-[35px]" viewBox="0 0 16 16">
                <path class="fill-[#FFDA1C]" d="M3.505 7.5a.5.5 0 0 1 .5-.5h1V6a.5.5 0 0 1 1 0v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0V8h-1a.5.5 0 0 1-.5-.5M11 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-9.999.5a4.5 4.5 0 0 1 4.5-4.5h5.008a4.5 4.5 0 1 1 0 9H5.501a4.5 4.5 0 0 1-4.5-4.5m4.5-3.5a3.5 3.5 0 1 0 0 7h5.008a3.5 3.5 0 1 0 0-7z" />
            </svg>`,
        },
        {
            caption: 'eSIMs',
            amount: 0,
            icon: `<svg class="size-[35px]" viewBox="0 0 24 24">
                <path class="fill-[#FFDA1C]" d="M18 4v16H6V8.8L10.8 4zm0-2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9.5 19h-2v-2h2zm7 0h-2v-2h2zm-7-4h-2v-4h2zm3.5 4h-2v-4h2zm0-6h-2v-2h2zm3.5 2h-2v-4h2z" />
            </svg>`,
        },
        {
            caption: 'TOPUP',
            amount: 0,
            icon: `<svg class="size-[35px]" viewBox="0 0 24 24">
                <path fill="none" class="stroke-[#FFDA1C]" stroke-width="2" d="M4 10H1V6h22v4h-3M6 6h12v14.006A2.003 2.003 0 0 1 15.991 22H8.01A2 2 0 0 1 6 20.006zm7 12h3m-3-3h3m-3-3h3m-6 10V6M3 2h3m2 0h3m2 0h3m2 0h3" />
            </svg>`,
        },
    ]
</script>

<section class="pb-28 lg:py-[130px] lg:pb-[100px] w-full px-2">
    <div class="sm:mx-10 grid sm:grid-cols-5 grid-cols-3 gap-6">
        {#each orderTabs as tab}
            <button class="grid place-content-center bg-white dark:bg-[#404040] shadow-lg p-[16px] rounded-xl text-slate-800 dark:text-slate-100" class:border-[#FFDA1C]={currentTab === tab.caption} on:click={() => currentTab = tab.caption}>
                <div class="bg-[#FFDA1C30] border-[#FFDA1C] size-16 rounded-full grid place-content-center mx-auto mb-4">
                    {@html tab.icon}
                </div>
                <p class="text-[13px] justify-center flex items-center gap-1.5">{tab.caption} 
                    <!-- <span class="text-[#FFDA1C] text-[24px]">{tab.amount}</span> -->
                </p>
            </button>
        {/each}
    </div>
    <Table />
</section>