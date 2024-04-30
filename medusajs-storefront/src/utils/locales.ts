import { merge } from 'lodash'

import envConfig from '@/config'

import { DEFAULT_LANGUAGE } from './enums'

/*
types
*/

type JsonValue = string | number | boolean | null | JsonObject | JsonArray

type JsonObject = {
	[key: string]: JsonValue
}

type JsonArray = Array<JsonValue>

/*
setup
*/

const UNTRANSLATED_KEY = '_NEPRELOZENE_'
const EMPTY_KEY = ''

/*
helpers
*/

const convertEmptyKeysToUntranslated = (obj: JsonObject): void => {
	Object.keys(obj).forEach((key) => {
		if (obj[key] === EMPTY_KEY) {
			// eslint-disable-next-line no-param-reassign
			obj[key] = UNTRANSLATED_KEY
		}
		if (typeof obj[key] === 'object') {
			convertEmptyKeysToUntranslated(obj[key] as JsonObject)
		}
	})
}

const removeEmptyKeys = (obj: JsonObject): void => {
	Object.keys(obj).forEach((key) => {
		if (obj[key] === EMPTY_KEY) {
			// eslint-disable-next-line no-param-reassign
			delete obj[key]
		}
		if (typeof obj[key] === 'object') {
			removeEmptyKeys(obj[key] as JsonObject)
		}
	})
}

/*
getLocales
*/

const isDev = envConfig.nodeEnv === 'development'

const localesCache = new Map<string, JsonObject>()

export const getLocales = async (locale: string | undefined) => {
	const localesForCurrentLanguage = (await import(`../locales/${locale || DEFAULT_LANGUAGE}.json`)).default

	if (isDev) {
		// For dev we show untranslated keys so we can see what's missing.
		convertEmptyKeysToUntranslated(localesForCurrentLanguage)
		return localesForCurrentLanguage
	}

	if (locale && localesCache.has(locale)) {
		return localesCache.get(locale)
	}

	const defaultLocales = (await import(`../locales/${DEFAULT_LANGUAGE}.json`)).default

	// We remove empty keys so we can show values from default locale instead.
	removeEmptyKeys(localesForCurrentLanguage)

	// We merge locales for current language with default locales (which must always have all the keys translated!)
	// so we can show default locale text if translation is missing.
	const mergedLocales = merge(defaultLocales, localesForCurrentLanguage)

	localesCache.set(locale || DEFAULT_LANGUAGE, mergedLocales as JsonObject)

	return mergedLocales
}
