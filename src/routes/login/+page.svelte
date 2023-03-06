<script lang="ts">
	import { createUser, loginUser, supabase, logoutUser, getLoggedUser } from '$lib/supabase';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import AsyncButton from '../../components/AsyncButton.svelte';

	let loading: boolean;
	let error: string | null;
	let email: string = '';
	let password: string = '';
	let user = getLoggedUser();

	async function login() {
		error = await loginUser(email, password);
		if (!error) {
			user = getLoggedUser();
		}
	}

	async function register() {
		error = await createUser(email, password);
		if (!error) {
			user = getLoggedUser();
		}
	}

	async function logout() {
		error = await logoutUser();
		if (!error) {
			user = getLoggedUser();
		}
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full h-full flex items-center justify-center">
	<div class="max-w-6xl">
		{#await user}
			<ProgressRadial class="w-12" />
		{:then user}
			{#if user === null}
				<header class="card-header">
					<h1 class="text-center">Connection</h1>
				</header>
				<div class="p-4 grid grid-rows-2 grid-cols-1 gap-4">
					<input class="input p-2" placeholder="toto@gmail.com" bind:value={email} />
					<input class="input p-2" placeholder="Password" type="password" bind:value={password} />
					{#if error}
						<div class="text-red-500">{error}</div>
					{/if}
				</div>
				<footer class="card-footer">
					<AsyncButton class="btn variant-filled-primary" onClick={login}>Connection</AsyncButton>
					<AsyncButton class="btn variant-filled-secondary" onClick={register}
						>Creer un compte</AsyncButton
					>
				</footer>
			{:else}
				<h1>{`${user.name} ${user.firstName}`}</h1>
				<h1>{user.type}</h1>
				{#if loading}
					<div class="w-6">
						<ProgressRadial />
					</div>
				{:else}
					<button class="btn variant-filled-tertiary" on:click={logout}>
						{#if error}
							<div class="text-red-500">{error}</div>
						{:else}
							Se deconnecter
						{/if}
					</button>
				{/if}
			{/if}
		{/await}
	</div>
</div>
