<script lang="ts">
	import type { Database } from '$lib/types/supabase';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Bell } from 'svelte-heros-v2';
	import { addToCalendar } from '../../pwa';
	export let appointment:
		| (Database['public']['Tables']['appointment']['Row'] & {
				doctor: Database['public']['Tables']['user_info']['Row'];
		  })
		| null;

	const date = appointment ? new Date(appointment.date!) : new Date();
</script>

{#if appointment}
	<div class="card p-4 m-4">
		<header class="flex items-center justify-between">
			<h1 class="font-bold capitalize">{appointment.name}</h1>
			<button class="btn variant-filled-primary" on:click={() => addToCalendar(appointment)}>
				<Bell /> <span> calendirer </span>
			</button>
		</header>
		<div>
			<h6>
				Le {date.getDate()}/{date.getMonth()}/{date.getFullYear()} à {date.getHours()}:{date.getMinutes()}
			</h6>
		</div>
		<footer class="flex items-center space-x-2 my-4">
			<Avatar src={`https://api.multiavatar.com/${appointment.doctor.user}.svg`} />
			<h3>
				Dr. <span class="">
					{appointment.doctor.name}
					{appointment.doctor.firstName}
				</span>
			</h3>
		</footer>
	</div>
{:else}
	<div class="card p-4 m-4">
		<header>
			<div class="placeholder animate-pulse" />
		</header>
		<div class="py-4">
			<div class="placeholder w-1/3 animate-pulse" />
		</div>
		<footer class="flex items-center space-x-2 my-4">
			<div class="placeholder-circle flex-1 animate-pulse" />
			<div class="placeholder flex-[4] animate-pulse" />
		</footer>
	</div>
{/if}
