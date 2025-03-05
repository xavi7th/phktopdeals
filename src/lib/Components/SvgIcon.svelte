<script>
  /**
   * @component
   * An in-place svg icon component
   * inspired by https://medium.com/javascript-in-plain-english/how-to-add-customizable-svg-icons-in-svelte-js-app-488648d302c8
   *
   * @example
   * import SvgIcon from '$lib/Components/SvgIcon.svelte';
   * import {softwareIcon} from '$lib/Components/iconPaths';
   *
   * <SvgIcon class="shrink-0 size-4" slot={leftAngle}/>
   * <SvgIcon class="shrink-0 size-4 text-red-500" svgHeight={24} minHeight="65%" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" slot={exclamationCircle}/>
   *
   * <SvgIcon svgHeight={25} svgWidth={568} data-static class="typewriter-stroke">
   *   <path data-static opacity="0.7" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round"/>
   * </SvgIcon>
   *
   * @property {string} slot the contents of the svg
   * @property {string} stroke the color of the stroke. Default currentColor
   * @property {string} strokeWidth the width of the stroke. Default 2
   * @property {string} fill the fill or the background color of the icon. Default none.
   * @property {number} svgWidth Default 24.
   * @property {number} svgHeight Default 24.
   * @property {string} minHeight Default 10%.
   *
   * @see {@link FormMessage.svelte} for further information on usage.
   */

  let { slot = undefined, fill = "none", minHeight = "10%", svgHeight = 24, svgWidth = svgHeight, stroke = "currentColor", strokeWidth = 2, ...rest } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={svgWidth}
  height={svgHeight}
  viewBox="0 0 {svgWidth} {svgHeight}"
  {fill}
  {stroke}
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width={strokeWidth}
  {...rest}
  style="--min-height:{minHeight}"
  on:click>
  {#if slot}
    {@html slot}
  {:else}
    <slot />
  {/if}
</svg>

<style lang="scss">
  svg {
    min-height: var(--min-height);

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }
</style>
