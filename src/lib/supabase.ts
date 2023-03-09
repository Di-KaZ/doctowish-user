import { createClient, type User } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { get, writable } from 'svelte/store';
import type { Database } from '$lib/types/supabase';
export const supabase = createClient<Database>(PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_KEY);
import { toastStore } from '@skeletonlabs/skeleton';

export function showMessage(message: string) {
	toastStore.trigger({
		message,
		autohide: true,
		timeout: 5000
	});
}

// contains the current user
// prevent multiple requests to the server
export const storeCurrentUser = writable<{
	user: User;
	data: Database['public']['Tables']['user_info']['Row'];
} | null>(null);

export async function createUser(email: string, password: string, name: string, firstName: string) {
	const {
		data: { user },
		error
	} = await supabase.auth.signUp({
		email,
		password
	});
	if (error) {
		showMessage(error.message);
		return;
	}
	const { error: error2 } = await supabase.from('user_info').insert({
		name,
		firstName,
		user: user?.id
	});
	if (error2) {
		showMessage(error2.message);
		console.log({ error2 });
		return;
	}
	return fetchCurrentUser();
}

export async function loginUser(email: string, password: string) {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	if (!error) {
		showMessage('Connecté ! 🎉');
		return null;
	}
	showMessage(error.message);
}

export async function logoutUser() {
	const { error } = await supabase.auth.signOut();
	if (!error) {
		storeCurrentUser.set(null);
		showMessage('Déconnecté ! 🎉');
		return;
	}
	showMessage(error.message);
}

export async function getUserApointments(): Promise<
	Array<
		Database['public']['Tables']['appointment']['Row'] & {
			doctor: Database['public']['Tables']['user_info']['Row'];
		}
	>
> {
	const { data, error } = await supabase
		.from('appointment')
		.select('*, doctor (*)')
		.order('date', { ascending: true });
	if (error) {
		showMessage(error.message);
		return [];
	}
	return data as any;
}

export async function fetchCurrentUser() {
	if (get(storeCurrentUser) !== null) {
		return;
	}
	const {
		data: { user },
		error
	} = await supabase.auth.getUser();
	if (error) {
		storeCurrentUser.set(null);
		showMessage(error.message);
		return;
	}
	// get the user info of the current user logged in
	const { data } = await supabase.from('user_info').select('*').eq('user', user?.id).single();
	if (error) {
		storeCurrentUser.set(null);
		showMessage(error);
		return;
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	storeCurrentUser.set({ data: data!, user: user! });
}

// fetchDoctors

export async function fetchDoctors() {
	const { data, error } = await supabase.from('user_info').select('*').eq('type', 'doctor');
	if (error) {
		showMessage(error.message);
		return [];
	}
	return data;
}

// function that get a doctor by his user id
export async function fetchDoctorById(
	id: number
): Promise<Database['public']['Tables']['user_info']['Row'] | null> {
	const { data, error } = await supabase.from('user_info').select('*').eq('id', id).single();
	if (error) {
		showMessage(error.message);
		return null;
	}
	return data;
}

//function that create an appointment by the current user and the doctor user id
export async function createAppointment(doctor: number, date: string, name: string) {
	const currentUser = get(storeCurrentUser);
	if (!currentUser) {
		return 'Vous devez être connecté pour prendre un rendez-vous';
	}
	console.log({ doctor });
	const { id: patient } = currentUser.data;
	const { error } = await supabase.from('appointment').insert({
		name,
		doctor,
		patient,
		date
	});
	if (error) {
		showMessage(error.message);
	}
}
