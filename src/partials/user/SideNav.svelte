<script>
    export let sideMenu;
</script>
    
<section class="side-nav relative lg:!w-[550px] left-0 top-0 lg:block hidden">
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