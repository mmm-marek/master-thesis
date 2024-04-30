import { ReactNode } from 'react'

import { TagType } from '@/atoms/Tag/types'
import { MSG_TYPE, THEME_OPTION, USER_ROLE, USER_STATE } from '@/utils/enums'

import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

export interface IErrorMessage {
	type: MSG_TYPE
	message: string
	path?: string
}

export interface IDecodedToken {
	uid: string
	rid: string
	fid: string
	iat: number
	exp: number
	aud: string
}

export interface ILoadingAndFailure {
	isLoading: boolean
	isFailure: boolean
}

export type UserPermission = Record<USER_ROLE, string>
export interface IUserPermission {
	[key: string]: string
}

export type UserState = Record<
	USER_STATE,
	{
		translation: string
		tagType: TagType
	}
>

export type ThemeOption = Record<THEME_OPTION, string>

export interface WrappedFieldsProps<ValueType = any> {
	input: Omit<ControllerRenderProps, 'value' | 'onChange'> & {
		value: ValueType
		onChange: (value: ValueType) => void
		onFocus?: (element: React.FocusEvent<HTMLElement, Element>) => void
	}
	meta: Omit<ControllerFieldState, 'error'> & {
		form?: string
		error: ReactNode | null
	}
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type SelectOption<ExtraType extends {} = {}> = {
	key: string
	label: string
	value: string
	disabled?: boolean
	extra?: ExtraType
}

export type SelectOptionWithIcon = SelectOption<{ icon: React.ReactNode }>

export type SelectOptionWithTag = SelectOption<{ tagType: TagType }>

// eslint-disable-next-line @typescript-eslint/ban-types
export type FilterSelectFieldValue<ExtraType extends {} = {}> = string | SelectOption<ExtraType> | (string | SelectOption<ExtraType>)[] | null | undefined

export type UserData = {
	name?: string
	surname?: string
	email?: string
	id: string
}
