<script>
  import SvgIcon from "$lib/Components/SvgIcon.svelte";
  import { exclamationCircle, checkMarkFilled } from "$lib/Components/iconPaths";

  /** @type {string|string[]|undefined} */
  export let msg = [];
  export let type = "error",
    name = "",
    errorIconPosition = type == "error" ? "end-0" : "end-4";
</script>

<div class="absolute bottom-7 top-0 {errorIconPosition} pointer-events-none flex items-center pe-3">
  <SvgIcon
    class="size-4 shrink-0 {type == 'error' ? 'text-red-500' : 'text-teal-500'}"
    svgHeight={24}
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    slot={type == "error" ? exclamationCircle : checkMarkFilled} />
</div>

{#if msg?.toString()}
  <p class="text-sm dark:font-extralight {type == 'error' ? 'text-red-600 dark:text-red-300' : 'datk:text-teal-300 text-teal-600'} ml-2 mt-1 first-letter:uppercase" id="msg-{name}">
    {msg.toString().replaceAll("_", " ")}
  </p>
{/if}
