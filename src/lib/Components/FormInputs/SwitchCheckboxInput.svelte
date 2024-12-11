<!-- EXAMPLE USAGE -->
<!-- <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/> -->
<!-- <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/> -->

<!-- <FloatingTextInput name="password-confirmation" type="password" isError={! form?.success}
msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
togglePw='["#password-confirmation", "#hs-floating-input-passowrd-value"]'/> -->

<script>
  import FormMessage from "$lib/Components/FormMessage.svelte";

  export let name = "check-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10),
    isError = true,
    label = "Label",
    tooltip = " ",
    gray = false,
    value = true,
    checked = false;
  /** @type {string|string[]|undefined} */
  export let msg = [];
</script>

<div class="relative flex-1">
  <div class="hs-tooltip flex items-center">
    <input
      type="checkbox"
      {name}
      id={name}
      {...$$restProps}
      value={value ?? ""}
      bind:checked
      class="hs-tooltip-toggle relative h-7 w-[3.25rem] cursor-pointer rounded-full border-transparent
              bg-gray-100 p-px text-transparent transition-colors duration-200 ease-in-out before:inline-block before:size-6 before:translate-x-0
              before:transform before:rounded-full before:bg-white before:shadow
              before:ring-0 before:transition before:duration-200 before:ease-in-out checked:border-blue-600
              checked:bg-none checked:text-blue-600 checked:before:translate-x-full checked:before:bg-blue-200 focus:ring-blue-600 focus:checked:border-blue-600
              disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:before:bg-neutral-400 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:checked:before:bg-blue-200
              dark:focus:ring-offset-gray-600 {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} {!msg?.toString() && gray ? 'border-transparent dark:border-transparent' : ''}
              {msg?.toString() && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
              {msg?.toString() && !isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}" />

    <label for={name} class="ms-3 text-sm text-gray-500 dark:text-neutral-400">{label}</label>

    <div
      class="hs-tooltip-content invisible absolute z-10 inline-block rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 dark:bg-neutral-700"
      role="tooltip">
      {tooltip}
    </div>
  </div>

  {#if msg?.toString()}
    <FormMessage type={isError ? "error" : "success"} {msg} />
  {/if}
</div>
