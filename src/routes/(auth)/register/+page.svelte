<script>
	import PrimaryBtn from '$lib/Components/PrimaryBtn.svelte';
	import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<div class="container py-10 sm:py-40">
  <div class="flex justify-center">
    <div class="register-card my-10 sm:w-auto w-full sm:bg-white sm:dark:!bg-white/20 rounded-xl">
      <div class="sm:w-[500px] w-full p-12">
        <div class="mb-8 text-center text-5xl font-extrabold tracking-tight dark:text-slate-50">Sign Up</div>
        <form action="" class="flex flex-col gap-4 dark:text-slate-50">
          <div class="flex gap-1 mb-4"><span>I have an account?</span> <a href="/login" class="text-brand-500">Sign In</a></div>

          <FloatingTextInput name="full-name" isError={! form?.success} msg={form?.success || form?.errors?.full_name && form?.errors?.full_name[0]} label="Full Name *"/>

          <FloatingTextInput name="email" type="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email *"/>

          <div class="flex">
            <FloatingTextInput name="password" type="password" isError={! form?.success} strongPw
                  msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Password *"
                  togglePw='["#password-confirmation", "#password"]'/>
          </div>

          <FloatingTextInput name="password-confirmation" type="password" isError={! form?.success}
                msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
                togglePw='["#password-confirmation", "#password"]'/>

          <div class="flex flex-col justify-center gap-4 text-sm dark:text-slate-50">
            <p>By Registering, I Accept The <a href="#" class="text-brand-500">Terms</a> and <a href="#" class="text-brand-500">Privacy Policy</a> Of This Site.</p>
            <PrimaryBtn data={{ innerText: 'Sign Up', }} />
          </div>
        </form>

        <div class="space-y-10">
          <div class="mt-8 flex items-center">
            <div class="mt-px flex-auto border-t"></div>
            <div class="text-bold text-secondary mx-6 text-md dark:text-slate-50">Or</div>
            <div class="mt-px flex-auto border-t"></div>
          </div>

          <div class="flex flex-col gap-2">
            <button type="button" class="relative h-[38px] border dark:border-0 dark:bg-white/20 rounded-full flex items-center justify-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 128 128">
                <path
                  fill="#fff"
                  d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
                ></path>
                <path
                  fill="#e33629"
                  d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
                ></path>
                <path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"></path>
                <path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"></path>
                <path
                  fill="#319f43"
                  d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
                ></path>
              </svg>
              <span class="text-sm rounded-sm dark:text-slate-50">Sign Up with Google</span>
            </button>
            <button type="button" class="relative h-[38px] border dark:border-0 dark:bg-white/20 rounded-full flex items-center justify-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.5em]" viewBox="0 0 24 24">
                <path
                  fill="#1278f2"
                  d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"
                ></path>
              </svg>
              <span class="text-sm rounded-sm dark:text-slate-50">Sign Up with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
