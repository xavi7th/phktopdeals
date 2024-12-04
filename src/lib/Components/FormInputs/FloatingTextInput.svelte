<!-- EXAMPLE USAGE -->
<!-- <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/> -->
<!-- <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/> -->

<!-- <FloatingTextInput name="password-confirmation" type="password" isError={! form?.success}
                msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
                togglePw='["#password-confirmation", "#hs-floating-input-passowrd-value"]'/> -->
<script>
  import { eyeOpen } from "../iconPaths";
  import SvgIcon from "../SvgIcon.svelte";
  import FormMessage from "$lib/Components/FormMessage.svelte";

  export let name = "input-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10),
    isError = true,
    label = "",
    placeholder = " ",
    gray = false,
    togglePw = undefined,
    strongPw = undefined,
    value = undefined;
  /** @type {string[]|undefined} */
  export let msg = [];
</script>

<div class="relative flex-1">
  <input
    {name}
    id={name}
    {placeholder}
    {...$$restProps}
    bind:value
    class="peer block w-full rounded-lg border-gray-200 p-4 text-sm placeholder:text-transparent autofill:pb-2 autofill:pt-6
      focus:border-brand-500/50 focus:pb-2 focus:pt-6 focus:ring-brand-500/50 disabled:pointer-events-none
      disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:focus:ring-neutral-600 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6
      {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} {!msg?.toString() && gray ? 'border-transparent dark:border-transparent' : ''}
      {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
      {msg?.toString() && !isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}" />

  <label
    for={name}
    class="pointer-events-none absolute start-0 top-0 h-full origin-[0_0] truncate border border-transparent p-4 text-sm transition duration-100 ease-in-out
      peer-focus:-translate-y-1.5 peer-focus:translate-x-0.5 peer-focus:scale-90 peer-focus:text-gray-500 peer-disabled:pointer-events-none peer-disabled:opacity-50
      peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-gray-500
      dark:text-neutral-500 dark:peer-focus:text-neutral-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
    {label}
    <span class="text-gray-400">{placeholder}</span>
  </label>

  {#if togglePw}
    <button
      type="button"
      data-hs-toggle-password={`{"target": ${togglePw} }`}
      class="absolute top-0 {msg?.toString()
        ? 'bottom-7'
        : 'bottom-0'} end-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 focus:text-blue-600 focus:outline-none dark:text-neutral-600 dark:focus:text-blue-500">
      <SvgIcon class="size-3.5 shrink-0 {msg?.toString() ? 'text-red-500' : ''}" svgHeight={24} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={eyeOpen} />
    </button>
  {/if}

  {#if msg?.toString()}
    <FormMessage type={isError ? "error" : "success"} {msg} />
  {/if}

  {#if strongPw}
    <div id="{name}-popover" class="absolute z-10 hidden w-full rounded-lg bg-white p-4 shadow-md dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800">
      <div
        id="{name}-in-popover"
        data-hs-strong-password={`
        {
          "target": "#${name}",
          "hints": "#${name}-popover",
          "stripClasses": "hs-strong-password:opacity-100 hs-strong-password:bg-green-500/60 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-gray-500 opacity-40 mx-1",
          "mode": "popover",
          "specialCharactersSet": "&!@"
        }
      `}
        class="-mx-1 mt-2 flex">
        &nbsp;
      </div>

      <h4 class="mt-3 text-sm font-semibold text-gray-800 dark:text-white">Your password must contain:</h4>

      <ul class="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
        <li data-hs-strong-password-hints-rule-text="min-length" class="flex items-center gap-x-2 hs-strong-password-active:text-teal-500">
          <span class="hidden" data-check="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Minimum number of characters is 6.
        </li>
        <li data-hs-strong-password-hints-rule-text="lowercase" class="flex items-center gap-x-2 hs-strong-password-active:text-teal-500">
          <span class="hidden" data-check="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Should contain lowercase.
        </li>
        <li data-hs-strong-password-hints-rule-text="uppercase" class="flex items-center gap-x-2 hs-strong-password-active:text-teal-500">
          <span class="hidden" data-check="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Should contain uppercase.
        </li>
        <li data-hs-strong-password-hints-rule-text="numbers" class="flex items-center gap-x-2 hs-strong-password-active:text-teal-500">
          <span class="hidden" data-check="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          Should contain numbers.
        </li>
        <li data-hs-strong-password-hints-rule-text="special-characters" class="flex items-center gap-x-2 hs-strong-password-active:text-teal-500">
          <span class="hidden" data-check="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span data-uncheck="">
            <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
