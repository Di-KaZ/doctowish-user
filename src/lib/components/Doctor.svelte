<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Database } from '$lib/types/supabase';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Calendar } from 'svelte-heros-v2';
	export let doctor: Database['public']['Tables']['user_info']['Row'] | null = null;
</script>

{#if doctor !== null}
	<div class="card m-4 p-4 w-full">
		<header class="flex items-center flex-col ">
			<Avatar src={`https://api.multiavatar.com/${doctor.user}.svg`} width="w-28" />
			<h1 class="capitalize">Dr. {doctor.name} {doctor.firstName}</h1>
			<h4>{doctor.profession}</h4>
		</header>
		<footer class="flex items-center space-x-2 my-4 justify-center">
			<button
				on:click={() => goto(`/doctors/rdv/${doctor?.id}`)}
				class="btn variant-filled-tertiary"
			>
				<Calendar class="mx-2" />
				rendez-vous
			</button>
		</footer>
	</div>
{/if}

{#if doctor === null}
	<div class="card m-4 p-4 w-full">
		<header class="flex items-center flex-col">
			<div class="placeholder-circle w-28 h-28 animate-pulse" />
			<div class="placeholder animate-pulse w-full h-7 mt-4" />
		</header>
		<footer class="flex items-center space-x-2 my-4 justify-center">
			<div class="placeholder h-12 w-1/2 animate-pulse" />
		</footer>
	</div>
{/if}
