/**
 * Global configuration for ZOD
 * - default error mapping
 * - serialization and deserialization of validation messages
 */

import { ZodNullable, ZodOptional, ZodString, z } from 'zod'

import { VALIDATION_MAX_LENGTH } from './enums'
import { MessageKey } from './intl'
import { passwordRegEx, uuidRegex } from './regex'

/**
 * Serialize args for i18next.t function
 * @param key localization key
 * @param params additional params, if needed
 * @returns serialized string
 */
export const serializeValidationMessage = (key: MessageKey, params?: object): string =>
	JSON.stringify({
		key,
		params
	})

/**
 * {@link https://zod.dev/ERROR_HANDLING?id=global-error-map Global error messages} for ZOD. Feel free to extend this config, if needed. For specific cases will be better to use {@link https://zod.dev/ERROR_HANDLING?id=schema-bound-error-map Schema-bound}
 * @see https://zod.dev/ERROR_HANDLING
 * @param issue {@link https://zod.dev/ERROR_HANDLING?id=zodissue Zod issue}
 * @param ctx context of parsing
 * @returns default errors
 */
export const defaultErrorMap: z.ZodErrorMap = (issue, ctx) => {
	// Required
	if (issue.code === z.ZodIssueCode.invalid_type) {
		if (issue.received === 'null' || issue.received === 'undefined') {
			return { message: serializeValidationMessage('utils.globalZod.requiredField') }
		}
	}

	if (issue.code === z.ZodIssueCode.too_small) {
		if (issue.type === 'string') {
			return {
				message: serializeValidationMessage('utils.globalZod.requiredField')
			}
		}
		if (issue.type === 'array') {
			return {
				message: serializeValidationMessage('utils.globalZod.requiredField')
			}
		}
	}
	// MAX
	if (issue.code === z.ZodIssueCode.too_big) {
		if (issue.type === 'string') {
			return {
				message: serializeValidationMessage('utils.globalZod.maxCharacters', {
					max: issue.maximum
				})
			}
		}
		if (issue.type === 'number') {
			return {
				message: serializeValidationMessage('utils.globalZod.maxValue', {
					max: issue.maximum
				})
			}
		}
		if (issue.type === 'array') {
			return {
				message: serializeValidationMessage('utils.globalZod.maxItems', {
					max: issue.maximum
				})
			}
		}
	}
	// MIN
	if (issue.code === z.ZodIssueCode.too_small && issue.type === 'number') {
		return {
			message: serializeValidationMessage('utils.globalZod.minValue', {
				min: issue.minimum
			})
		}
	}
	// Invalid format
	if (issue.code === z.ZodIssueCode.invalid_string) {
		if (issue.validation === 'email') {
			return { message: serializeValidationMessage('utils.globalZod.wrongEmailFormat') }
		}

		if (issue.validation === 'uuid') {
			return { message: serializeValidationMessage('utils.globalZod.wrongUuidFormat') }
		}

		if (issue.validation === 'url') {
			return { message: serializeValidationMessage('utils.globalZod.invalidUrl') }
		}
		if (issue.validation === 'regex') {
			return { message: serializeValidationMessage('utils.globalZod.wrongInputFormat') }
		}
	}

	return { message: ctx.defaultError }
}

/*
#### CONSTRAINTS ####
*/

export function stringConstraint<T extends true | false>(maxLength: number, required?: T): T extends true ? ZodString : ZodOptional<ZodNullable<ZodString>>
export function stringConstraint<T extends true | false>(maxLength: number, required?: T): ZodString | ZodOptional<ZodNullable<ZodString>> {
	const base = z.string().max(maxLength)

	if (required) {
		return base.trim().min(1)
	}

	return base.nullish()
}

export const passwordConstraint = z
	.string()
	.regex(passwordRegEx, serializeValidationMessage('utils.globalZod.emailValidationRule'))
	.max(VALIDATION_MAX_LENGTH.LENGTH_255)

export const emailConstraint = z.string().email().trim().max(VALIDATION_MAX_LENGTH.LENGTH_255)

export const uuidConstraint = z.string().regex(uuidRegex, { message: serializeValidationMessage('utils.globalZod.invalidUuidFormat') })
