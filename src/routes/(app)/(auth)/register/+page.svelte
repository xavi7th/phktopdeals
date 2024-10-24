<script>
	import { enhance } from '$app/forms';
	import OauthSignUp from '../OauthSignUp.svelte';
	import Toast from '$lib/Components/Toast.svelte';
	import PrimaryBtn from '$lib/Components/PrimaryBtn.svelte';
	import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';
	import { pageTitle } from '$stores';

  /** @type {import('./$types').ActionData} */
  export let form;

  $pageTitle.title = `Register Now – Become a Member of ${$pageTitle.appName}`;
</script>

{#if form?.message}
  <div class="fixed top-24 end-3 space-y-3">
    <Toast positioned={false} type="error" msg={form?.message}/>
  </div>
{/if}

<div class="container py-10 sm:py-40">
  <div class="flex justify-center">
    <div class="register-card my-10 sm:w-auto w-full sm:bg-white sm:dark:!bg-white/20 rounded-xl">
      <div class="sm:w-[500px] w-full p-12">
        <div class="mb-8 text-center text-5xl font-extrabold tracking-tight dark:text-slate-50">Sign Up</div>

        <form class="flex flex-col gap-6 dark:text-slate-50" method="POST" use:enhance>
          <FloatingTextInput name="full_name" isError={! form?.success} msg={form?.success || form?.errors?.full_name && form?.errors?.full_name[0]} label="Full Name *"/>

          <FloatingTextInput name="email" type="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email *"/>

          <div class="flex">
            <FloatingTextInput name="password" type="password" isError={! form?.success} strongPw
                  msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password *"
                  togglePw='["#password_confirmation", "#password"]'/>
          </div>

          <FloatingTextInput name="password_confirmation" type="password" isError={! form?.success}
                msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
                togglePw='["#password_confirmation", "#password"]'/>

          <div class="flex flex-col justify-center gap-6 mt-2 text-xs dark:text-slate-50">
            <p>By registering, I accept the <a href="#/" class="text-brand-500">Terms</a> and <a href="#/" class="text-brand-500">Privacy Policy</a> of this site.</p>
            <PrimaryBtn data={{ innerText: 'Sign Up', }} />
          </div>
        </form>

        <OauthSignUp register/>
      </div>
    </div>
  </div>
</div>
