import type { Database } from '$lib/types/supabase';
import { toastStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';
import * as ics from 'ics';
export function vibrate() {
	navigator.vibrate(200);
}

export const storeInstallPropmt = writable<Event | null>(null);

function _openInstallPrompt() {
	storeInstallPropmt.update((prompter) => {
		(prompter as any).prompt();
		(prompter as any).userChoice.then((choiceResult: { outcome: string }) => {
			if (choiceResult.outcome === 'accepted') {
				toastStore.trigger({
					message: "L'application a été installée avec succès",
					background: 'variant-filled-success',
					autohide: true,
					timeout: 5000
				});
			} else {
				toastStore.trigger({
					message: "L'installation de l'application a été annulée",
					background: 'variant-filled-error',
					autohide: true,
					timeout: 5000
				});
			}
		});
		return null;
	});
}

export function preventAutoInstallPrompt() {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		storeInstallPropmt.set(e);
		toastStore.trigger({
			message: 'Installez DoctoWish pour une meilleure expérience !',
			background: 'variant-filled-secondary',
			autohide: false,
			action: {
				label: 'Installer',
				response: _openInstallPrompt
			}
		});
	});
}

export function addToCalendar(
	event: Database['public']['Tables']['appointment']['Row'] & {
		doctor: Database['public']['Tables']['user_info']['Row'];
	}
) {
	const date = new Date(event.date!);
	ics.createEvent(
		{
			title: `Rendez-vous avec ${event.doctor.name} ${event.doctor.firstName}`,
			start: [
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				date.getHours(),
				date.getMinutes()
			],
			duration: { minutes: 30 },
			description: event.name!
		},
		(error, value) => {
			const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			window.location.assign(url);
		}
	);
}
