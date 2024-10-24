<script>
	import { pageTitle } from '$stores';
	import { afterNavigate } from '$app/navigation';

	import '../app.scss';

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});
</script>

<svelte:head>
	<title>{$pageTitle.title}</title>
</svelte:head>

<slot></slot>

