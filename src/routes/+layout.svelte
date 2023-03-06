<script>
	import '../app.postcss';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<main class="w-screen h-screen">
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar>
				<svelte:fragment slot="lead">+</svelte:fragment>
				DoctoWish
				<svelte:fragment slot="trail">
					<div class="mx-4">
						<LightSwitch />
					</div>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
		<!-- Router Slot -->
		<slot />
		<!-- ---- / ---- -->
		<svelte:fragment slot="footer">Footer</svelte:fragment>
	</AppShell>
</main>
