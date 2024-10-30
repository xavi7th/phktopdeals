<!-- EXAMPLE USAGE -->
<!-- <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/> -->
<!-- <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/> -->

<!-- <FloatingTextInput name="password-confirmation" type="password" isError={! form?.success}
                msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
                togglePw='["#password-confirmation", "#hs-floating-input-passowrd-value"]'/> -->
<script>
	import { cn } from '$lib/helpers';
import DatePicker from 'stwui/date-picker';
	import { onMount } from 'svelte';

  export let name = 'input-' + crypto.randomUUID().replaceAll('-', '').substring(0, 10), format = 'MMMM D, YYYY', label = '', inputClases = '';

  /** @type {string|string[]|undefined} */
  export let msg = [];

  /** @type {Date|undefined} */
  export let value;

  let elem;

  onMount(() => {
    elem = document.getElementById(`${name}-visual`);
    elem?.classList.add(...cn('px-8 pt-4 h-auto', inputClases).split(' '))
    elem?.setAttribute('spellCheck', false)
    elem?.setAttribute('autoCorrect', 'off')
    elem?.setAttribute('autoCapitalize', 'off')
  })
</script>

<div class="relative">
  <DatePicker {name} bind:value label="Date" error={msg} {format}>
    <DatePicker.Label slot="label" class="absolute z-10 top-0 start-0 p-4 h-full truncate pointer-events-none border border-transparent text-xs capitalize -translate-y-2 text-gray-500 dark:text-neutral-500">{label}</DatePicker.Label>
  </DatePicker>
</div>
