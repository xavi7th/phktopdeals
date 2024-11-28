<!-- EXAMPLE USAGE -->

<!-- <LoadingButton class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700" label="Create Account" bind:submitting={$submitting} /> -->

<!-- <LoadingButton class="mt-10 bg-black px-10 py-4 font-medium hover:bg-gray-700 hover:text-neutral-50 focus:bg-gray-700" {timeout} {delayed} {submitting}>
  Pay with Crypto { percentageCalculation($form.unit_price * $form.quantity, product.product_price.commission, product.percentage_discount) }
</LoadingButton> -->

<script>
	import { cn } from '$lib/helpers';
	import { readable } from 'svelte/store';
  import { animatedDotsSVG, spinnerSVG } from '../iconPaths';

  export { className as class };
  export let timeout = readable(false), delayed = readable(false), submitting = readable(false), label = '';

  let className = '';
</script>

<button {...$$restProps} class={cn('w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none', className)} disabled={$submitting}>
  {#if $timeout}
    Still Loading {@html animatedDotsSVG}
  {:else}
    {#if label} {label} {:else} <slot /> {/if}
    {#if $delayed} {@html spinnerSVG} {/if}
  {/if}
</button>
