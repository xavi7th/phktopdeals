<!-- @see https://github.com/svelte-plugins/datepicker?tab=readme-ov-file -->
<!-- EXAMPLE USAGE -->
<!-- <FloatingDateInput name="discount_until" enablePastDates={false} label="Discount Valid Until (optional)" bind:value={$formData.discount_until} msg={$errors?.discount_until?.[0]} /> -->
<script>
  import { format } from "date-fns";
  import { DatePicker } from "@svelte-plugins/datepicker";
  import FormMessage from "$lib/Components/FormMessage.svelte";

  export let name = "input-" + crypto.randomUUID().replaceAll("-", "").substring(0, 10),
    label = "",
    className = "",
    placeholder = undefined,
    gray = false,
    isError = true,
    size = "p-4",
    showTimePicker = false,
    enableFutureDates = true,
    enablePastDates = true,
    /** @type {null | undefined | string | Date}*/ endDate = null,
    /** @type {string | undefined} */ msg = undefined,
    /** @type {string | undefined | null} */ value = undefined;

  let startDate = new Date();
  let dateFormat = "MM/dd/yy";
  let isOpen = false;

  const formatDate = (/** @type {string | number | Date} */ dateString) => {
    // @ts-ignore
    if (isNaN(new Date(dateString))) {
      return "";
    }

    return (dateString && format(new Date(dateString), dateFormat)) || "";
  };

  const onChange = () => {
    startDate = new Date(value || "");
  };

  const onNavigationChange = (/** @type { {direction: string, isPastPeriod: boolean, type: string, currentPeriod: {start: string, end: string} } } */ e) => {
    console.log(e, "onNavigationChange");
  };

  const onDateChange = (/** @type { {startDate: number, startTime: string} } */ args) => {
    console.log(args, "onDateChange");
  };

  $: value = formatDate(startDate);
</script>

<div class="relative">
  <DatePicker bind:isOpen bind:startDate bind:endDate {onNavigationChange} {onDateChange} {showTimePicker} {enableFutureDates} {enablePastDates}>
    <div class="relative flex-1 {className}">
      <input
        {name}
        id={name}
        type="text"
        bind:value
        on:change={onChange}
        on:click={() => (isOpen = !isOpen)}
        spellcheck="false"
        autocorrect="off"
        autocapitalize="off"
        class="peer block w-full rounded-lg border-gray-200 {size} text-sm placeholder:text-transparent autofill:pb-2 autofill:pt-6
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
        <span class="ml-5 text-xs text-gray-400">{placeholder}</span>
      </label>

      {#if msg?.toString()}
        <FormMessage type={isError ? "error" : "success"} {msg} />
      {/if}
    </div>
  </DatePicker>
</div>
