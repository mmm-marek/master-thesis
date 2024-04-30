/**
 * NOTE: THEME, THEME_OPTION and THEME_SETTINGS variables must be in sync with the same variables in the utils/enums.ts
 * they must be always changed in both places, otherwise you can get an unexpected result
 */
(function () {
	const THEME = {
		DARK: 'dark',
		LIGHT: 'light'
	}
	const THEME_OPTION = {
		DARK: THEME.DARK,
		LIGHT: THEME.LIGHT,
		SYSTEM: 'system'
	}
	const THEME_SETTINGS = {
		DEFAULT_THEME_OPTION: THEME_OPTION.SYSTEM,
		FALLBACK_THEME: THEME.DARK,
		LOCAL_STORAGE_KEY: 'current_theme',
		MEDIA: '(prefers-color-scheme: dark)'
	}

	const THEME_OPTIONS = Object.values(THEME_OPTION)
	const mql = window.matchMedia(THEME_SETTINGS.MEDIA)

	let localStorageThemeOption = null
	let validThemeOption
	let themeName = THEME.DARK

	try {
		localStorageThemeOption = localStorage.getItem(THEME_SETTINGS.LOCAL_STORAGE_KEY)

		if (localStorageThemeOption) {
			// validate local storage value
			if (THEME_OPTIONS.indexOf(localStorageThemeOption) === -1) {
				validThemeOption = THEME_SETTINGS.DEFAULT_THEME_OPTION
				localStorage.setItem(THEME_SETTINGS.LOCAL_STORAGE_KEY, validThemeOption)
			} else {
				validThemeOption = localStorageThemeOption
			}

			if (validThemeOption === THEME_OPTION.SYSTEM) {
				themeName = mql.matches ? THEME.DARK : THEME.LIGHT
			} else {
				themeName = validThemeOption
			}
		} else {
			// no local storage value => check system settings
			validThemeOption = mql.matches ? THEME.DARK : THEME.LIGHT
			themeName = validThemeOption
			localStorage.setItem(THEME_SETTINGS.LOCAL_STORAGE_KEY, validThemeOption)
		}
	} catch {}
})();