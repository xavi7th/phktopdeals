<script>
  import { enhance } from '$app/forms';
	import Toast from '$lib/Components/Toast.svelte';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { faceBookFilled, googleColored } from '$lib/Components/iconPaths';
	import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';

	export let
        /** @type {import('./$types').PageData} */
        // data,
        /** @type {import('./$types').ActionData} */
        form;

  // $: console.log({form});
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
            <div class="flex justify-between gap-1">
              <a href="/register" class="text-brand-500">Don't have an account?</a>
              <a href="#/" class="cursor-pointer text-brand-500 hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" class="rounded-full bg-brand px-5 py-3 hover:bg-brand-400">
              <span class="">Sign in</span>
            </button>
          </div>
        </form>

        <!-- <div class="flex flex-col gap-2">
          <div class="my-8 flex items-center">
            <div class="mt-px flex-auto border-t"></div>
            <div class="text-bold text-secondary text-md mx-6 dark:text-slate-50">Or</div>
            <div class="mt-px flex-auto border-t"></div>
          </div>

          <button type="button" class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20">
            <SvgIcon class="size-[1.2em]" svgHeight={128} slot={googleColored}/>
            <span class="rounded-sm text-sm dark:text-slate-50">Login with Google</span>
          </button>
          <button type="button" class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20">
            <SvgIcon class="size-[1.5em]" svgHeight={24} slot={faceBookFilled}/>
            <span class="rounded-sm text-sm dark:text-slate-50">Login with Facebook</span>
          </button>
        </div> -->
			</div>
		</div>
	</div>
</div>
