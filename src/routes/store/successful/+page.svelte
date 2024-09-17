<script>

</script>

<main class="container">
  <div class="row">
      <section class="py-28 lg:py-40 cols-12 flex flex-col items-center justify-center" style="gap: 20px; padding-block: 300px;">
        <svg viewBox="0 0 24 24" width="150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#342" stroke-width="1.5" stroke-linecap="round" class="rotate"></path> 
            </g>
        </svg>
        <div class="flex flex-col items-center justify-center" style="gap: 20px;">
            <p class="text-md">Your transaction has been completed successfully. We have emailed you details of your order.</p>
            <div>
                <a href="/" class="py-1.5 px-5 inline-flex items-center font-medium rounded-lg border border-transparent bg-brand text-brand-800 hover:bg-brand-700 hover:text-brand-50 focus:outline-none focus:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none">
                    Go Back Home
                </a>
            </div>
        </div>
      </section>
  </div>
</main>

<style>
    .rotate {
        transform-origin: center;
        animation: rotate 2s infinite linear;
    }
    @keyframes rotate {
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>
