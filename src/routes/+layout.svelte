<script>
	import { afterNavigate } from '$app/navigation';

	import '../app.scss';

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});
</script>


<slot></slot>

