<script>
    const sideMenu = [
        {
            title: 'My Order',
            description: 'View and track your purchases',
            link: '/user/order',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
        {
            title: 'Wallet',
            description: 'Monitor your transactions',
            link: '/user/wallet',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
        {
            title: 'Wishlists',
            description: 'Track your desired items',
            link: '/user/wishlist',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
        {
            title: 'Referrals',
            description: 'Invite friends and track rewards',
            link: '/user/referrals',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
        {
            title: 'Redeem Balance Card',
            description: 'Top-up your balance wallet',
            link: '/user/wishlist',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
        {
            title: 'Bulk Order',
            description: 'Quick Bulk Purchase Submission',
            link: '/user/bulk-order',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
        {
            title: 'Verify Account',
            description: 'Submit for unrestricted shopping',
            link: '/user/verify-account',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
        {
            title: 'Settings',
            description: 'Personalize your preferences',
            link: '/user/settings',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#facc15" d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.2 1.2 0 0 0 9 14h6a1.2 1.2 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path></svg>`,
        },
    ]
</script>

<section class="lg:!w-[550px] !w-0 left-0 top-0 overflow-hidden" class:!min-w-0={false}>
    <ul class="px-4 h-full space-y-1 bg-white dark:bg-[#404040] w-[400px] pt-28 lg:pt-28 shadow-lg pb-28 overflow-hidden">
        {#each sideMenu as menu}
            <li>
                <a href={menu.link} class="flex gap-4 p-2 py-3.5 hover:bg-black/5 rounded-[1rem]">
                    <div class="bg-[#FFDA1C30] dark:bg-[#4e4e4e] size-12 rounded-full grid place-content-center">
                        {@html menu.icon}
                    </div>
                    <div class="text-[14px] flex flex-col justify-between dark:text-white">
                        <h3 class="">{menu.title}</h3>
                        <p class="font-light">{menu.description}</p>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</section>