import { toNestErrors, validateFieldsNatively } from '@hookform/resolvers'
import { FieldError, FieldErrors, FieldValues, ResolverOptions, ResolverResult, appendErrors } from 'react-hook-form'
import { ZodError, z } from 'zod'

import { t } from '@/utils/intl'

// utils

/**
 * Deserialize ZOD message to args for next-intl, t function
 * @param message serialized args
 * @returns object containing localization key and additional params
 */
export const deserializeValidationMessage = (message?: string) => {
	if (message) {
		try {
			const translation = JSON.parse(message)
			return t(translation.key, translation.params)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.warn('DeserializeValidationMessage - invalid JSON format of error message:', message)
		}
	}

	return t('utils.zodResolver.generalError')
}

const isZodError = (error: any): error is ZodError => error.errors != null

type Resolver = <T extends z.Schema<any, any>>(
	schema: T,
	schemaOptions?: Partial<z.ParseParams>,
	factoryOptions?: {
		/**
		 * @default async
		 */
		mode?: 'async' | 'sync'
		/**
		 * Return the raw input values rather than the parsed values.
		 * @default false
		 */
		raw?: boolean
	}
) => <TFieldValues extends FieldValues, TContext>(
	values: TFieldValues,
	context: TContext | undefined,
	options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>>

const parseErrorSchema = (zodErrors: z.ZodIssue[], validateAllFieldCriteria: boolean) => {
	const errors: Record<string, FieldError> = {}
	for (; zodErrors.length; ) {
		const error = zodErrors[0]

		// NOTE: all the "!" were added after turning on "noUncheckedIndexedAccess" in tsconfig - fix later if necessary
		const { code, message, path } = error!
		const parsedPath = path.join('.')

		if (!errors[parsedPath]) {
			if ('unionErrors' in error!) {
				const unionError = error.unionErrors[0]!.errors[0]

				errors[parsedPath] = {
					message: deserializeValidationMessage(unionError!.message),
					type: unionError!.code
				}
			} else {
				errors[parsedPath] = { message: deserializeValidationMessage(message), type: code }
			}
		}

		if ('unionErrors' in error!) {
			error.unionErrors.forEach((unionError) =>
				unionError.errors.forEach((e) =>
					zodErrors.push({
						...e,
						message: deserializeValidationMessage(e.message)
					})
				)
			)
		}

		if (validateAllFieldCriteria) {
			const { types } = errors[parsedPath]!
			const messages = types && types[error!.code]

			const parsedPathMessage = deserializeValidationMessage(error!.message)

			errors[parsedPath] = appendErrors(
				parsedPath,
				validateAllFieldCriteria,
				errors,
				code,
				messages ? ([] as string[]).concat(messages as string[], parsedPathMessage) : parsedPathMessage
			) as FieldError
		}

		zodErrors.shift()
	}

	return errors
}

export const zodResolver: Resolver =
	(schema, schemaOptions, resolverOptions: any = {}) =>
	async (values, _, options) => {
		try {
			const data = await schema[resolverOptions.mode === 'sync' ? 'parse' : 'parseAsync'](values, schemaOptions)

			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			options.shouldUseNativeValidation && validateFieldsNatively({}, options)

			return {
				errors: {} as FieldErrors,
				values: resolverOptions.raw ? values : data
			}
		} catch (error: any) {
			if (isZodError(error)) {
				return {
					values: {},
					errors: toNestErrors(parseErrorSchema(error.errors, !options.shouldUseNativeValidation && options.criteriaMode === 'all'), options)
				}
			}

			throw error
		}
	}
