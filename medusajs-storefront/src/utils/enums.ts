import en_EN from 'antd/lib/locale/en_US'
import sk_SK from 'antd/locale/sk_SK'

export enum MSG_TYPE {
	INFO = 'INFO',
	ERROR = 'ERROR',
	WARNING = 'WARNING',
	SUCCESS = 'SUCCESS'
}

export enum NOTIFICATION_TYPE {
	MODAL = 'MODAL',
	NOTIFICATION = 'NOTIFICATION'
}

export enum PATHS {
	LOGIN = 'login',
	SIGN_UP = 'sign-up',
	FORGOTTEN_PASSWORD = 'forgotten-password',
	PROFILE = 'profile',
	CART = 'cart',
	PRODUCT = 'product'
}

export enum LANGUAGE {
	EN = 'en',
	SK = 'sk'
}

// NOTE: You can find time zone identifier here -> https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export enum TIME_ZONES {
	EUROPE_BRATISLAVA = 'Europe/Bratislava'
}

export const LOCALES = {
	[LANGUAGE.SK]: {
		ISO_639: 'sk',
		antD: sk_SK,
		countryCode: 'SK',
		timeZone: TIME_ZONES.EUROPE_BRATISLAVA
	},
	[LANGUAGE.EN]: {
		ISO_639: 'en',
		antD: en_EN,
		countryCode: 'EN',
		timeZone: TIME_ZONES.EUROPE_BRATISLAVA
	}
}

export const DEFAULT_LANGUAGE = LANGUAGE.EN

export enum APP_STATE_ACTIONS {
	CHANGE_BE_VERSION = 'CHANGE_BE_VERSION'
}

export enum GRECAPTCHA_ACTIONS {
	FORGOTTEN_PASSWORD = 'password_reset',
	RESET_PASSWORD = 'reset-password',
	LOGIN = 'login',
	SIGN_UP = 'sign-up'
}

export enum PAGE_IDS {
	LOGIN = 'LOGIN',
	CATEGORY = 'CATEGORY',
	SIGN_UP = 'SIGN_UP',
	FORGOTTEN_PASSWORD = 'FORGOTTEN_PASSWORD',
	CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT',
	RESET_PASSWORD = 'RESET_PASSWORD',
	DASHBOARD = 'DASHBOARD',
	PROFILE = 'PROFILE',
	CART = 'CART',
	PRODUCT = 'PRODUCT'
}

export enum TOKEN_AUDIENCE {
	FORGOTTEN_PASSWORD = 'FORGOTTEN_PASSWORD',
	USER_INVITATION = 'USER_INVITATION'
}

export enum USER_ROLE {
	ADMINISTRATOR = 'ADMINISTRATOR',
	USER = 'USER'
}

export enum USER_STATE {
	ACTIVE = 'ACTIVE',
	PENDING_INVITATION = 'PENDING_INVITATION'
}

export enum QUERY_KEYS {
	API_GET_AUTH_USER = 'API_GET_AUTH_USER',
	API_GET_PRODUCTS = 'API_GET_PRODUCTS'
}

export enum FIELD_MODE {
	INPUT = 'INPUT',
	FILTER = 'FILTER'
}

export const QUERY_CACHE = {
	CACHE_TIME: 1000 * 60 * 60 * 2, // 2 hours
	STALE_TIME: 1000 * 60 * 60 // 1 hour
}

export enum VALIDATION_MAX_LENGTH {
	LENGTH_3000 = 3000,
	LENGTH_1500 = 1500,
	LENGTH_1000 = 1000,
	LENGTH_500 = 500,
	LENGTH_255 = 255,
	LENGTH_200 = 200,
	LENGTH_100 = 100,
	LENGTH_75 = 75,
	LENGTH_60 = 60,
	LENGTH_50 = 50,
	LENGTH_30 = 30,
	LENGTH_20 = 20,
	LENGTH_10 = 10,
	LENGTH_5 = 5,
	LENGTH_2 = 2
}

export const PAGINATION = {
	defaultPageSize: 25,
	pageSizeOptions: [25, 50, 100],
	limit: 25, // 25 | 50 | 100
	page: 1
}

export enum ORDER_DIRECTION {
	ASCENDENT = 'asc',
	DESCENDENT = 'desc'
}

export const DROPDOWN_POSITION = {
	BOTTOM_LEFT: {
		points: ['tl', 'bl'],
		offset: [0, 4],
		overflow: {
			adjustX: false,
			adjustY: false
		}
	}
}

export const DEFAULT_TIME_FORMAT = 'HH:mm'

export const REFRESH_TOKEN_INTERVAL = 1000 * 60 * 13 // 13 minutes

export enum FORM {
	HOOK_FORM = 'HOOK_FORM',
	INVITE_USER = 'INVITE_USER',
	EDIT_USER = 'EDIT_USER'
}

export const PAGE_SIZE_OPTIONS = [20, 50, 100]

export const FILTER_CHANGE_DEBOUNCE_TIME = 300

export const SCROLL_DEBOUNCE_TIME = 100

export const TABLE_SCROLL = {
	MD: { x: 600 },
	LG: { x: 1000 },
	XL: { x: 1200 }
}

// THEME
/**
 * NOTE: THEME, THEME_OPTION and THEME_SETTINGS enums/variables must be in sync with the same variables in the public/prevent-theme-flash.ts
 * they must be always changed in both places, otherwise you can get an unexpected result
 */
export enum THEME {
	DARK = 'dark',
	LIGHT = 'light'
}

export enum THEME_OPTION {
	DARK = 'dark',
	LIGHT = 'light',
	SYSTEM = 'system'
}

export const THEME_SETTINGS = {
	DEFAULT_THEME_OPTION: THEME_OPTION.SYSTEM,
	FALLBACK_THEME: THEME.LIGHT,
	LOCAL_STORAGE_KEY: 'current_theme',
	MEDIA: '(prefers-color-scheme: dark)'
}

export enum ERROR_BOUNDARY_TYPE {
	REPORT_DIALOG = 'REPORT_DIALOG',
	RETRY = 'RETRY'
}
