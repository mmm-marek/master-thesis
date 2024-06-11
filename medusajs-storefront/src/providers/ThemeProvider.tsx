import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components'

import { GlobalStyle } from '@/styles/GlobalStyles'
import { theme as styledTheme, theme } from '@/styles/theme'
import { THEME, THEME_OPTION, THEME_SETTINGS } from '@/utils/enums'

/**
 * The user's theme setting is saved in Local Storage.
 * Since the pre-rendered page from the server isn't aware of the user's Local Storage values, there's a 50% chance that the user will see a flash of an incorrect theme upon page load.
 * The solution for this issue is outlined in the article: "Preventing Theme Flash in React" by Josh Comeau (https://www.joshwcomeau.com/react/dark-mode/?fbclid=IwAR1dCzKc9JrAta_NJg48mDPHTHnuY7WDNTyx93EBPl-BACAGxqJvwLCHqO4).
 * 1/ A script is executed from public/prevent_theme_flash.js in the _document.tsx component. This script exclusively runs on the client side and blocks the initial rendering of the HTML page until is executed.
 * * * The script checks the user's Local Storage. If a theme value exists, it is validated. If the value is incorrect, the Local Storage is updated with a fallback value. If no value is present, the script sets the value in the Local Storage based on the user's system preferences.
 * 2/ By having the correct theme stored in Local Storage before any HTML is rendered, the correct theme is initialized, ensuring that users don't experience a flash when the page is first loaded.
 */

export type UseThemeProps = {
	/**
	 * name of current theme - 'dark '| 'light'
	 * */
	themeName: THEME
	/**
	 * name of current value set in theme switcher - 'dark '| 'light' | 'system'
	 * 'dark ' - set themeName to 'dark',
	 * 'light' - set themeName to 'light'
	 * 'system' - set themeName based on user system settings - ('dark' | 'light')
	 * whenever user switches system theme settings, themeName will update without need to reload the page
	 * */
	themeOption: THEME_OPTION
	/**
	 * name of current system theme - 'dark '| 'light'
	 * whenever user switches system theme settings, currentSystemTheme will update without need to reload the page
	 */
	currentSystemTheme: THEME
	/**
	 * current theme object with all values
	 */
	theme: DefaultTheme
	/**
	 * setter function to change current themeOption (which also change current themeName)
	 * (newTheme: 'dark '| 'light' | 'system') => void
	 */
	setTheme: (newTheme: THEME_OPTION) => void
}

const { FALLBACK_THEME, DEFAULT_THEME_OPTION, LOCAL_STORAGE_KEY } = THEME_SETTINGS
const isServer = typeof window === 'undefined'
const ThemeContext = createContext<UseThemeProps | undefined>(undefined)
const defaultContext: UseThemeProps = {
	themeName: FALLBACK_THEME,
	themeOption: DEFAULT_THEME_OPTION,
	currentSystemTheme: FALLBACK_THEME,
	theme: theme[FALLBACK_THEME],
	setTheme: () => {}
}
const MEDIA = '(prefers-color-scheme: dark)'

const getSystemThemeName = (e?: MediaQueryList | MediaQueryListEvent) => {
	const event = e || window.matchMedia(MEDIA)
	const isDark = event.matches
	const currentSystemTheme = isDark ? THEME.DARK : THEME.LIGHT
	return currentSystemTheme
}

const getInitialThemeOption = (): THEME_OPTION => {
	if (isServer) {
		return DEFAULT_THEME_OPTION
	}
	return (localStorage.getItem(LOCAL_STORAGE_KEY) as THEME_OPTION) || DEFAULT_THEME_OPTION
}

const getInitialTheme = (): THEME => {
	return THEME.LIGHT
	// if (isServer) {
	// 	return FALLBACK_THEME
	// }
	// const themeOption = getInitialThemeOption()

	// if (themeOption === THEME_OPTION.SYSTEM) {
	// 	return getSystemThemeName()
	// }

	// return themeOption === THEME_OPTION.DARK ? THEME.DARK : THEME.LIGHT
}

const getInitialSystemTheme = (): THEME => {
	if (isServer) {
		return FALLBACK_THEME
	}

	return getSystemThemeName()
}

const disableAnimation = () => {
	if (isServer) {
		return
	}

	const css = document.createElement('style')
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
		)
	)
	document.head.appendChild(css)
	;(() => window.getComputedStyle(document.body))()

	// Wait for next tick before removing
	setTimeout(() => {
		document.head.removeChild(css)
	}, 1)
}

const resolveThemeName = (themeOption: THEME_OPTION) => {
	let newThemeName: THEME

	if (themeOption === THEME_OPTION.SYSTEM) {
		newThemeName = getSystemThemeName()
	} else if (themeOption === THEME_OPTION.DARK) {
		newThemeName = THEME.DARK
	} else {
		newThemeName = THEME.LIGHT
	}
	return newThemeName
}

export const useTheme = () => useContext(ThemeContext) ?? defaultContext

const ThemeProvider = ({ children }: PropsWithChildren) => {
	const [themeOption, setThemeOption] = useState<THEME_OPTION>(() => getInitialThemeOption())
	const [themeName, setThemeName] = useState<THEME>(() => getInitialTheme())
	const [currentSystemTheme, setCurrentSystemTheme] = useState<THEME>(() => getInitialSystemTheme())

	const setTheme = useCallback((themOption: THEME_OPTION) => {
		disableAnimation()

		setThemeName(resolveThemeName(themOption))
		setThemeOption(themOption)
		localStorage.setItem(LOCAL_STORAGE_KEY, themOption)
	}, [])

	// listen to System preference
	useEffect(() => {
		// const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) => {
		// 	const resolved = getSystemThemeName(e)
		// 	setCurrentSystemTheme(resolved)
		// 	if (themeOption === THEME_OPTION.SYSTEM) {
		// 		disableAnimation()
		// 		setThemeName(resolved)
		// 		localStorage.setItem(LOCAL_STORAGE_KEY, themeOption)
		// 	}
		// }
		// const media = window.matchMedia(MEDIA)
		// // Intentionally use deprecated listener methods to support iOS & old browsers
		// media.addListener(handleMediaQuery)
		// handleMediaQuery(media)
		// return () => media.removeListener(handleMediaQuery)
	}, [themeOption])

	const providerValue = useMemo(
		() => ({
			themeOption,
			themeName,
			currentSystemTheme,
			theme: styledTheme[themeName],
			setTheme
		}),
		[setTheme, themeName, themeOption, currentSystemTheme]
	)

	return (
		<ThemeContext.Provider value={providerValue}>
			<StyledThemeProvider theme={styledTheme[themeName]}>
				{!isServer && <GlobalStyle $isDarkMode={themeName === THEME.DARK} />}
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
