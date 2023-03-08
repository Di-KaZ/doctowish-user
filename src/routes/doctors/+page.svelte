<script lang="ts">
	import { fetchDoctors } from '$lib/supabase';
	import Doctor from '$lib/components/Doctor.svelte';
	let date: string;
	let name: string;
</script>

<div class="w-full h-full">
	<div class="grid grid-cols-1 lg:grid-cols-2 m-4 gap-4">
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
