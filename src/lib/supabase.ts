import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_KEY);

export async function createUser(email: string, password: string): Promise<string | null> {
	let { data, error } = await supabase.auth.signUp({
		email,
		password
	});
	if (!error) {
		return null;
	}
	return error.message;
}

export async function loginUser(email: string, password: string): Promise<string | null> {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	if (!error) {
		return null;
	}
	return error.message;
}

export async function logoutUser(): Promise<string | null> {
	let { error } = await supabase.auth.signOut();
	if (!error) {
		return error;
	}
	return null;
}

export async function getUserApointments() {
	const { data, error } = await supabase
		.from('appointment')
		.select('*, doctor (*)')
		.order('date', { ascending: true });
	console.log(data);
	return data;
}

export async function getLoggedUser() {
	const {
		data: { user },
		error
	} = await supabase.auth.getUser();
	if (error) {
		return null;
	}
	console.log(user);
	// get first result
	const { data } = await supabase.from('user_info').select('*').eq('user', user?.id).single();
	return data;
}
