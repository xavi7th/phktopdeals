<script>
	import { cn } from '$lib/helpers';
	import { fly } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	export { className as class };

	export let hideZeroValues = false, // toggles whether to display 0d 0h 05m or just the 05m
    /** @type {string|number} */
    date = new Date().getTime() + 10000, // example Jan 5, 2030 15:37:25 or epoch timestamp
		hideOnFinish = false, // remove the displayText when it finishes
		invisible = false, // Make the timer run without any visual display on the page
		singleCharacterTimer = true, // changes the displays to be 5m or 5 minutes
    timerClasses = 'font-bold text-xl',
		onFinish = () => console.log('-----===== Timer Ended! =====------');

	let className = '',
		displayText = '',
		/** @type {number|undefined} */
		intervalId = undefined,
    countDownEpoch = 0;

	function resetInterval() {
    displayText = '';
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = undefined;
		}
	}

	function tick() {
    let now = new Date().getTime(); // Get current epoch time
		let distance = countDownEpoch - now; // Find the distance between now and the count down date
		let seconds = Math.floor((distance / 1000) % 60);
		let minutes = Math.floor((distance / (1000 * 60)) % 60);
		let hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
		let days = Math.floor(distance / (1000 * 60 * 60) / 24);

		displayText = '';

		if (hideZeroValues) {
			if (days > 0)
				displayText += ` ${days > 9 ? '' : 0}${days}${singleCharacterTimer ? 'd' : days > 1 ? ' days' : ' day'}`;
			if (hours > 0)
				displayText += ` ${hours > 9 ? '' : 0}${hours}${singleCharacterTimer ? 'h' : hours > 1 ? ' hours' : ' hour'}`;
			if (minutes > 0)
				displayText += ` ${minutes > 9 ? '' : 0}${minutes}${singleCharacterTimer ? 'm' : minutes > 1 ? ' minutes' : ' minute'}`;
			if (seconds >= 0)
				displayText += ` ${seconds > 9 ? '' : 0}${seconds}${singleCharacterTimer ? 's' : seconds > 1 ? ' seconds' : ' second'}`;
		} else {
			displayText = ` ${days > 9 ? '' : 0}${days}${singleCharacterTimer ? 'd' : days > 1 ? ' days' : ' day'}
               ${hours > 9 ? '' : 0}${hours}${singleCharacterTimer ? 'h' : hours > 1 ? ' hours' : ' hour'}
               ${minutes > 9 ? '' : 0}${minutes}${singleCharacterTimer ? 'm' : minutes > 1 ? ' minutes' : ' minute'}
               ${seconds > 9 ? '' : 0}${seconds}${singleCharacterTimer ? 's' : seconds > 1 ? ' seconds' : ' second'}`;
		}

    if (distance <= 0) {
			resetInterval();

			if (! hideOnFinish && ! $$slots.contentAfterCountdown) {
				displayText = '00 s';
			}

			onFinish();
      countDownEpoch = -1;
			// $emit('timer-stopped', { intervalId: intervalId, distance: distance });
		}
	}

	onMount(() => {
    countDownEpoch = new Date(date).getTime();

		resetInterval();

		intervalId = setInterval(tick, 1000);
	});

	onDestroy(() => resetInterval());
</script>

<!-- EXAMPLE USAGE -->
<!-- <CountdownTimer date={new Date().getTime() + 10000} onFinish={() => alert('time up!')} invisible/> -->
<!--
<CountdownTimer class="text-gray-300 text-center px-4" date='Jan 5, 2030 15:37:25' onFinish={() => timeUp = true} hideZeroValues hideOnFinish singleCharacterTimer={false} transitionKey={2}>
  <svelte:fragment slot="beforeDisplayText">
    <span>Validating withdrawal in </span>
  </svelte:fragment>
  <svelte:fragment slot="contentAfterCountdown">
    <span transition:fade>Time Up</span>
  </svelte:fragment>
</CountdownTimer>
-->

<!-- TODO: Implement seconds only counter e.g. 300 seconds ... -->
<!-- TODO: Implement minutes and seconds only counter eg 73 minutes 59 seconds -->
<!-- TODO: Implement hours, minutes and seconds only counter eg 27 hours 59 minutes 59 seconds -->

<div class={cn('relative min-h-6 text-center', className)} class:hidden={invisible}>
	{#if displayText}
		<p class="mb-0 whitespace-nowrap" in:fly={{ y: 10, duration: 500 }} out:fly={{ y: -30, duration: 400 }}>
			<slot name="beforeDisplayText" />

			<span class="{timerClasses}">{displayText}</span>

			<slot name="afterDisplayText" />
		</p>

		<slot />
	{/if}

	{#if $$slots.contentAfterCountdown && countDownEpoch == -1}
		<p class="mb-0 whitespace-nowrap"
			in:fly={{ x: -20, duration: 600, delay: 500 }}
			out:fly={{ x: 30, duration: 500 }}
		>
			<slot name="contentAfterCountdown" />
		</p>
	{/if}
</div>
