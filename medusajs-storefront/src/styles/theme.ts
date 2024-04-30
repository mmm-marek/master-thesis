import darkTokens from '@/styles/darkTokens'
import lightTokens from '@/styles/lightTokens'
import { THEME } from '@/utils/enums'

const customThemeBase = {
	spacing: {
		2: '2px',
		4: '4px',
		6: '6px',
		8: '8px',
		12: '12px',
		16: '16px',
		20: '20px',
		24: '24px',
		32: '32px',
		40: '40px',
		48: '48px',
		64: '64px',
		80: '80px',
		96: '96px',
		128: '128px',
		160: '160px',
		192: '192px',
		224: '224px',
		256: '256px'
	},
	spacingRem: {
		2: '0.125rem',
		4: '0.25rem',
		6: '0.375rem',
		8: '0.5rem',
		12: '0.75rem',
		16: '1rem',
		20: '1.25rem',
		24: '1.5rem',
		32: '2rem',
		40: '2.5rem',
		48: '3rem',
		64: '4rem',
		80: '5rem',
		96: '6rem',
		128: '8rem',
		160: '10rem',
		192: '12rem',
		224: '14rem',
		256: '16rem'
	},
	borderRadius: {
		2: '2px',
		4: '4px',
		6: '6px',
		8: '8px',
		12: '12px',
		16: '16px',
		20: '20px',
		24: '24px',
		32: '32px',
		40: '40px',
		48: '48px',
		80: '80px',
		circle: '999px'
	},
	borderWidth: {
		xs: '1px',
		sm: '1.5px',
		md: '2px',
		lg: '4px'
	}
}

const lightTheme = {
	...customThemeBase,
	tokens: lightTokens,
	filters: {
		'color-base-content-primary': 'brightness(0) saturate(100%) invert(6%) sepia(31%) saturate(1546%) hue-rotate(186deg) brightness(96%) contrast(93%)',
		'color-base-content-tertiary': 'brightness(0) saturate(100%) invert(31%) sepia(33%) saturate(269%) hue-rotate(175deg) brightness(93%) contrast(88%)',
		'color-base-content-secondary': 'brightness(0) saturate(100%) invert(24%) sepia(18%) saturate(694%) hue-rotate(178deg) brightness(92%) contrast(91%)',
		'color-base-content-quintarny': 'brightness(0) saturate(100%) invert(96%) sepia(3%) saturate(596%) hue-rotate(183deg) brightness(91%) contrast(88%)'
	}
}

export type LightTheme = typeof lightTheme

const darkTheme = {
	...customThemeBase,
	tokens: darkTokens,
	filters: {
		'color-base-content-primary': 'brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(15%) hue-rotate(117deg) brightness(105%) contrast(96%)',
		'color-base-content-tertiary': 'brightness(0) saturate(100%) invert(99%) sepia(1%) saturate(3442%) hue-rotate(195deg) brightness(113%) contrast(66%)',
		'color-base-content-secondary': 'brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(1285%) hue-rotate(75deg) brightness(115%) contrast(80%)',
		'color-base-content-quintarny': 'brightness(0) saturate(100%) invert(21%) sepia(55%) saturate(0%) hue-rotate(253deg) brightness(109%) contrast(100%)'
	}
}

export type DarkTheme = typeof darkTheme

export const theme = {
	[THEME.LIGHT]: lightTheme,
	[THEME.DARK]: darkTheme
}
