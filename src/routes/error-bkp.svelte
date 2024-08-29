<script>
  import { page } from '$app/stores'

  $: console. log ('page', $page);
</script>

<main class="error-page py-40">
	<div class="container flex flex-col items-center text-center gap-y-16">
		<div class="eyes flex justify-center gap-0.5">
			<div class="eye w-20 h-20 bg-yellow-500 dark:bg-brand rounded-[50%] grid place-items-center">
				<div class="w-6 h-6 bg-gray-700 rounded-[50%] eye-pupil pupil-left"></div>
			</div>
			<div class="eye w-20 h-20 bg-yellow-500 dark:bg-brand rounded-[50%] grid place-items-center">
				<div class="w-6 h-6 bg-gray-700 rounded-[50%] eye-pupil pupil-right"></div>
			</div>
		</div>

		<div>
			<h1 class="capitalise text-4xl font-semibold text-yellow-500 dark:text-brand">
        {#if $page.status == 404}
          Looks like you're lost
        {:else}
          {$page.error?.message}
        {/if}
      </h1>
			<p class="mt-2.5 text-md text-black dark:text-white">{$page.status} error</p>
		</div>

		<a class="cta hover:bg-brand-400 border-2 border-sm border-brand-400 text-black hover:text-white hover:font-semibold dark:text-white py-4 px-8 border-md shadow-md shadow-brand-500 transition capitalize rounded-xl" href="/" aria-label="back to home" title="back to home">
      back to home
    </a>
	</div>
</main>

<style lang="scss">
  .cta {
    box-shadow: 0 7px 0 -2px $themePrimary;
  }

  .eye-pupil{
    animation: movePupil 2s infinite ease-in-out;
    transform-origin: center center;

    &.pupil-right{
      // To reverse the animation of the right eye, uncomment this.
      // animation-direction: reverse;
    }

    @keyframes movePupil {
      0%,
      100% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(-10px, -10px);
      }
      50% {
        transform: translate(10px, 10px);
      }
      75% {
        transform: translate(-10px, 10px);
      }
    }
  }
</style>
