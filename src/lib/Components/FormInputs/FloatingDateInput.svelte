<!-- EXAMPLE USAGE -->
<!-- <FloatingTextInput name="email" isError={! form?.success} msg={form?.success || form?.errors?.email && form?.errors?.email[0]} label="Email"/> -->
<!-- <FloatingTextInput name="password" type="password" isError={! form?.success} msg={form?.success || form?.errors?.password && form?.errors?.password[0]} label="Password" togglePw='"#password"'/> -->

<!-- <FloatingTextInput name="password-confirmation" type="password" isError={! form?.success}
                msg={form?.success || form?.errors?.password_confirmation && form?.errors?.password_confirmation[0]} label="Confirm Password *"
                togglePw='["#password-confirmation", "#hs-floating-input-password-value"]'/> -->
<script>
  import { onMount } from "svelte";
  import { cn } from "$lib/helpers";
  import DatePicker from "stwui/date-picker";

  export let name = "input-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10),
    format = "MMMM D, YYYY",
    label = "",
    inputClasses = "",
    min = undefined;

  /** @type {string|undefined} */
  export let msg = undefined;

  /** @type {string|null} */
  export let value;

  let elem;

  onMount(() => {
    elem = document.getElementById(`${name}-visual`);
    elem?.classList.add(...cn("h-auto px-8 pt-4", inputClasses).split(" "));
    elem?.setAttribute("spellCheck", false);
    elem?.setAttribute("autoCorrect", "off");
    elem?.setAttribute("autoCapitalize", "off");
  });
</script>

<div class="relative">
  <DatePicker {name} bind:value label="Date" error={msg} {format} {min}>
    <DatePicker.Label slot="label" class="pointer-events-none absolute start-0 top-0 z-10 h-full -translate-y-2 truncate border border-transparent p-4 text-xs capitalize text-gray-500 dark:text-neutral-500">
      {label}
    </DatePicker.Label>
  </DatePicker>
</div>
