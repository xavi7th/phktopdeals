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

				<div class="flex flex-col gap-2">
					<button type="button" class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20">
            <SvgIcon class="size-[1.2em]" svgHeight={128} slot={googleColored}/>
						<span class="rounded-sm text-sm dark:text-slate-50">Sign Up with Google</span>
					</button>
					<button type="button" class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20">
            <SvgIcon class="size-[1.5em]" svgHeight={24} slot={faceBookFilled}/>
						<span class="rounded-sm text-sm dark:text-slate-50">Sign Up with Facebook</span>
					</button>
				</div>

				<div class="space-y-10">
					<div class="mt-8 flex items-center">
						<div class="mt-px flex-auto border-t"></div>
						<div class="text-bold text-secondary text-md mx-6 dark:text-slate-50">Or</div>
						<div class="mt-px flex-auto border-t"></div>
					</div>

					<form class="flex flex-col gap-4" method="POST" use:enhance>
            <div class="flex gap-1 mb-4"><span>Don't have an account?</span> <a href="/register" class="text-brand-500">Sign Up</a></div>

            <div class="space-y-8">
              <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/>
              <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/>
            </div>

						<div class="flex flex-col justify-center gap-4 mt-4">
							<a href="#/" class="cursor-pointer text-center text-sm text-brand-500 hover:underline">Forgot Password?</a>

							<button type="submit" class="rounded-full bg-brand px-5 py-3 text-sm hover:bg-brand-400">
								<span class="">Sign in</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
