<script>
  import Header from '$partials/Header.svelte';
	import Footer from '$partials/Footer.svelte';
	import { afterNavigate } from '$app/navigation';

	import '../app.scss';

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});

  /** @type {import('./$types').LayoutServerData} */
  export let data;

  $: ({main_nav} = data)
</script>

<Header {main_nav}/>

<slot></slot>

<Footer />
