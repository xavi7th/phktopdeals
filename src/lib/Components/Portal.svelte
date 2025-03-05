<script>
	/**
   * @type {HTMLDivElement | undefined}
   */
	let ref = $state();
	let {children, shouldMount = false} = $props(); //shouldMount is a boolean prop that determines whether the portal should be mounted or not. This is used to delay mounting the portal until the hydration process is completed avoiding issues like ILLEGAL INVOCATION errors where a form is going to be nested inside another form initially.

	$effect(() => {
		ref && document.body.appendChild(ref);

		return () => {
			if (ref?.parentNode) {
        ref.parentNode.removeChild(ref);
      }
		}
	});
</script>

{#if shouldMount}
  <div bind:this={ref}>
    {@render children?.()}
  </div>
{/if}
