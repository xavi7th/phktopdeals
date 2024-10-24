<script>
	import Logo from '$lib/Components/Logo.svelte';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
  import { bell, cresentMoon, purchaseBag, sunRays } from '$lib/Components/iconPaths';
</script>

<header class="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px] dark:bg-neutral-800 dark:border-neutral-700">
  <nav class="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
    <div class="me-5 lg:me-0 lg:hidden">
      <Logo />
    </div>

    <div class="w-full flex items-center justify-end ms-auto gap-x-1 md:gap-x-3">
      <div class="flex flex-row items-center gap-1">
        <div class="items-center rounded-full p-0.5 px-0 sm:order-3 flex">
          <button type="button" class="hs-dark-mode inline-flex items-center justify-center size-[46px] rounded-full font-medium text-gray-800 hover:bg-white/75 focus:bg-white/75 focus:outline-none hs-dark-mode-active:hidden dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 ml-6" data-hs-theme-click-value="dark" >
            <span class="group inline-flex size-9 shrink-0 items-center justify-center">
              <SvgIcon class="shrink-0 size-4" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={cresentMoon}/>
            </span>
          </button>

          <button type="button" class="hs-dark-mode hidden rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none hs-dark-mode-active:block dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 ml-6" data-hs-theme-click-value="light" >
            <span class="group inline-flex size-9 shrink-0 items-center justify-center">
              <SvgIcon class="shrink-0 size-4" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={sunRays}/>
            </span>
          </button>

          <button type="button" class="relative mr-6 inline-flex size-[46px] items-center justify-center rounded-lg text-sm font-semibold text-gray-800 shadow-sm hover:bg-white/75 focus:bg-white/75 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" >
            <SvgIcon class="shrink-0 size-4" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={bell}/>
            <span class="absolute end-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">99+</span>
          </button>

          <div class="hs-dropdown [--placement:bottom-right] relative inline-flex">
            <button id="hs-dropdown-account" type="button" class="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <img class="shrink-0 size-[38px] rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
            </button>

            <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
              <div class="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
                <p class="text-sm text-gray-500 dark:text-neutral-500">Signed in as</p>
                <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">james@site.com</p>
              </div>
              <div class="p-1.5 space-y-0.5">
                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                  <SvgIcon class="shrink-0 size-4" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={bell}/>
                  Send Emails
                </a>
                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                  <SvgIcon class="shrink-0 size-4" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={purchaseBag}/>
                  Purchase Requests
                </a>
                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="/logout" data-sveltekit-reload>
                  <SvgIcon class="shrink-0 size-4" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={purchaseBag}/>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>
