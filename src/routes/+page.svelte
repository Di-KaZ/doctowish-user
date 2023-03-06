<script lang="ts">
	import { getUserApointments, supabase } from '$lib/supabase';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let user = supabase.auth.getUser();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#await user}
	<ProgressRadial class="w-12" />
{:then { data: { user }, error }}
	<div class="card">
		{#if !user}
			<h1>Not logged in</h1>
		{:else}
			{#await getUserApointments()}
				<ProgressRadial class="w-12" />
			{:then data}
				{#if !data}
					<h1>No appointments</h1>
				{:else}
					<h1>Appointments</h1>
					{#each data as appointment}
						<div class="card">
							<h1>{appointment.name}</h1>
							<p>{appointment.date}</p>
							<p>{`${appointment.doctor.name} ${appointment.doctor.firstName}`}</p>
						</div>
					{/each}
				{/if}
			{/await}
		{/if}
	</div>
{/await}
