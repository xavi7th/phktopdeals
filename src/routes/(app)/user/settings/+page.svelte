<script>
	import { dev } from '$app/environment';
	import Toast from '$lib/Components/Toast.svelte';
	import DeleteUserForm from './DeleteUserForm.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { animatedDotsSVG, spinnerSVG } from '$lib/Components/iconPaths';
  import FloatingTextInput from '$lib/Components/FormInputs/FloatingTextInput.svelte';
	import FloatingFileInput from '$lib/Components/FormInputs/FloatingFileInput.svelte';

  /** @type {import('./$types').PageData} */
  export let data

  const { form: formData, errors, message, delayed, submitting, timeout, enhance } = superForm(data.form, {
    delayMs: 500,
    timeoutMs: 8000,
  });

  $: ( { user } = data ) ;
</script>

{#if $message}
  <div class="fixed top-24 z-50 end-3 space-y-3">
    <Toast positioned={false} type={$message.type} msg={$message.msg}/>
  </div>
{/if}

<section class="col-span-5 lg:col-span-4 lg:col-start-2 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 mx-auto min-w-[70%]">
  <div class="max-w-md fixed left-0 bottom-0 z-[60]">
    <SuperDebug data={{$message, $formData, $errors}} label="Appuser Edit Form" collapsible={true} display={dev} />
  </div>

  <div class="bg-white dark:bg-[#404040] sm:mb-auto mb-28 rounded-xl shadow-lg p-10 relative md:w-[900px] w-full mx-auto">
    <div class="absolute md:-top-20 sm:-top-12 -top-14 left-1/2 -translate-x-1/2 md:size-40 sm:size-34 size-24 border-4 border-brand-300 rounded-full overflow-hidden mx-auto">
      <div class="relative size-full">
        <img src="{user.avatar_url}" alt="" class="h-full w-full bg-black">
      </div>
    </div>

    <div class="bg-white rounded-xl p-4 sm:p-7 dark:bg-neutral-900 mt-8">
      <form method="POST" action="?/updateProfile" enctype="multipart/form-data" use:enhance>
        <section class="grid grid-cols-12 gap-y-8 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
          <header class="col-span-12">
            <h2 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Profile Details</h2>
            <p class="text-sm text-slate-700 dark:text-slate-300">Communication details . These will be kept private.</p>
          </header>

          <div class="col-span-12">
            <FloatingTextInput name="full_name" label="Full Name" bind:value={$formData.full_name} isError={ !! $errors.full_name} msg={$errors.full_name}/>
          </div>

          <div class="col-span-12">
            <FloatingTextInput name="email" type="email" label="Email" bind:value={$formData.email} isError={ !! $errors.email} msg={$errors.email}/>
            {#if ! user.is_verified}
              <div>
                <p class="text-sm mt-2 text-red-800 dark:text-red-200 pl-2">
                  Your email address is unverified.
                  <a href="auth.verification.send" class="underline text-sm text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                    Click here to re-send the verification email.
                  </a>
                </p>

                {#if $message == "Verification link sent"}
                  <div class="mt-2 font-medium text-sm text-teal-600 dark:text-teal-400">A new verification link has been sent to your email address.</div>
                {/if}
              </div>
            {/if}
          </div>

          <div class="col-span-12">
            <FloatingTextInput name="phone" label="Phone Number" bind:value={$formData.phone} isError={ !! $errors.phone} msg={$errors.phone}/>
          </div>

          <div class="col-span-12">
            <FloatingFileInput name="avatar" label="Profile Image (800 * 800)" accept="image/*" bind:files={$formData.avatar} isError={ !! $errors.avatar} msg={$errors.avatar}/>
          </div>

          <div class="col-span-12 flex justify-end mt-4">
            <button type="submit" class="w-32 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none text-nowrap" disabled={$submitting}>
              {#if $timeout}
                Still Loading {@html animatedDotsSVG}
              {:else}
                Update Details
                {#if $delayed} {@html spinnerSVG} {/if}
              {/if}
            </button>
          </div>
        </section>
      </form>

      <form method="POST" action="?/updatePassword" use:enhance>
        <section class="grid grid-cols-12 gap-y-8">
          <header class="col-span-12">
            <hr class="my-10">
            <h2 class="text-2xl font-extrabold text-slate-800 dark:text-slate-200">Update Password</h2>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              Enter your current password and the password you wish to change to
            </p>
          </header>

          <div class="col-span-12">
            <FloatingTextInput name="current_password" type="password" bind:value={$formData.current_password} isError={ !! $errors.current_password} msg={$errors.current_password} label="Current Password" togglePw='"#current_password"'/>
          </div>

          <div class="col-span-12">
            <FloatingTextInput name="password" type="password" label="New Password" bind:value={$formData.password} isError={ !! $errors.password} msg={$errors.password} strongPw togglePw='["#password_confirmation", "#password"]'/>
          </div>

          <div class="col-span-12">
            <FloatingTextInput name="password_confirmation" type="password" label="Confirm Password" bind:value={$formData.password_confirmation} isError={ !! $errors.password_confirmation} msg={$errors.password_confirmation} togglePw='["#password_confirmation", "#password"]'/>
          </div>

          <div class="col-span-12 flex justify-end mt-4">
            <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none text-nowrap" disabled={$submitting}>
              {#if $timeout}
                Still Loading {@html animatedDotsSVG}
              {:else}
                Update Password
                {#if $delayed} {@html spinnerSVG} {/if}
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
</section>
