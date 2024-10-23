<script>
    import SideNav from '$partials/user/SideNav.svelte';

    let openSideMenu = false;
</script>

<section class="flex w-full flex-1 mb-[-70px]">
    <SideNav  />
    <div class="w-full">
        <button class="lg:hidden block p-3 rounded-r-xl bg-orange-500 text-red-600 mt-28 mb-10">
            hello
        </button>
        <slot />
    </div>
</section>