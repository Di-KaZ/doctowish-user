import { createClient, type User } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { get, writable } from 'svelte/store';
import type { Database } from '$lib/types/supabase';
export const supabase = createClient<Database>(PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_KEY);
import { toastStore } from '@skeletonlabs/skeleton';

// contains the current user
// prevent multiple requests to the server
export const storeCurrentUser = writable<{
	user: User;
	data: Database['public']['Tables']['user_info']['Row'];
} | null>(null);

export async function createUser(
	email: string,
	password: string,
	name: string,
	firstNamme: string
): Promise<string | null> {
	const {
		data: { user },
		error
	} = await supabase.auth.signUp({
		email,
		password
	});
	if (error) {
		return error.message;
	}
	const { error: error2 } = await supabase.from('user_info').insert({
		name,
		first_name: firstNamme,
		user: user?.id
	});
	if (error2) {
		return error2.message;
	}
	return fetchCurrentUser();
}

export async function loginUser(email: string, password: string): Promise<string | null> {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	if (!error) {
		toastStore.trigger({
			message: 'Connecté ! 🎉',
			autohide: true,
			timeout: 2000
		});
		return null;
	}
	return error.message;
}

export async function logoutUser(): Promise<string | null> {
	const { error } = await supabase.auth.signOut();
	if (!error) {
		storeCurrentUser.set(null);
		return error;
	}
	return null;
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
		return [];
	}
	return data as any;
}

export async function fetchCurrentUser(): Promise<string | null> {
	if (get(storeCurrentUser) !== null) {
		return null;
	}
	const {
		data: { user },
		error
	} = await supabase.auth.getUser();
	if (error) {
		storeCurrentUser.set(null);
		return error.message;
	}
	// get the user info of the current user logged in
	const { data } = await supabase.from('user_info').select('*').eq('user', user?.id).single();
	if (error) {
		storeCurrentUser.set(null);
		return error;
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	storeCurrentUser.set({ data: data!, user: user! });
	return null;
}

// fetchDoctors

export async function fetchDoctors() {
	const { data, error } = await supabase.from('user_info').select('*').eq('type', 'doctor');
	if (error) {
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
		toastStore.trigger({
			message: error.message,
			autohide: true,
			timeout: 2000
		});
		return error.message;
	}
	return null;
}
