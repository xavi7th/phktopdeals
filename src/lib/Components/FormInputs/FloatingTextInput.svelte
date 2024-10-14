<!-- EXAMPLE USAGE -->
<!-- <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/> -->
<!-- <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/> -->

<!-- <FloatingTextInput name="password-confirmation" type="password" isError={! form?.success}
                msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
                togglePw='["#password-confirmation", "#hs-floating-input-passowrd-value"]'/> -->
<script>

  import { eyeOpen } from '../iconPaths';
	import SvgIcon from '../SvgIcon.svelte';
	import FormMessage from '$lib/Components/FormMessage.svelte';

  export let name = 'input-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10), msg = '', isError = true, label = '', placeholder = ' ', gray = false, togglePw = undefined, strongPw = undefined;
</script>

<div class="relative flex-1">
  <input {name} id="{name}" {placeholder} {...$$restProps}
      class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-brand-500/50 focus:ring-brand-500/50
      disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
      dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2
      {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} { !msg && gray ? 'border-transparent dark:border-transparent' : ''}
      {msg && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
      {msg && ! isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}">

  <label for="{name}"
      class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0]
      peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500
      dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">{label}</label>

  {#if togglePw}
    <button type="button" data-hs-toggle-password={`{"target": ${togglePw} }`}
        class="absolute top-0 {msg ? 'bottom-7' : 'bottom-0'} end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
      <SvgIcon class="shrink-0 size-3.5 {msg ? 'text-red-500' : ''}" svgHeight={24} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={eyeOpen}/>
    </button>
  {/if}

  {#if msg}
    <FormMessage type="{isError ? 'error' : 'success'}" {msg}/>
  {/if}

  {#if strongPw}
    <div id="{name}-popover" class="hidden absolute z-10 w-full bg-white shadow-md rounded-lg p-4 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700">
      <div id="{name}-in-popover" data-hs-strong-password={`
        {
          "target": "#${name}",
          "hints": "#${name}-popover",
          "stripClasses": "hs-strong-password:opacity-100 hs-strong-password:bg-green-500/60 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-gray-500 opacity-40 mx-1",
          "mode": "popover",
          "specialCharactersSet": "&!@"
        }
      `} class="flex mt-2 -mx-1">&nbsp;</div>

      <h4 class="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
        Your password must contain:
      </h4>

      <ul class="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
        <li data-hs-strong-password-hints-rule-text="min-length" class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
          <span class="hidden" data-check="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Minimum number of characters is 6.
        </li>
        <li data-hs-strong-password-hints-rule-text="lowercase" class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
          <span class="hidden" data-check="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Should contain lowercase.
        </li>
        <li data-hs-strong-password-hints-rule-text="uppercase" class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
          <span class="hidden" data-check="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Should contain uppercase.
        </li>
        <li data-hs-strong-password-hints-rule-text="numbers" class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
          <span class="hidden" data-check="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Should contain numbers.
        </li>
        <li data-hs-strong-password-hints-rule-text="special-characters" class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
          <span class="hidden" data-check="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Should contain special characters (allowed chars: &!@).
        </li>
      </ul>
    </div>
  {/if}
</div>
