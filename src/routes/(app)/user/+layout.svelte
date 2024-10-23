<script>
    import SideNav from "$partials/user/SideNav.svelte";
    const sideMenu = [
        {
            title: 'My Order',
            description: 'View and track your purchases',
            link: '/user/order',
            icon: `<svg viewBox="0 0 24 24" class="size-[20px] fill-[#FFDA1C]" preserveAspectRatio="xMidYMid meet" focusable="false"><g><rect fill="none" height="24" width="24"></rect><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"></path></g></svg>`,
        },
        {
            title: 'Wallet',
            description: 'Monitor your transactions',
            link: '/user/wallet',
            icon: `<svg viewBox="0 0 24 24" class="size-[20px] fill-[#FFDA1C]" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"></path><circle cx="16" cy="12" r="1.5"></circle></svg>`,
        },
        {
            title: 'Wishlists',
            description: 'Track your desired items',
            link: '/user/wishlist',
            icon: `<svg viewBox="0 0 24 24" class="size-[20px] fill-[#FFDA1C]" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>`,
        },
        {
            title: 'Referrals',
            description: 'Invite friends and track rewards',
            link: '/user/referrals',
            icon: `<svg viewBox="0 0 24 24" class="size-[20px] fill-[#FFDA1C]" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>`,
        },
        {
            title: 'Redeem Balance Card',
            description: 'Top-up your balance wallet',
            link: '/user/wishlist',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="size-[20px] stroke-[#FFDA1C]" stroke="currentColor" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>`,
        },
        {
            title: 'Bulk Order',
            description: 'Quick Bulk Purchase Submission',
            link: '/user/bulk-order',
            icon: `<svg viewBox="0 0 24 24" class="size-[20px] fill-[#FFDA1C]" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"></path></svg>`,
        },
        {
            title: 'Verify Account',
            description: 'Submit for unrestricted shopping',
            link: '/user/verify-account',
            icon: `<svg viewBox="0 0 24 24" class="size-[20px] fill-[#FFDA1C]" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 4.52-2.98 8.69-7 9.93-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11 7 3.11V11zm-11.59.59L6 13l4 4 8-8-1.41-1.42L10 14.17z"></path></svg>`,
        },
        {
            title: 'Settings',
            description: 'Personalize your preferences',
            link: '/user/settings',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="size-[20px] stroke-[#FFDA1C]" stroke="currentColor" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>`,
        },
    ]
</script>

<section class="flex w-full flex-1 mb-[-70px]">
    <div id="hs-offcanvas-example" class="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[80] bg-white dark:bg-[#404040]" role="dialog" tabindex="-1" aria-labelledby="hs-offcanvas-example-label">
        <div class="flex justify-between items-center py-3 px-4">
          <button type="button" class="ml-auto size-8 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-300 dark:text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close" data-hs-overlay="#hs-offcanvas-example">
            <span class="sr-only">Close</span>
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
            <ul>
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
        </div>
    </div>
    <SideNav {sideMenu} />
    <div class="w-full">
        <button type="button" class="lg:hidden block p-2 rounded-full bg-brand-300 mt-28 mb-10 translate-x-[-8px]" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-offcanvas-example" data-hs-overlay="#hs-offcanvas-example">
            <svg class="size-[30px]" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#404040"></path> </g></svg>
        </button>
        <slot />
    </div>
</section>
  