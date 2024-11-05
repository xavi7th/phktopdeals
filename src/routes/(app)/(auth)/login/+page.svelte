<script>
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
	import Toast from '$lib/Components/Toast.svelte';
	import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';
	import PrimaryBtn from '$lib/Components/PrimaryBtn.svelte';

  /** @type {import('./$types').ActionData} */
	export let form;
</script>

{#if form?.message}
  <div class="fixed top-24 end-3 space-y-3">
    <Toast positioned={false} type="error" msg={form?.message} />
  </div>
{/if}

<div class="container py-10 sm:py-40">
	<div class="flex justify-center">
		<div class="login-card my-10 w-full rounded-xl bg-white sm:w-auto dark:bg-white/20">

      <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
      <nav class="relative z-0 flex border rounded-xl overflow-hidden dark:border-neutral-700" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
        <button type="button" class="hs-tab-active:border-b-brand-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-brand-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-brand-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 text-center text-xl font-semibold tracking-tight" class:active={$page.url.hash !== '#register'} id="bar-with-underline-item-1" aria-selected="{$page.url.hash !== '#register'}" data-hs-tab="#bar-with-underline-1" aria-controls="bar-with-underline-1" role="tab">
          Sign In
        </button>
        <button type="button" class="hs-tab-active:border-b-brand-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-brand-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-brand-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 text-xl font-semibold tracking-tight" class:active={$page.url.hash === '#register'} id="bar-with-underline-item-2" aria-selected="{$page.url.hash === '#register'}" data-hs-tab="#bar-with-underline-2" aria-controls="bar-with-underline-2" role="tab">
          Register
        </button>
      </nav>

      <div class="mt-3">
        <div id="bar-with-underline-1" class:hidden={$page.url.hash === '#register'} role="tabpanel" aria-labelledby="bar-with-underline-item-1">
          <div class="w-full p-12 sm:w-[500px]">

            <form class="flex flex-col" method="POST" action="?/login" use:enhance>
              <div class="space-y-8">
                <FloatingTextInput name="login-email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/>
                <FloatingTextInput name="login-password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#login-password"'/>
              </div>

              <div class="flex flex-col justify-center gap-6 mt-6 text-sm">
                <a href="#/" class="cursor-pointer text-brand-500 text-right hover:underline">Forgot Password?</a>

                <button type="submit" class="rounded-full bg-brand px-5 py-3 hover:bg-brand-400">
                  <span class="">Sign in</span>
                </button>
              </div>
            </form>

            <!-- <OauthSignUp /> -->
          </div>
        </div>

        <div id="bar-with-underline-2" class:hidden={$page.url.hash !== '#register'} role="tabpanel" aria-labelledby="bar-with-underline-item-2">
          <div class="sm:w-[500px] w-full p-12">
            <form class="flex flex-col gap-6 dark:text-slate-50" method="POST" action="?/register" use:enhance>
              <FloatingTextInput name="full_name" isError={! form?.success} msg={form?.success || form?.errors?.full_name && form?.errors?.full_name[0]} label="Full Name *"/>

              <FloatingTextInput name="register-email" type="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email *"/>

              <div class="flex">
                <FloatingTextInput name="register-password" type="password" isError={! form?.success} strongPw msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password *" togglePw='["#password_confirmation", "#register-password"]'/>
              </div>

              <FloatingTextInput name="password_confirmation" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *" togglePw='["#password_confirmation", "#register-password"]'/>

              <div class="flex flex-col justify-center gap-6 mt-2 text-xs dark:text-slate-50">
                <p>By registering, I accept the <a href="#/" class="text-brand-500">Terms</a> and <a href="#/" class="text-brand-500">Privacy Policy</a> of this site.</p>
                <PrimaryBtn data={{ innerText: 'Sign Up', }} />
              </div>
            </form>

            <!-- <OauthSignUp register/> -->
          </div>
        </div>
      </div>

		</div>
	</div>
</div>
