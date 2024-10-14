<script>
  /**
   * An in-place svg icon component
   * inspired by https://medium.com/javascript-in-plain-english/how-to-add-customizable-svg-icons-in-svelte-js-app-488648d302c8
   *
   * @example
   * import SvgIcon from '$lib/Components/SvgIcon.svelte';
   * import {softwareIcon} from '$lib/Components/iconPaths';
   *
   * <SvgIcon class="shrink-0 size-4 text-red-500" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={exclamationCircle}/>
   *
   * <SvgIcon svgHeight={25} svgWidth={568} data-static class="typewriter-stroke">
   *   <path data-static opacity="0.7" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round"/>
   * </SvgIcon>
   *
   * @property {string} slot the contents of the svg
   * @property {number} strokeWidth the stroke with attribute. Default 2
   * @property {string} fill the fill or the background color of the icon. Default none.
   * @property {number} svgWidth Default 24.
   * @property {number} svgHeight Default 24.
   * @property {string} minHeight Default 10%.
   *
   * @see {@link FormMessage.svelte} for further information on usage.
   */

	export let slot = undefined, fill = 'none', minHeight = '10%', svgHeight = 24, svgWidth = svgHeight;

  $: props = (({ slot, fill, minHeight, svgHeight, svgWidth, ...rest }) => rest)($$props);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="{svgWidth}" height="{svgHeight}" viewBox="0 0 {svgWidth} {svgHeight}" fill="{fill}" {...props} style="--min-height:{minHeight}" on:click>
  <slot />

  {#if ! Object.entries($$slots).length}
    {@html slot}
  {/if}
</svg>

<style lang="scss">
  svg{
    min-height: var(--min-height);

    &.left{
      left: 0;
    }

    &.right{
      right: 0;
    }
  }
</style>
