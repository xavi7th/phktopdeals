<script>
  import Wallet from './Wallet.svelte';
	import Table from '$lib/Components/Table.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

  $: ({ currencies, wallet_balance } = data);
</script>

<svelte:head>
  <title>Top Up Wallet | PHKHotDeals</title>
  <meta name="description" content="Top up your wallet in your favorite crypto currency or bank transfer to ensure seamless transactions when .">
</svelte:head>

<section class="col-span-5 mx-auto min-w-[70%] px-4 py-16 sm:px-6 lg:col-span-4 lg:col-start-2 lg:px-8 lg:py-24">
	<Wallet data={data.form} {currencies} {wallet_balance} />

	<Table />
</section>
