<script>
  import SvgIcon from "$lib/Components/SvgIcon.svelte";

  export let title = "Section Title",
    titleClass = "",
    svgClass = "",
    sectionClass = "text-center",
    strokeColor = "";
</script>

<div class="mx-auto mb-12 max-w-2xl lg:mb-16 {sectionClass}" {...$$restProps}>
  <h2 class="text-title relative {titleClass}">
    {title}

    <SvgIcon svgHeight={25} svgWidth={568} data-static class="absolute -bottom-9 left-1/2 !w-1/4 stroke-brand {svgClass}">
      <path data-static opacity="1" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke={strokeColor} stroke-opacity="1" stroke-width="5" stroke-linecap="round" />
    </SvgIcon>
  </h2>
</div>
