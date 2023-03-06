<script>
	import '../app.postcss';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch, AppRail } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
</script>

<main class="w-screen h-screen">
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar padding="p-2">
				<h1
					class="font-kala-important bg-gradient-to-br from-primary-500 via-tertiary-500 to-secondary-500 bg-clip-text text-transparent box-decoration-clone"
				>
					DoctoWish
				</h1>
			</AppBar>
		</svelte:fragment>

		<svelte:fragment slot="sidebarLeft">
			<div class="hidden lg:inline">
				<AppRail selected={writable(1)}>
					<svelte:fragment slot="lead">
						<!-- AppRailTiles -->
						<LightSwitch />
					</svelte:fragment>
					<!-- AppRailTiles -->
					<svelte:fragment slot="trail">
						<!-- AppRailTiles -->
					</svelte:fragment>
				</AppRail>
			</div>
		</svelte:fragment>
		<!-- Router Slot -->
		<slot />
		<!-- ---- / ---- -->
		<svelte:fragment slot="footer">
			<div class="lg:hidden">
				<AppBar />
			</div>
		</svelte:fragment>
	</AppShell>
</main>
