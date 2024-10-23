<script>
  import Header from '$partials/Header.svelte';
	import Footer from '$partials/Footer.svelte';
	import { afterNavigate } from '$app/navigation';

	import '../app.scss';

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});
</script>

<Header />

<slot></slot>

<Footer />
