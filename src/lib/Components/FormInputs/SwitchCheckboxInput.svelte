<!-- EXAMPLE USAGE -->
<!-- <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/> -->
<!-- <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/> -->

<!-- <FloatingTextInput name="password-confirmation" type="password" isError={! form?.success}
msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
togglePw='["#password-confirmation", "#hs-floating-input-passowrd-value"]'/> -->

<script>
  import FormMessage from '$lib/Components/FormMessage.svelte';

  export let name = 'check-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10), msg = '', isError = true, label = 'Label', tooltip = ' ', gray = false, value = true, checked = false;
</script>

<div class="relative flex-1">
  <div class="hs-tooltip flex items-center">
    <input type="checkbox" {name} id="{name}" {...$$restProps} value={value ?? ''} bind:checked class="hs-tooltip-toggle relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent
              text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none
              checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600
              dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
              before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full
              before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400
              dark:checked:before:bg-blue-200 {gray ? 'bg-gray-100 dark:!bg-neutral-800' : ''} { !msg && gray ? 'border-transparent dark:border-transparent' : ''}
              {msg && isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20' : ''}
              {msg && ! isError ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500 dark:bg-teal-900/20' : ''}">

    <label for={name} class="text-sm text-gray-500 ms-3 dark:text-neutral-400">{label}</label>

    <div class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
      {tooltip}
    </div>
  </div>

  {#if msg}
    <FormMessage type="{isError ? 'error' : 'success'}" {msg}/>
  {/if}
</div>
