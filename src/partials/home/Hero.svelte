<script>
	import Typewriter from 'svelte-typewriter';
	import SvgIcon from '$lib/Components/SvgIcon.svelte';
	import { trash } from '$lib/Components/iconPaths';
</script>

<section class="hero min-h-[95dvh] bg-gray-100 lg:min-h-[85dvh]" style="background-image: url('https://images.unsplash.com/photo-1659710173823-b4362e0ab9c7?q=80&w=1920&h=800&fit=crop'); background-size: cover; background-position: center;">
	<div class="container-fluid hero-content mx-auto h-fit px-4 pb-10">
		<div class="w-full">
			<div class="mx-auto flex max-w-screen-lg gap-x-60">
				<div class="flex w-full flex-col md:w-4/5">
					<Typewriter mode="loop" element="h1" --cursor-color="white" --cursor-width="2px" interval={60} wordInterval={2000} unwriteInterval={80}>
						<span data-static>Buy</span>
						<span>eSim</span>
						<span>Software</span>
						<span>Gift Cards</span>
						<span>Google Play</span>
						<span>Phone Top-Up</span>
						<span>Games</span>
						<span>Spotify</span>
						<span>Netflix</span>
						<span>App Store</span>
						<span>Airbnb</span>

						<SvgIcon svgHeight={25} svgWidth={568} data-static class="typewriter-stroke">
              <path data-static opacity="0.7" d="M2 22.5972C104.5 10.5972 295 -16.4028 566 22.5972" stroke="#FFDA1C" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round"/>
						</SvgIcon>
					</Typewriter>

					<h2>With Bitcoin and other Cryptos</h2>
					<p>Online shop with USDT, USDC, and other stable coins is also supported.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero {
		position: relative;

		&::before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			width: 100%;
			background: linear-gradient(100.06deg, #000 26.67%, #ffda1c 100.22%) !important;
			opacity: 0.6;
		}
	}
	.hero-content {
		--tw-text-opacity: 1;

		position: relative;
		height: 35rem;
		width: 100%;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 9rem;
		color: rgb(255 255 255 / var(--tw-text-opacity));
		display: flex;
		flex-direction: column;

		@media (min-width: 600px) {
			padding-left: 2.5rem;
			padding-right: 2.5rem;
		}

		@media (min-width: 960px) {
			height: 45rem;
		}

		.bg-wrapper {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			display: none;
			height: 45rem;
			width: 100%;
			background-size: cover;

			@media (min-width: 960px) {
				display: block;
			}
		}

		:global {
			h1 {
				font-size: 1.5rem;
				font-weight: 700;

				@media (min-width: 600px) {
					font-size: 2.25rem;
				}

				@media (min-width: 1280px) {
					font-size: 3rem;
				}

				&.cursor {
					.typing::after {
						height: 1.3ch;
						margin-left: 0.2ch;
						display: inline-block;
						vertical-align: middle;
					}
				}

				[data-static] * {
					display: inherit !important;
				}

        .typewriter-stroke {
					width: 12.5rem;

					@media (min-width: 960px) {
						margin-left: 6rem;
						width: 24rem;
            margin-top: -2rem;
            margin-bottom: 2rem;
					}
				}

        span:not([data-static]) {
          color: $themePrimary;
        }
			}
		}

		h2 {
			margin-bottom: 1.25rem;
			font-size: 1rem;

			@media (min-width: 960px) {
				font-size: 1.25rem;
			}

			@media (min-width: 1280px) {
				font-size: 2.25rem;
			}
		}

		p {
			margin-bottom: 1.25rem;
			font-size: 0.875rem;
		}
	}
</style>
