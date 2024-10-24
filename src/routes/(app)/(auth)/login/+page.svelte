<script>
	import { pageTitle } from '$stores';
  import { enhance } from '$app/forms';
  import OauthSignUp from '../OauthSignUp.svelte';
	import Toast from '$lib/Components/Toast.svelte';
	import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';

  /** @type {import('./$types').ActionData} */
	export let form;

  $pageTitle.title = `Sign In to ${$pageTitle.appName} – Secure Account Access`;
</script>

{#if form?.message}
  <div class="fixed top-24 end-3 space-y-3">
    <Toast positioned={false} type="error" msg={form?.message}/>
  </div>
{/if}

<div class="container py-10 sm:py-40">
	<div class="flex justify-center">
		<div class="login-card my-10 w-full rounded-xl bg-white sm:w-auto dark:bg-white/20">
			<div class="w-full p-12 sm:w-[500px]">
				<div class="mb-8 text-center text-5xl font-extrabold tracking-tight dark:text-slate-50">
					Sign In
				</div>

        <form class="flex flex-col" method="POST" use:enhance>
          <div class="space-y-8">
            <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/>
            <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/>
          </div>

          <div class="flex flex-col justify-center gap-6 mt-6 text-sm">
            <a href="#/" class="cursor-pointer text-brand-500 text-right hover:underline">Forgot Password?</a>

            <button type="submit" class="rounded-full bg-brand px-5 py-3 hover:bg-brand-400">
              <span class="">Sign in</span>
            </button>
          </div>
        </form>

        <OauthSignUp />
			</div>
		</div>
	</div>
</div>
