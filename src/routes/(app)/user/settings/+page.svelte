<script>
  import { dev } from "$app/environment";
  import Toast from "$lib/Components/Toast.svelte";
  import DeleteUserForm from "./DeleteUserForm.svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { animatedDotsSVG, spinnerSVG } from "$lib/Components/iconPaths";
  import FloatingTextInput from "$lib/Components/FormInputs/FloatingTextInput.svelte";
  import FloatingFileInput from "$lib/Components/FormInputs/FloatingFileInput.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  const {
    form: formData,
    errors,
    message,
    delayed,
    submitting,
    timeout,
    enhance,
  } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: ({ user } = data);
</script>

{#if $message}
  <div class="fixed end-3 top-24 z-50 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg} />
  </div>
{/if}

<div class="fixed bottom-0 left-0 z-[60] max-w-md">
  <SuperDebug data={{ $message, $formData, $errors }} label="Appuser Edit Form" collapsible={true} display={dev} />
</div>

<div class="relative mx-auto mb-28 w-full rounded-xl bg-white p-10 shadow-lg sm:mb-auto md:w-[900px] dark:bg-[#404040]">
  <div class="sm:size-34 absolute -top-14 left-1/2 mx-auto size-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-brand-300 sm:-top-12 md:-top-20 md:size-40">
    <div class="relative size-full">
      <img src={user.avatar_url} alt="" class="h-full w-full bg-black" />
    </div>
  </div>

  <div class="mt-8 rounded-xl bg-white p-4 sm:p-7 dark:bg-neutral-900">
    <form method="POST" action="?/updateProfile" enctype="multipart/form-data" use:enhance>
      <section class="grid grid-cols-12 gap-y-8 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 dark:border-neutral-700 dark:first:border-transparent">
        <header class="col-span-12">
          <h2 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Profile Details</h2>
          <p class="text-sm text-slate-700 dark:text-slate-300">Communication details . These will be kept private.</p>
        </header>

        <div class="col-span-12">
          <FloatingTextInput name="full_name" label="Full Name" bind:value={$formData.full_name} isError={!!$errors.full_name} msg={$errors.full_name} />
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="email" type="email" label="Email" bind:value={$formData.email} isError={!!$errors.email} msg={$errors.email} />
          {#if !user.is_verified}
            <div>
              <p class="mt-2 pl-2 text-sm text-red-800 dark:text-red-200">
                Your email address is unverified.
                <a
                  href="auth.verification.send"
                  class="rounded-md text-sm text-red-600 underline hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-red-400 dark:hover:text-red-100 dark:focus:ring-offset-gray-800"
                >
                  Click here to re-send the verification email.
                </a>
              </p>

              {#if $message?.msg == "Verification link sent"}
                <div class="mt-2 text-sm font-medium text-teal-600 dark:text-teal-400">A new verification link has been sent to your email address.</div>
              {/if}
            </div>
          {/if}
        </div>

        <div class="col-span-12">
          <FloatingTextInput name="phone" label="Phone Number" bind:value={$formData.phone} isError={!!$errors.phone} msg={$errors.phone} />
        </div>

        <div class="col-span-12">
          <FloatingFileInput name="avatar" label="Profile Image (800 * 800)" accept="image/*" bind:files={$formData.avatar} isError={!!$errors.avatar} msg={$errors.avatar} />
        </div>

        <div class="col-span-12 mt-4 flex justify-end">
          <button
            type="submit"
            class="inline-flex w-32 items-center justify-center gap-x-2 text-nowrap rounded-lg border border-transparent bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            disabled={$submitting}
          >
            {#if $timeout}
              Still Loading {@html animatedDotsSVG}
            {:else}
              Update Details
              {#if $delayed}
                {@html spinnerSVG}
              {/if}
            {/if}
          </button>
        </div>
      </section>
    </form>

    <form method="POST" action="?/updatePassword" use:enhance>
      <section class="grid grid-cols-12 gap-y-8">
        <header class="col-span-12">
          <hr class="my-10" />
          <h2 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Update Password</h2>
          <p class="text-sm text-slate-700 dark:text-slate-300">Enter your current password and the password you wish to change to</p>
        </header>

        <div class="col-span-12">
          <FloatingTextInput
            name="current_password"
            type="password"
            bind:value={$formData.current_password}
            isError={!!$errors.current_password}
            msg={$errors.current_password}
            label="Current Password"
            togglePw={`"#current_password"`}
          />
        </div>

        <div class="col-span-12">
          <FloatingTextInput
            name="password"
            type="password"
            label="New Password"
            bind:value={$formData.password}
            isError={!!$errors.password}
            msg={$errors.password}
            strongPw
            togglePw={`["#password_confirmation", "#password"]`}
          />
        </div>

        <div class="col-span-12">
          <FloatingTextInput
            name="password_confirmation"
            type="password"
            label="Confirm Password"
            bind:value={$formData.password_confirmation}
            isError={!!$errors.password_confirmation}
            msg={$errors.password_confirmation}
            togglePw={`["#password_confirmation", "#password"]`}
          />
        </div>

        <div class="col-span-12 mt-4 flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-x-2 text-nowrap rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-medium text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            disabled={$submitting}
          >
            {#if $timeout}
              Still Loading {@html animatedDotsSVG}
            {:else}
              Update Password
              {#if $delayed}
                {@html spinnerSVG}
              {/if}
            {/if}
          </button>
        </div>
      </section>
    </form>

    <!-- <form method="POST" use:enhance>
        <DeleteUserForm timeout={$timeout} delayed={$delayed} submitting={$submitting} errors={$errors} bind:value={$formData.verify_password} />
      </form> -->
  </div>
</div>
