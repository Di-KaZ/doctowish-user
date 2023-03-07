export class Screens {
	static readonly home = { path: '/', tab: 0 };
	static readonly calendar = { path: '/doctors', tab: 1 };
	static readonly profile = { path: '/profile', tab: 2 };

	static readonly value = [Screens.home, Screens.calendar, Screens.profile];

	static getScreenFromPath(path: string) {
		return Screens.value.find((screen) => screen.path === path);
	}

	static getScreenFromTab(tab: number) {
		return Screens.value.find((screen) => screen.tab === tab);
	}
}
