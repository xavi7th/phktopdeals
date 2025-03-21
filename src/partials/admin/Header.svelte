<script>
  import Logo from "$lib/Components/Logo.svelte";
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { bell, crescentMoon, purchaseBag, sunRays } from "$lib/Components/iconPaths";

  let {user = {} } = $props();
</script>

<header class="sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm md:flex-nowrap md:justify-start lg:ps-[260px] dark:border-neutral-700 dark:bg-neutral-800">
  <nav class="mx-auto flex w-full basis-full items-center px-4 sm:px-6">
    <div class="me-5 lg:me-0 lg:hidden">
      <Logo />
    </div>

    <div class="ms-auto flex w-full items-center justify-end gap-x-1 md:gap-x-3">
      <div class="flex flex-row items-center gap-1">
        <div class="flex items-center rounded-full p-0.5 px-0 sm:order-3">
          <button
            type="button"
            class="hs-dark-mode ml-6 inline-flex size-[46px] items-center justify-center rounded-full font-medium text-gray-800 hover:bg-white/75 focus:bg-white/75 focus:outline-none hs-dark-mode-active:hidden dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            data-hs-theme-click-value="dark">
            <span class="group inline-flex size-9 shrink-0 items-center justify-center">
              <SvgIcon class="size-4 shrink-0" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={crescentMoon} />
            </span>
          </button>

          <button
            type="button"
            class="hs-dark-mode ml-6 mr-3 hidden rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none hs-dark-mode-active:block dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            data-hs-theme-click-value="light">
            <span class="group inline-flex size-9 shrink-0 items-center justify-center">
              <SvgIcon class="size-4 shrink-0" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={sunRays} />
            </span>
          </button>

          <!-- <button
            type="button"
            class="relative mr-6 inline-flex size-[46px] items-center justify-center rounded-lg text-sm font-semibold text-gray-800 shadow-sm hover:bg-white/75 focus:bg-white/75 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
            <SvgIcon class="size-4 shrink-0" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={bell} />
            <span class="absolute end-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">99+</span>
          </button> -->

          <div class="hs-dropdown relative inline-flex [--placement:bottom-right]">
            <button
              id="hs-dropdown-account"
              type="button"
              class="inline-flex size-12 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown">
              {#if user.avatar_url}
                <img
                  class="size-10 shrink-0 rounded-full"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                  alt="Avatar" />
              {:else}
                <span class="rounded-full bg-brand-600 dark:bg-brand-900 text-white text-lg font-bold shadow-sm shadow-gray-500 dark:shadow-none h-12 w-12 flex items-center justify-center">{user.full_name?.charAt(0) || "U"}</span>
              {/if}
            </button>

            <div
              class="hs-dropdown-menu duration mt-2 hidden min-w-60 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-account">
              <div class="rounded-t-lg bg-gray-100 px-5 py-3 dark:bg-neutral-700">
                <p class="text-sm text-gray-500 dark:text-neutral-500">Signed in as</p>
                <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">{user.full_name || "Unknown"}</p>
                <p class="text-xs font-medium text-gray-800 dark:text-neutral-200">{user.email}</p>
              </div>
              <div class="space-y-0.5 p-1.5">
                <a
                  class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  href="#">
                  <SvgIcon class="size-4 shrink-0" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={bell} />
                  Send Emails
                </a>
                <a
                  class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  href="#">
                  <SvgIcon class="size-4 shrink-0" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={purchaseBag} />
                  Purchase Requests
                </a>
                <a
                  class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                  href="/logout"
                  data-sveltekit-reload>
                  <SvgIcon class="size-4 shrink-0" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={purchaseBag} />
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
