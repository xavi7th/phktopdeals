<script>
  /**
   * An in-place svg icon component
   * inspired by https://medium.com/javascript-in-plain-english/how-to-add-customizable-svg-icons-in-svelte-js-app-488648d302c8
   *
   * @example
   * import SvgIcon from '$lib/Components/SvgIcon.svelte';
   * import {trash} from '@miscellaneous-cpmponents/SvgIcon/iconDefs';
   *
   * <SvgIcon svgHeight={24} svgWidth={24} data-static class="typewriter-strok" path={trash}/>
   *
   * <SvgIcon svgHeight={25} svgWidth={568} data-static class="typewriter-stroke">
   *   <path data-static opacity="0.7" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round"/>
   * </SvgIcon>
   *
   * @property {String} path the icon path attribute gotten from https://heroicons.com/ and imported from iconDefs.js
   * @property {String} className classes to pass to the svg element
   * @property {Number} strokeWidth the stroke with attribute. Default 2
   * @property {String} color the color of the icon. Default white.
   * @property {String} fill the fill or the background color of the icon. Default none.
   * @property {Number} opacity the opacity of the svg oath. Default 1.
   * @property {Number} svgWidth Default 24.
   * @property {Number} svgHeight Default 24.
   * @property {HTMLELement} pathElem Alternative path html element to be child to the svg.
   *
   *
   * @see {@link ManageResellers.svelte} for further information on usage.
   */

	export let path='', strokeWidth = 2, color = '#fff', fill = 'none', height = '100%', svgHeight = 24, svgWidth = 24, opacity = 1;

  $: props = (({ path, strokeWidth, color, fill, height, svgHeight, svgWidth, opacity, ...rest }) => rest)($$props);

  $: console.log($$slots);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="{svgWidth}" height="{svgHeight}" viewBox="0 0 {svgWidth} {svgHeight}" fill="{fill}" {...props} style="--height:{height}" on:click>
  <slot />

  {#if ! Object.entries($$slots).length}
    <path {opacity} d={path} stroke="{color}" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round"/>
  {/if}
</svg>

<style lang="scss">
  svg{
    padding: 10px;
    width: auto;
    min-height: var(--height);

    &.left{
      left: 0;
    }

    &.right{
      right: 0;
    }
  }
</style>
