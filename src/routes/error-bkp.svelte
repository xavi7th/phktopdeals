<script>
  import { page } from "$app/stores";

  $: console.log("page", $page);
</script>

<main class="error-page py-40">
  <div class="container flex flex-col items-center gap-y-16 text-center">
    <div class="eyes flex justify-center gap-0.5">
      <div class="eye grid h-20 w-20 place-items-center rounded-[50%] bg-yellow-500 dark:bg-brand">
        <div class="eye-pupil pupil-left h-6 w-6 rounded-[50%] bg-gray-700"></div>
      </div>
      <div class="eye grid h-20 w-20 place-items-center rounded-[50%] bg-yellow-500 dark:bg-brand">
        <div class="eye-pupil pupil-right h-6 w-6 rounded-[50%] bg-gray-700"></div>
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
      <p class="text-md mt-2.5 text-black dark:text-white">{$page.status} error</p>
    </div>

    <a
      class="cta border-sm border-md rounded-xl border-2 border-brand-400 px-8 py-4 capitalize text-black shadow-md shadow-brand-500 transition hover:bg-brand-400 hover:font-semibold hover:text-white dark:text-white"
      href="/"
      aria-label="back to home"
      title="back to home">
      back to home
    </a>
  </div>
</main>

<style lang="scss">
  .cta {
    box-shadow: 0 7px 0 -2px $themePrimary;
  }

  .eye-pupil {
    animation: movePupil 2s infinite ease-in-out;
    transform-origin: center center;

    &.pupil-right {
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
