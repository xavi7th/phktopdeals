<script>
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { browser } from "$app/environment";
  import Toast from "$lib/Components/Toast.svelte";
  import PrimaryBtn from "$lib/Components/PrimaryBtn.svelte";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";

  /** @type {import('./$types').ActionData} */
  export let form;

  /** @type {import('./$types').PageData} */
  export let data;

  let loading = false;

  $: showRegister = browser && window.location.hash === "#register";
</script>

{#if form?.message || data.message}
  <div class="fixed end-3 top-24 space-y-3">
    <Toast positioned={false} type={data.message ? "success" : "error"} msg={form?.body ?? form?.message ?? data.message} />
  </div>
{/if}

<div class="container py-10 sm:py-40">
  <div class="flex justify-center">
    <div class="login-card my-10 w-full rounded-xl bg-white sm:w-auto dark:bg-white/20">
      <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
      <nav class="relative z-0 flex overflow-hidden rounded-xl border dark:border-neutral-700" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
        <a
          href="/login"
          class="relative min-w-0 flex-1 overflow-hidden border-b-2 border-s bg-white px-4 py-4 text-center text-xl font-semibold tracking-tight text-gray-500 first:border-s-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:text-brand-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 hs-tab-active:border-b-brand-600 hs-tab-active:text-gray-900 dark:border-b-neutral-700 dark:border-l-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 dark:hs-tab-active:border-b-brand-600 dark:hs-tab-active:text-white"
          class:active={!showRegister}
          id="bar-with-underline-item-1"
          aria-selected={!showRegister}
          data-hs-tab="#bar-with-underline-1"
          aria-controls="bar-with-underline-1"
          role="tab"
        >
          Sign In
        </a>
        <a
          href="/login#register"
          class="relative min-w-0 flex-1 overflow-hidden border-b-2 border-s bg-white px-4 py-4 text-center text-xl font-semibold tracking-tight text-gray-500 first:border-s-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:text-brand-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 hs-tab-active:border-b-brand-600 hs-tab-active:text-gray-900 dark:border-b-neutral-700 dark:border-l-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 dark:hs-tab-active:border-b-brand-600 dark:hs-tab-active:text-white"
          class:active={showRegister}
          id="bar-with-underline-item-2"
          aria-selected={showRegister}
          data-hs-tab="#bar-with-underline-2"
          aria-controls="bar-with-underline-2"
          role="tab"
        >
          Register
        </a>
      </nav>

      <div class="mt-3">
        <div id="bar-with-underline-1" class:hidden={showRegister} role="tabpanel" aria-labelledby="bar-with-underline-item-1">
          <div class="w-full p-12 sm:w-[500px]">
            <form
              class="flex flex-col"
              method="POST"
              action="?/login"
              use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                  loading = false;
                  update();
                };
              }}
            >
              <div class="space-y-8">
                <FloatingTextInput name="login-email" isError={!form?.success} msg={form?.success || (form?.errors?.email && form?.errors?.email[0])} label="Email" />
                <FloatingTextInput
                  name="login-password"
                  type="password"
                  isError={!form?.success}
                  msg={form?.success || (form?.errors?.password && form?.errors?.password[0])}
                  label="Password"
                  togglePw={`"#login-password"`}
                />
              </div>

              <div class="mt-6 flex flex-col justify-center gap-6 text-sm">
                <a href="#/" class="cursor-pointer text-right text-brand-500 hover:underline">Forgot Password?</a>

                <!-- <button type="submit" class="rounded-full bg-brand px-5 py-3 hover:bg-brand-400">
                  <span class="">Sign in</span>
                </button> -->
                <PrimaryBtn label="Sign In" {loading} />
              </div>
            </form>

            <!-- <OauthSignUp /> -->
          </div>
        </div>

        <div id="bar-with-underline-2" class:hidden={!showRegister} role="tabpanel" aria-labelledby="bar-with-underline-item-2">
          <div class="w-full p-12 sm:w-[500px]">
            <form
              class="flex flex-col gap-6 dark:text-slate-50"
              method="POST"
              action="?/register"
              use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                  loading = false;
                  update();
                };
              }}
            >
              <FloatingTextInput name="full_name" isError={!form?.success} msg={form?.success || (form?.errors?.full_name && form?.errors?.full_name[0])} label="Full Name *" />

              <FloatingTextInput name="register-email" type="email" isError={!form?.success} msg={form?.success || (form?.errors?.email && form?.errors?.email[0])} label="Email *" />

              <div class="flex">
                <FloatingTextInput
                  name="register-password"
                  type="password"
                  isError={!form?.success}
                  strongPw
                  msg={form?.success || (form?.errors?.password && form?.errors?.password[0])}
                  label="Password *"
                  togglePw={`["#password_confirmation", "#register-password"]`}
                />
              </div>

              <FloatingTextInput
                name="password_confirmation"
                type="password"
                isError={!form?.success}
                msg={form?.success || (form?.errors?.password_confirmation && form?.errors?.password_confirmation[0])}
                label="Confirm Password *"
                togglePw={`["#password_confirmation", "#register-password"]`}
              />

              <div class="mt-2 flex flex-col justify-center gap-6 text-xs dark:text-slate-50">
                <p>
                  By registering, I accept the <a href="#/" class="text-brand-500">Terms</a>
                  and
                  <a href="#/" class="text-brand-500">Privacy Policy</a>
                  of this site.
                </p>
                <PrimaryBtn label="Sign Up" {loading} />
              </div>
            </form>

            <!-- <OauthSignUp register/> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
