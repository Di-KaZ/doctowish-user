<script lang="ts">
	import { fetchDoctors } from '$lib/supabase';
	import Doctor from '$lib/components/Doctor.svelte';
	let date: string;
	let name: string;
</script>

<div class="w-full h-full">
	<div class="flex items-center flex-col m-4 space-y-4">
		{#await fetchDoctors()}
			<Doctor doctor={null} />
			<Doctor doctor={null} />
			<Doctor doctor={null} />
			<Doctor doctor={null} />
		{:then doctors}
			{#each doctors as doctor}
				<Doctor {doctor} />
			{/each}
		{/await}
	</div>
</div>
