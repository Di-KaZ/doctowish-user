<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createAppointment, fetchDoctorById, showMessage } from '$lib/supabase';
	import type { Database } from '$lib/types/supabase';
	import { Avatar } from '@skeletonlabs/skeleton';

	let doctor: Promise<Database['public']['Tables']['user_info']['Row'] | null> = fetchDoctorById(
		parseInt($page.params.id)
	);

	let title: string = '';
	let date: string = '';

	function appointement(doctorId: number) {
		createAppointment(doctorId, date, title);
		showMessage('Rendez-vous pris avec succès !');
		goto('/');
	}
</script>

<div class="m-4">
	<h1>Prendre rendez-vous</h1>
</div>
<div class="flex itens-center justify-center items-center flex-col w-full">
	<div class="flex items-center justify-center m-4 flex-col  max-w-2xl">
		{#await doctor}
			<div class="placeholder-circle w-36 h-36 animate-pulse" />
			<div class="flex space-x-2 w-full items-center justify-center">
				<h1>Dr.</h1>
				<div class="placeholder h-7 w-1/3 animate-pulse" />
				<div class="placeholder h-7 w-1/3 animate-pulse" />
			</div>
		{:then doctor}
			<Avatar src={`https://api.multiavatar.com/${doctor?.user}.svg`} width="w-36" />
			<h1>Dr. {doctor?.name} {doctor?.firstName}</h1>
		{/await}
	</div>
	<!-- rendez-vous form -->
	<div class="grid grid-cols-2 gap-4 m-4  max-w-2xl">
		<label for="title" class="label col-span-2">
			Title
			<input type="title" name="title" class="input p-2" bind:value={title} />
		</label>
		<label for="date" class="label col-span-2">
			Date
			<input type="datetime-local" name="date" class="input" bind:value={date} />
		</label>
		<div class="col-span-2 flex justify-center">
			{#await doctor}
				<div class="placeholder h-11 w-1/2 animate-pulse" />
			{:then doctor}
				<button class="btn variant-filled-tertiary" on:click={() => appointement(doctor?.id ?? -1)}
					>Prendre rendez-vous</button
				>
			{/await}
		</div>
	</div>
</div>
