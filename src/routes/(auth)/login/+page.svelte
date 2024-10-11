<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').PageData} */
	export let data, form;

  $: console.log({data, form});
</script>

<div class="container py-10 sm:py-40">
	<div class="flex justify-center">
		<div class="login-card my-10 w-full rounded-xl bg-white sm:w-auto dark:bg-white/20">
			<div class="w-full p-12 sm:w-[500px]">
				<div class="mb-8 text-center text-5xl font-extrabold tracking-tight dark:text-slate-50">
					Sign In
				</div>
				<div class="flex flex-col gap-2">
					<button
						type="button"
						class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 128 128">
              <path
								fill="#fff"
								d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
							></path>
              <path
								fill="#e33629"
								d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
							></path>
              <path
								fill="#f8bd00"
								d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
							></path>
              <path
								fill="#587dbd"
								d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
							></path>
              <path
								fill="#319f43"
								d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
							></path>
            </svg>
						<span class="rounded-sm text-sm dark:text-slate-50">Sign Up with Google</span>
					</button>
					<button
						type="button"
						class="relative flex h-[38px] items-center justify-center gap-1.5 rounded-full border dark:border-0 dark:bg-white/20"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="size-[1.5em]" viewBox="0 0 24 24">
              <path
								fill="#1278f2"
								d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"
							></path>
            </svg>
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
						<div class="flex flex-col">
							<span class="dark:text-slate-50">Email / Phone Number *</span>
							<input
								type="email"
								class="rounded-md border border-black/30 focus:border-[#FFDA1C] dark:bg-white/10 dark:text-slate-50"
								name="email"
                id="email"
							/>
						</div>
						<div class="flex flex-col">
							<span class="dark:text-slate-50">Password *</span>
							<div class="relative">
								<input
									type="password"
									class="block w-full rounded-md border border-black/30 focus:border-[#FFDA1C] dark:bg-white/10 dark:text-slate-50"
									name="password"
                  id="password"
								/>
								<button class="absolute right-2 top-[50%] translate-y-[-50%]">
                  <svg width="1.3em" height="1.3em" viewBox="0 0 24 24">
                    <path
											class="fill-[#000] dark:fill-slate-50"
											d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
										></path>
                  </svg>
                </button>
							</div>
							<div class="flex gap-2">
								<span class="dark:text-slate-50">Don’t have an account?</span>
								<a href="#" class="text-brand-500">Sign Up</a>
							</div>
						</div>
						<div class="flex flex-col justify-center gap-4">
							<a href="#" class="cursor-pointer text-center text-sm text-brand-500 hover:underline">Forgot Password?</a>
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
