import { message as antMessage } from 'antd'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { get, isEmpty, split } from 'lodash'
import qs from 'qs'

import envConfig from '@/config'
import { logOutUser } from '@/hooks/auth/useLogout'
import { PathsDictionary } from '@/types/api'
import { IErrorMessage } from '@/types/interfaces'
import { getAccessToken, isLoggedIn } from '@/utils/auth'
import { MSG_TYPE, NOTIFICATION_TYPE } from '@/utils/enums'
import { showNotifications } from '@/utils/helpers'
import { IntlTranslator } from '@/utils/intl'

export const axios = Axios.create({
	baseURL: envConfig.apiUrl || undefined
})

type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T]

type GetUrls = {
	[Q in FilteredKeys<PathsDictionary, { get: any }>]: PathsDictionary[Q]
}

export type PostUrls = {
	[Q in FilteredKeys<PathsDictionary, { post: any }>]: PathsDictionary[Q]
}

type PatchUrls = {
	[Q in FilteredKeys<PathsDictionary, { patch: any }>]: PathsDictionary[Q]
}

type DeleteUrls = {
	[Q in FilteredKeys<PathsDictionary, { delete: any }>]: PathsDictionary[Q]
}

export const showErrorNotifications = async (error: AxiosError | Error | unknown, typeNotification = NOTIFICATION_TYPE.NOTIFICATION) => {
	let messages: IErrorMessage[] = get(error, 'response.data.messages') as any

	if (get(error, 'response.status') === 401) {
		if (isLoggedIn()) {
			messages = [
				{
					type: MSG_TYPE.INFO,
					message: IntlTranslator.t('utils.request.loggedOutMessage')
				}
			]
		}
		showNotifications(messages, typeNotification)
		await logOutUser()
	} else if (get(error, 'response.status') === 504 || get(error, 'response') === undefined || get(error, 'message') === 'Network Error') {
		messages = [
			{
				type: MSG_TYPE.ERROR,
				message: IntlTranslator.t('utils.request.errorConnectingToServer')
			}
		]
		showNotifications(messages, typeNotification)
	} else {
		// if BE do not send message set general error message
		messages = isEmpty(messages) ? [{ type: MSG_TYPE.ERROR, message: IntlTranslator.t('utils.request.somethingWentWrong') }] : messages
		showNotifications(messages, typeNotification)
	}
}

export interface ICustomConfig extends AxiosRequestConfig {
	messages?: IErrorMessage[]
}

const buildHeaders = () => {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Credentials': 'true',
		'Cache-Control': 'no-cache, no-store',
		Pragma: 'no-cache',
		'accept-language': IntlTranslator.getLocale(),
		language: IntlTranslator.getLocale()
	}
	if (envConfig.appVersion) {
		headers['X-Version'] = envConfig.appVersion
	}
	if (isLoggedIn()) {
		headers.Authorization = `Bearer ${getAccessToken()}`
	}

	return headers
}

const fullFillURL = (urlTemplate: string, params: any) => {
	const pathParams = []
	const queryParams = { ...(params || {}) }
	const fullfilURL = split(urlTemplate, '/')
		.map((blok) => {
			if (/{[^}]*\}/.test(blok)) {
				const param = blok.replace('{', '').replace('}', '')
				pathParams.push(param)
				delete queryParams[param]
				return get(params, param)
			}
			return blok
		})
		.join('/')
	return {
		fullfilURL,
		queryParams
	}
}

/**
 * @param url url endpoint
 * @param params Object object
 * @param customConfig overwrite defaultConfig with custom one
 * @param typeNotification Enum notification type
 * @param showLoading Boolean show loading
 * @param allowCancelToken Boolean allow cancel token
 * @return Promise response
 *
 */
export const getReq = async <T extends keyof GetUrls>(
	url: T,
	params: Parameters<GetUrls[T]['get']>[0],
	customConfig: ICustomConfig = {},
	typeNotification: NOTIFICATION_TYPE | false = NOTIFICATION_TYPE.NOTIFICATION,
	showLoading = false,
	signal?: AbortSignal | undefined
): Promise<ReturnType<GetUrls[T]['get']>> => {
	const { fullfilURL, queryParams } = fullFillURL(url, params)

	let hide
	if (showLoading) {
		hide = antMessage.loading(IntlTranslator.t('utils.request.loadingData') as string, 0)
	}
	const config = {
		paramsSerializer: qs.stringify,
		...customConfig,
		signal,
		headers: {
			...buildHeaders(),
			...get(customConfig, 'headers', {})
		}
	} as AxiosRequestConfig

	if (queryParams) {
		config.params = queryParams
	}

	try {
		const res = await (axios.get(fullfilURL, config) as Promise<ReturnType<GetUrls[T]['get']>>)
		if (typeNotification) {
			if (customConfig && customConfig.messages) {
				showNotifications(customConfig.messages, typeNotification)
			} else if ('messages' in res.data) {
				showNotifications(res.data.messages as IErrorMessage[], typeNotification)
			}
		}
		if (hide) {
			hide()
		}

		return res
	} catch (e) {
		if (!Axios.isCancel(e) && typeNotification) {
			showErrorNotifications(e, typeNotification)
		}
		if (hide) {
			hide()
		}
		return Promise.reject(e) as any
	}
}

/**
 * @param url url endpoint
 * @param params Object params object
 * @param data Object data object
 * @param customConfig overwrite defaultConfig with custom one
 * @param typeNotification Enum notification type
 * @param showLoading Boolean show loading
 * @param allowCancelToken Boolean allow cancel token
 * @return Promise response
 * Performs post request to url and returns callback with result
 */
export const postReq = async <T extends keyof PostUrls>(
	url: T,
	params: Parameters<PostUrls[T]['post']>[0],
	reqBody: Parameters<PostUrls[T]['post']>[1],
	customConfig: ICustomConfig = {},
	typeNotification: NOTIFICATION_TYPE | false = NOTIFICATION_TYPE.NOTIFICATION,
	showLoading = false,
	signal?: AbortSignal | undefined
): Promise<ReturnType<PostUrls[T]['post']>> => {
	const { fullfilURL, queryParams } = fullFillURL(url, params)

	let hide
	if (showLoading) {
		hide = antMessage.loading(IntlTranslator.t('utils.request.operationInProgress') as string, 0)
	}
	const config = {
		...customConfig,
		signal,
		headers: {
			...buildHeaders(),
			...get(customConfig, 'headers', {})
		}
	} as AxiosRequestConfig

	if (queryParams) {
		config.params = queryParams
	}

	try {
		const res = await (axios.post(fullfilURL, reqBody, config) as Promise<ReturnType<PostUrls[T]['post']>>)
		if (typeNotification) {
			if (customConfig && customConfig.messages) {
				showNotifications(customConfig.messages, typeNotification)
			} else if ('messages' in res.data) {
				showNotifications(res.data.messages as IErrorMessage[], typeNotification)
			}
		}

		if (hide) {
			hide()
		}
		return res
	} catch (e) {
		if (!Axios.isCancel(e) && typeNotification) {
			showErrorNotifications(e, typeNotification)
		}
		if (hide) {
			hide()
		}
		return Promise.reject(e) as any
	}
}

/**
 * @param url url endpoint
 * @param params Object params object
 * @param data Object data object
 * @param customConfig overwrite defaultConfig with custom one
 * @param typeNotification Enum notification type
 * @param showLoading Boolean show loading
 * @param allowCancelToken Boolean allow cancel token
 * Performs put request to url and returns callback with result
 */

export const patchReq = async <T extends keyof PatchUrls>(
	url: T,
	params: Parameters<PatchUrls[T]['patch']>[0],
	reqBody: Parameters<PatchUrls[T]['patch']>[1],
	customConfig: ICustomConfig = {},
	typeNotification: NOTIFICATION_TYPE | false = NOTIFICATION_TYPE.NOTIFICATION,
	showLoading = false,
	signal?: AbortSignal | undefined
): Promise<ReturnType<PatchUrls[T]['patch']>> => {
	const { fullfilURL, queryParams } = fullFillURL(url, params)

	let hide
	if (showLoading) {
		hide = antMessage.loading(IntlTranslator.t('utils.request.operationInProgress') as string, 0)
	}
	const config = {
		...customConfig,
		signal,
		headers: {
			...buildHeaders(),
			...get(customConfig, 'headers', {})
		}
	} as AxiosRequestConfig

	if (queryParams) {
		config.params = queryParams
	}
	try {
		const res = await (axios.patch(fullfilURL, reqBody, config) as Promise<ReturnType<PatchUrls[T]['patch']>>)
		if (typeNotification && customConfig && customConfig.messages) {
			showNotifications(customConfig.messages, typeNotification)
		} else if (typeNotification && res.data?.messages) {
			showNotifications(res.data.messages as any, typeNotification)
		}
		if (hide) {
			hide()
		}
		return res
	} catch (e) {
		if (!Axios.isCancel(e) && typeNotification) {
			showErrorNotifications(e, typeNotification)
		}
		if (hide) {
			hide()
		}
		return Promise.reject(e) as any
	}
}

/**
 * @param url url endpoint
 * @param params Object params object
 * @param customConfig overwrite defaultConfig with custom one
 * @param typeNotification Enum notification type
 * @param showLoading Boolean show loading
 *
 * Performs delete request to url and returns with result
 */
export const deleteReq = async <T extends keyof DeleteUrls>(
	url: T,
	params: Parameters<DeleteUrls[T]['delete']>[0],
	customConfig: ICustomConfig = {},
	typeNotification: NOTIFICATION_TYPE | false = NOTIFICATION_TYPE.NOTIFICATION,
	showLoading = false
): Promise<ReturnType<DeleteUrls[T]['delete']>> => {
	const { fullfilURL, queryParams } = fullFillURL(url, params)
	let hide
	if (showLoading) {
		hide = antMessage.loading(IntlTranslator.t('utils.request.operationInProgress') as string, 0)
	}

	const config = {
		...customConfig,
		headers: {
			...buildHeaders(),
			...get(customConfig, 'headers', {})
		}
	} as AxiosRequestConfig

	if (queryParams) {
		config.params = queryParams
	}

	try {
		const res = await (axios.delete(fullfilURL, config) as Promise<ReturnType<DeleteUrls[T]['delete']>>)

		if (typeNotification && customConfig && customConfig.messages) {
			showNotifications(customConfig.messages, typeNotification)
		} else if (typeNotification && res.data?.messages) {
			showNotifications(res.data.messages as any, typeNotification)
		}

		if (hide) {
			hide()
		}

		return res
	} catch (e) {
		if (!Axios.isCancel(e) && typeNotification) {
			showErrorNotifications(e, typeNotification)
		}
		if (hide) {
			hide()
		}
		return Promise.reject(e) as any
	}
}
