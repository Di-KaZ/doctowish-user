<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let onClick: () => Promise<void>;
	let promise: Promise<void> | null = new Promise(() => {});

	async function internalClick(): Promise<void> {
		promise = onClick();
		await promise;
		promise = null;
	}
</script>

<button class="{$$restProps.class} || ''" on:click={internalClick}>
	{#if promise}
		<ProgressRadial class="w-5 mr-4" track="stroke-surface-800/30" />
	{/if}
	<slot />
</button>
