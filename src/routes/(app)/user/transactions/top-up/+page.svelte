<script>
  import { onMount } from "svelte";
  import Toast from "$lib/Components/Toast.svelte";
  import { PUBLIC_VITE_BASE_API } from "$env/static/public";
  import CountdownTimer from "$lib/Components/CountdownTimer.svelte";

  export let data;

  /** @type {EventSource} */
  let evtSrc;
  let refreshedStatus = "";
  let priceExpired = false;
  let message = { type: "", msg: "" };

  $: ({ currency, amount, details, qrCode } = data);

  onMount(() => {
    evtSrc = new EventSource(`${PUBLIC_VITE_BASE_API}user-transactions/${details?.transaction.id}/status-update`, {
      withCredentials: true,
    });

    evtSrc.onopen = (e) =>
      (evtSrc.onmessage = (e) => {
        refreshedStatus = JSON.parse(e.data).status;

        if (refreshedStatus === "failed") {
          message = { type: "error", msg: "Transaction failed! Please go back and try again." };
          evtSrc.close();

          setTimeout(() => {
            window.location.href = "/user/transactions";
          }, 5000);
        }

        if (refreshedStatus === "finished") {
          message = { type: "success", msg: "Transaction completed! Redirecting you to your wallet dashboard ..." };
          evtSrc.close();

          setTimeout(() => {
            window.location.href = "/user/transactions";
          }, 5000);
        }
      });
    evtSrc.onerror = (e) => console.log("An error occurred with the SSE: ", e);

    return () => evtSrc.close();
  });
</script>

{#if message.msg}
  <div class="fixed end-3 top-24 z-50 space-y-3">
    <Toast type={message.type} msg={message.msg} />
  </div>
{/if}

<div class="z-0 bg-slate-50 p-10 text-gray-900">
  <div class="mx-4 mt-4 rounded-lg bg-white p-4 text-center md:mt-6 lg:mx-6 lg:mt-12 lg:px-6">
    <h2 class="relative my-2 w-full max-w-full flex-shrink-0 basis-full px-3.5 text-center text-[32px] font-medium leading-10">
      <b>Payment Information for ${amount}</b>
    </h2>
    <p class="mb-4">
      Transaction ID: <b>{details?.transaction?.id}</b>
    </p>
    <div class="flex items-center justify-center">
      {#if !priceExpired}
        <img src={qrCode} alt="Wallet QR Code" />
      {:else}
        <div class="mb-8 h-96 w-96 bg-black"></div>
      {/if}
    </div>
    <div id="time" class="mb-4">
      <CountdownTimer hideZeroValues date={new Date(details?.expiration_estimate_date).getTime()} onFinish={() => (priceExpired = true)}>
        {#snippet beforeDisplayText()}
          <span>Time Left:</span>
        {/snippet}

        {#snippet contentAfterCountdown()}
          <span class="block text-xl font-semibold text-red-600">Price Expired!! Refresh the page to get a new amount to send.</span>
        {/snippet}
      </CountdownTimer>
    </div>
    <p class="mb-4">
      Status: <b class="uppercase">{priceExpired ? "Expired" : refreshedStatus || details?.payment_status}</b>
    </p>
    <p class="mb-4">
      Total Amount To Send:
      <b>
        {details?.pay_amount}
        <span class="uppercase">{currency}</span>
        {#if !priceExpired}
          <span class="block text-red-600">(Please cover network fees from your wallet or exchange to avoid payment delays)</span>
        {/if}
      </b>
    </p>
    <p class="mb-4">
      Send To Address: <b>{priceExpired ? "N/A" : details?.pay_address}</b>
    </p>
    <div class="mt-4">
      <p class="mb-4 text-left">
        <b>Note :</b>
        Allow the payment processor 10-60 minutes to credit your funds. Avoid creating a support ticket during this time.
      </p>

      <div class="my-8 flex justify-center">
        <a
          data-sveltekit-replacestate
          data-sveltekit-reload
          href="/user/transactions"
          class="inline-flex text-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2.5 text-sm font-bold uppercase text-white shadow-md hover:bg-red-500 focus:bg-red-500"
          on:click={() => evtSrc.close()}>
          Cancel this Transaction
        </a>
      </div>
    </div>
  </div>
</div>
