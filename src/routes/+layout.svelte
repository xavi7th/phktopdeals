<script>
  import Header from '$partials/Header.svelte';
	import { afterNavigate } from '$app/navigation';

	import '../app.scss';

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});
</script>

<Header />

<slot></slot>
