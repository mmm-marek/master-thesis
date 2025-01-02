import { notification } from 'antd'
import { forEach, isEmpty } from 'lodash'
import { ReactNode } from 'react'

import { IErrorMessage, SelectOption, SelectOptionWithTag, ThemeOption, UserData, UserPermission, UserState } from '@/types/types'
import { MSG_TYPE, NOTIFICATION_TYPE, THEME, THEME_OPTION, USER_ROLE, USER_STATE } from '@/utils/enums'
import { IntlTranslator } from '@/utils/intl'

const translateMessageType = (msgType: MSG_TYPE) => {
	switch (msgType) {
		case MSG_TYPE.ERROR:
			return IntlTranslator.t('utils.helpers.utilsHelpersError')
		case MSG_TYPE.WARNING:
			return IntlTranslator.t('utils.helpers.utilsHelpersWarning')
		case MSG_TYPE.SUCCESS:
			return IntlTranslator.t('utils.helpers.utilsHelpersSuccess')
		case MSG_TYPE.INFO:
			return IntlTranslator.t('utils.helpers.utilsHelpersInfo')
		default:
			return ''
	}
}

/**
 * Displays notifications based on the provided messages and notification type.
 *
 * @param messages - (Optional) An array of error messages to be displayed as notifications.
 * @param typeNotification - (Optional) The type of notification to display (either 'NOTIFICATION' or 'MODAL').
 * @returns void
 */
export const showNotifications = (messages?: IErrorMessage[], typeNotification?: NOTIFICATION_TYPE) => {
	if (!isEmpty(messages)) {
		if (typeNotification === NOTIFICATION_TYPE.NOTIFICATION) {
			forEach(messages, (message) => {
				let notif
				switch (message.type.toLowerCase()) {
					case 'warning':
						notif = notification.warning
						break
					case 'success':
						notif = notification.success
						break
					case 'error':
						notif = notification.error
						break
					case 'info':
					default:
						notif = notification.info
						break
				}
				notif({
					message: translateMessageType(message.type),
					description: message.message
				})
			})
		} else if (typeNotification === NOTIFICATION_TYPE.MODAL) {
			// TODO: implement modal notification
		}
	}
}

/**
 * Sets an interval to repeatedly execute a given function with a specified interval.
 * The function is immediately invoked once before starting the interval.
 *
 * @param func - The function to be executed.
 * @param interval - The time interval, in milliseconds, at which the function should be called repeatedly.
 * @returns number - The ID of the interval, which can be used to clear or cancel the interval later.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function setIntervalImmediately(func: Function, interval: number) {
	func()
	return setInterval(func, interval)
}

export const PAGE_TITLE = () => IntlTranslator.t('utils.helpers.goodrequestAdminTemplate')

/**
 * Validates the status of a form field or input based on the provided parameters.
 *
 * @param {boolean} error - A boolean indicating if an error has occurred.
 * @param {boolean} isTouched - A boolean indicating if the field or input has been touched or interacted with.
 * @param {boolean} invalid - A boolean indicating if the field or input is invalid.
 * @returns {string} A string representing the validation status.
 */
export const validateStatus = (error?: ReactNode, isTouched?: boolean, invalid?: boolean) => {
	if (error && (isTouched || invalid)) {
		return 'error'
	}
	if (isTouched && !invalid) {
		return 'success'
	}
	return ''
}

/**

Remove accent and transform to lower case
Usefull for searching on FE
@link https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
*/
export const transformToLowerCaseWithoutAccent = (source?: string): string =>
	source
		? source
				.toLowerCase()
				.normalize('NFD')
				.replace(/\p{Diacritic}/gu, '')
		: ''

export const getLinkWithEncodedBackUrl = (link: string) => {
	if (typeof window === 'undefined') {
		return link
	}

	if (!window.location.search) {
		return link
	}

	const backUrl = btoa(`${window.location.pathname}${window.location.search}`)
	return `${link}?backUrl=${backUrl}`
}

export const USER_PERMISSIONS = (): UserPermission => ({
	[USER_ROLE.ADMINISTRATOR]: IntlTranslator.t('utils.helpers.administrator'),
	[USER_ROLE.USER]: IntlTranslator.t('utils.helpers.user')
})

export const USER_PERMISSIONS_OPTIONS = (): SelectOption[] => Object.entries(USER_PERMISSIONS()).map(([value, label]) => ({ key: value, value, label }))

export const USER_STATES = (): UserState => ({
	[USER_STATE.ACTIVE]: {
		translation: IntlTranslator.t('utils.helpers.active'),
		tagType: 'success'
	},
	[USER_STATE.PENDING_INVITATION]: {
		translation: IntlTranslator.t('utils.helpers.pendingInvitation'),
		tagType: 'secondary'
	}
})

export const USER_STATES_OPTIONS = (): SelectOptionWithTag[] =>
	Object.entries(USER_STATES()).map(([value, data]) => ({ key: value, value, label: data.translation, extra: { tagType: data.tagType } }))

export const THEME_OPTIONS = (currentSystemTheme?: THEME): ThemeOption => ({
	[THEME_OPTION.DARK]: IntlTranslator.t('utils.helpers.darkMode'),
	[THEME_OPTION.LIGHT]: IntlTranslator.t('utils.helpers.lightMode'),
	[THEME_OPTION.SYSTEM]: currentSystemTheme
		? IntlTranslator.t('utils.helpers.systemPreferencesTheme', {
				theme: currentSystemTheme === THEME.DARK ? IntlTranslator.t('utils.helpers.darkMode') : IntlTranslator.t('utils.helpers.lightMode')
			})
		: IntlTranslator.t('utils.helpers.systemPreferences')
})

export const THEME_OPTION_OPTIONS = (currentSystemTheme?: THEME) =>
	Object.entries(THEME_OPTIONS(currentSystemTheme)).map(([value, data]) => ({ key: value, value, label: data }))

export const getUserName = (userData?: UserData) => {
	const { name, surname, email, id } = userData || {}

	if (name && surname) {
		return `${name} ${surname}`
	}

	return name || surname || email || id || ''
}

export const normalizeQueryParams = <T extends object>(data: T) =>
	Object.entries({ ...data }).reduce(
		(acc, [key, value]) => {
			const newValue = value

			if (newValue !== undefined) {
				return {
					...acc,
					[key]: newValue
				}
			}
			return acc
		},
		{} as Record<keyof T, T[keyof T]>
	)

export const normalizeDirectionKeys = (direction: 'ascend' | 'descend' | null | undefined) => (direction === 'descend' ? 'desc' : 'asc')
export const normalizeAscDescKeys = (direction: 'asc' | 'desc' | null | undefined) => (direction?.toLowerCase() === 'desc' ? 'descend' : 'ascend')
