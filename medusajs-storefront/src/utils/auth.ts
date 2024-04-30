import decode from 'jwt-decode'

import { IDecodedToken } from '@/types/interfaces'

export enum LOCAL_STORAGE {
	ACCESS_TOKEN_KEY = 'access_token',
	REFRESH_TOKEN_KEY = 'refresh_token'
}

// localhost does not exists on server
const isBrowser = typeof window !== 'undefined'

/**
 * Removes saved access token from localStorage
 */
export const clearAccessToken = () => {
	if (isBrowser) localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN_KEY)
}

/**
 * Removes saved refresh token from localStorage
 */
export const clearRefreshToken = () => {
	if (isBrowser) localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN_KEY)
}

/**
 * @return string token
 *
 * Returns access token saved into storage or null
 */
export function getAccessToken() {
	if (isBrowser) return localStorage?.getItem(LOCAL_STORAGE.ACCESS_TOKEN_KEY)
	return null
}

/**
 * @return string token
 *
 * Returns refresh token saved into storage or null
 */
export function getRefreshToken() {
	if (isBrowser) return localStorage?.getItem(LOCAL_STORAGE.REFRESH_TOKEN_KEY)
	return null
}

/**
 * @param token
 *
 * Save auth access token into localStorage
 */
export function setAccessToken(token: string) {
	if (isBrowser) localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN_KEY, token)
}

/**
 * @param token
 *
 * Save auth refresh token into localStorage
 */
export function setRefreshToken(token: string) {
	if (isBrowser) localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN_KEY, token)
}

/**
 * @return boolean
 *
 * check if token is exist and try to decoded
 */
export function isLoggedIn() {
	try {
		const token = getAccessToken()
		if (!token) {
			return false
		}
		decode(token)

		return true
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
		return false
	}
}

export const hasRefreshToken = (): boolean => {
	try {
		const token = getRefreshToken()
		if (!token) {
			return false
		}
		decode(token)

		return true
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
		return false
	}
}

export const getAuthUserId = (): string => {
	try {
		const token = getAccessToken()
		if (!token) {
			return ''
		}
		const decodedToken: IDecodedToken = decode(token)

		return decodedToken.uid
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
	return ''
}
