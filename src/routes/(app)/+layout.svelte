<script>
  import Header from '$partials/Header.svelte';
  import Footer from '$partials/Footer.svelte';

  /** @type {import('./$types').LayoutServerData} */
  export let data;

  $: ({main_nav} = data)
</script>

<Header {main_nav}/>

<slot></slot>

<Footer />
