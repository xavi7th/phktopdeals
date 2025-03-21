<!-- EXAMPLE USAGE -->

<!-- <LoadingButton class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700" label="Create Account" bind:submitting={$submitting} /> -->

<!-- <LoadingButton class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700" {timeout} {delayed} {submitting}>
  Pay with Crypto { percentageCalculation($form.unit_price, $form.quantity, product.product_price.commission, product.percentage_discount) }
</LoadingButton> -->

<script>
  import { cn } from "$lib/helpers";
  import { readable } from "svelte/store";
  import { animatedDotsSVG, spinnerSVG } from "../iconPaths";

  let { class: className = "", timeout = readable(false), delayed = readable(false), submitting = $bindable(readable(false)), disabled = false, label = "", children = undefined, overwriteStyles = false, ...rest } = $props();

  let classes = overwriteStyles ? className : cn(
    "inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:bg-brand-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
    className,
  );
</script>

<button
  {...rest}
  class={classes}
  disabled={$submitting || disabled}
  on:click
  on:mouseover
  on:mouseleave
  on:focus
  on:blur>
  {#if $timeout}
    Still Loading {@html animatedDotsSVG}
  {:else}
    {#if label}
      {label}
    {:else}
      {@render children?.()}
    {/if}
    {#if $delayed}
      {@html spinnerSVG}
    {/if}
  {/if}
</button>
