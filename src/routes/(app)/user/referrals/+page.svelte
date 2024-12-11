<script>
  import Table from "$lib/Components/Table.svelte";
</script>

<div class="rounded-xl bg-white p-10 shadow-md sm:mx-10 dark:bg-[#404040]">
  <h1 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Referrals</h1>
  <p class="mt-10 text-sm text-slate-800 dark:text-slate-200">
    We're giving our best customers a chance to try our new Refer-a-Friend program before anyone else. After verification of your email, refer your friends & family to cryptomate.online and earn $5 when they spend $50! <a
      href="#"
      class="text-[#FFDA1C] hover:underline">
      Terms and conditions
    </a>
  </p>

  <div class="relative mt-6 flex rounded-lg shadow-sm">
    <input
      type="text"
      id="hs-search-box-with-loading-5"
      name="hs-search-box-with-loading-5"
      class="block w-full rounded-s-lg border-gray-200 px-4 py-3 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      placeholder="Input search"
      value="https://cryptomate.online/auth/sign-up?referral_code=okyhb" />
    <button
      type="button"
      class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-md border border-transparent bg-brand-400
                          px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-brand-500
                          focus:bg-brand-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
      Copy
    </button>
  </div>
</div>
<Table />
