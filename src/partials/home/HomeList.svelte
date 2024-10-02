<script>
    import SvgIcon from '$lib/Components/SvgIcon.svelte';
    import List from '$partials/List.svelte';

    export let title, list;
</script>

<section class="w-full mt-10">
    <div class="container-fluid lg:container">
      <div class="row px-4">
        <div class="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <h2 class="text-title relative">
            {title}

            <SvgIcon svgHeight={25} svgWidth={568} data-static class="absolute !w-1/4 -bottom-9 left-1/2">
              <path data-static opacity="1" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="1" stroke-width="5" stroke-linecap="round"/>
            </SvgIcon>
          </h2>
        </div>

        <List list={list} />
      </div>
    </div>
  </section>
