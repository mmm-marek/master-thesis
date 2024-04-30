/* eslint-disable @typescript-eslint/no-namespace */
import { ZodArray, ZodBoolean, ZodBranded, ZodCatch, ZodEffects, ZodNullable, ZodNumber, ZodOptional, ZodString, z } from 'zod'

/**
 * Preprocess helpers (coercing)
 */
export const coerceBoolean = (value: unknown) => {
	if (value === '') return null
	if (value === 'true') return true
	if (value === 'false') return false

	return undefined
}

export const coerceNumber = (value: unknown) => {
	if (value === '') return null

	return Number(value)
}

export const coerceEmptyStringToNull = (value: unknown) => {
	if (value === '') return null

	return value
}

export const coerceArrayOfNumbers = (value: unknown) => {
	if (value === '') return null

	if (Array.isArray(value)) {
		return value.map((arrayValue) => {
			if (arrayValue === '') return undefined
			if (typeof Number(arrayValue) === 'number') return Number(arrayValue)

			return undefined
		})
	}

	return [Number(value)]
}

export const coerceArrayOfStrings = (value: unknown) => {
	if (value === '') return null
	if (value === undefined) return undefined

	if (Array.isArray(value)) {
		return value
	}

	return [value]
}

/**
 * Query params constraints
 */
export namespace q {
	type NonEmptyArray<T> = [T, ...T[]]

	const isNonEmptyArray = <T extends QueryPrimitiveTypes>(value: unknown, type: 'string' | 'number' | 'boolean'): value is NonEmptyArray<T> => {
		return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === type)
	}

	type ConstraintArgs<T, O extends boolean, N extends boolean> =
		| T
		| {
				optional: O
				nullable: N
		  }
	type QueryPrimitiveTypes = string | number | boolean

	type ZodType<T extends QueryPrimitiveTypes> = T extends string ? ZodString : T extends number ? ZodNumber : ZodBoolean

	type ZodArrayType<T extends QueryPrimitiveTypes> = T extends string
		? ZodArray<ZodType<T>, 'atleastone'>
		: T extends number
			? ZodArray<ZodType<T>, 'atleastone'>
			: ZodArray<ZodType<T>, 'atleastone'>

	type ZodEffect<T extends QueryPrimitiveTypes> = ZodEffects<ZodType<T>, T, unknown>

	type ZodArrayEffect<T extends QueryPrimitiveTypes> = ZodEffects<ZodArrayType<T>, NonEmptyArray<T>, unknown>

	/**
	 * Primitive types
	 */

	export function string<T extends string | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodString) => ZodString
	): T extends string // default value is set?
		? ZodCatch<ZodEffect<string>>
		: O extends true // Optional?
			? N extends true // Optional && Nullable?
				? ZodCatch<ZodOptional<ZodNullable<ZodEffect<string>>>> // Optional && Nullable => null | undefined
				: ZodCatch<ZodOptional<ZodEffect<string>>> // Optional && !Nullable => undefined
			: N extends true // Nullable?
				? ZodCatch<ZodNullable<ZodEffect<string>>> // Nullable && !Optional => null
				: ZodBranded<ZodEffect<string>, 'required'> // other cases => string

	/**
	 * Generates a string validator based on the provided configuration.
	 * If a string is provided, it will be used as the default value.
	 * If an object is provided, it will be used as the configuration (optional or nullable)
	 * If config is not provided, it represents a nullish string (optional = true, nullable = true)
	 *
	 * @param {ConstraintArgs<T, O, N>} config - Optional configuration object. See the `ConstraintArgs` type for more details.
	 * @param {Function} modify - Optional function to modify the base schema. Can be used to add additional ZOD restrictions like .min(), .max(), etc.
	 * @return {ZodEffect<string> | ZodCatch<ZodEffect<string>> | ZodCatch<ZodNullable<ZodEffect<string>>> | ZodCatch<ZodOptional<ZodEffect<string>>> | ZodCatch<ZodOptional<ZodNullable<ZodEffect<string>>>>} - The generated string validator.
	 */
	export function string<T extends string | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodString) => ZodString
	):
		| ZodBranded<ZodEffect<string>, 'required'>
		| ZodCatch<ZodEffect<string>>
		| ZodCatch<ZodNullable<ZodEffect<string>>>
		| ZodCatch<ZodOptional<ZodEffect<string>>>
		| ZodCatch<ZodOptional<ZodNullable<ZodEffect<string>>>> {
		const constraint = modify ? modify(z.string()) : z.string()
		const base = z.preprocess((val) => coerceEmptyStringToNull(val), constraint)

		if (typeof config === 'string') {
			return base.catch(config)
		}

		if (!config || (config.optional && config.nullable)) {
			return base.nullish().catch(null)
		}

		if (config.optional) {
			return base.optional().catch(undefined)
		}

		if (config.nullable) {
			return base.nullable().catch(null)
		}

		return base.brand('required')
	}

	export function number<T extends number | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodNumber) => ZodNumber
	): T extends number
		? ZodCatch<ZodEffect<number>>
		: O extends true
			? N extends true
				? ZodCatch<ZodOptional<ZodNullable<ZodEffect<number>>>>
				: ZodCatch<ZodOptional<ZodEffect<number>>>
			: N extends true
				? ZodCatch<ZodNullable<ZodEffect<number>>>
				: ZodBranded<ZodEffects<ZodNumber, number, unknown>, 'required'>

	export function number<T extends number | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodNumber) => ZodNumber
	):
		| ZodBranded<ZodEffects<ZodNumber, number, unknown>, 'required'>
		| ZodCatch<ZodEffect<number>>
		| ZodCatch<ZodNullable<ZodEffect<number>>>
		| ZodCatch<ZodOptional<ZodEffect<number>>>
		| ZodCatch<ZodOptional<ZodNullable<ZodEffect<number>>>> {
		const constraint = modify ? modify(z.number()) : z.number()
		const base = z.preprocess((val) => coerceNumber(val), constraint)

		if (typeof config === 'number') {
			return base.catch(config)
		}

		if (!config || (config.optional && config.nullable)) {
			return base.nullish().catch(null)
		}

		if (config.optional) {
			return base.optional().catch(undefined)
		}

		if (config.nullable) {
			return base.nullable().catch(null)
		}

		return base.brand('required')
	}

	export function boolean<T extends boolean | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodBoolean) => ZodBoolean
	): T extends boolean
		? ZodCatch<ZodEffect<boolean>>
		: O extends true
			? N extends true
				? ZodCatch<ZodOptional<ZodNullable<ZodEffect<boolean>>>>
				: ZodCatch<ZodOptional<ZodEffect<boolean>>>
			: N extends true
				? ZodCatch<ZodNullable<ZodEffect<boolean>>>
				: ZodBranded<ZodEffect<boolean>, 'required'>

	export function boolean<T extends boolean | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodBoolean) => ZodBoolean
	):
		| ZodEffect<boolean>
		| ZodBranded<ZodEffect<boolean>, 'required'>
		| ZodCatch<ZodEffect<boolean>>
		| ZodCatch<ZodNullable<ZodEffect<boolean>>>
		| ZodCatch<ZodOptional<ZodEffect<boolean>>>
		| ZodCatch<ZodOptional<ZodNullable<ZodEffect<boolean>>>> {
		const constraint = modify ? modify(z.boolean()) : z.boolean()
		const base = z.preprocess((val) => coerceBoolean(val), constraint)

		if (typeof config === 'boolean') {
			return base.catch(config)
		}

		if (!config || (config.optional && config.nullable)) {
			return base.nullish().catch(null)
		}

		if (config.optional) {
			return base.optional().catch(undefined)
		}

		if (config.nullable) {
			return base.nullable().catch(null)
		}

		return base.brand('required')
	}

	/**
	 * Arrays
	 */
	export function stringArray<T extends NonEmptyArray<string> | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodArrayType<string>) => ZodArrayType<string>
	): T extends NonEmptyArray<string>
		? ZodCatch<ZodArrayEffect<string>>
		: O extends true
			? N extends true
				? ZodCatch<ZodOptional<ZodNullable<ZodArrayEffect<string>>>>
				: ZodCatch<ZodOptional<ZodArrayEffect<string>>>
			: N extends true
				? ZodCatch<ZodNullable<ZodArrayEffect<string>>>
				: ZodArrayEffect<string>

	export function stringArray<T extends NonEmptyArray<string> | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodArrayType<string>) => ZodArrayType<string>
	):
		| ZodArrayEffect<string>
		| ZodCatch<ZodArrayEffect<string>>
		| ZodCatch<ZodNullable<ZodArrayEffect<string>>>
		| ZodCatch<ZodOptional<ZodArrayEffect<string>>>
		| ZodCatch<ZodOptional<ZodNullable<ZodArrayEffect<string>>>> {
		const constraint = modify ? modify(z.array(z.string()).nonempty()) : z.array(z.string()).nonempty()
		const base = z.preprocess((val) => coerceArrayOfStrings(val), constraint)

		if (config === undefined) {
			return base
		}

		if (isNonEmptyArray<string>(config, 'string')) {
			return base.catch(config)
		}

		if (!config || (config.optional && config.nullable)) {
			return base.nullish().catch(null)
		}

		if (config.optional) {
			return base.optional().catch(undefined)
		}

		if (config.nullable) {
			return base.nullable().catch(null)
		}

		return base
	}

	export function numberArray<T extends NonEmptyArray<number> | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodArrayType<number>) => ZodArrayType<number>
	): T extends NonEmptyArray<number>
		? ZodCatch<ZodArrayEffect<number>>
		: O extends true
			? N extends true
				? ZodCatch<ZodOptional<ZodNullable<ZodArrayEffect<number>>>>
				: ZodCatch<ZodOptional<ZodArrayEffect<number>>>
			: N extends true
				? ZodCatch<ZodNullable<ZodArrayEffect<number>>>
				: ZodArrayEffect<number>

	export function numberArray<T extends NonEmptyArray<number> | undefined, O extends true | false, N extends true | false>(
		config?: ConstraintArgs<T, O, N>,
		modify?: (baseSchema: ZodArrayType<number>) => ZodArrayType<number>
	):
		| ZodArrayEffect<number>
		| ZodCatch<ZodArrayEffect<number>>
		| ZodCatch<ZodNullable<ZodArrayEffect<number>>>
		| ZodCatch<ZodOptional<ZodArrayEffect<number>>>
		| ZodCatch<ZodOptional<ZodNullable<ZodArrayEffect<number>>>> {
		const constraint = modify ? modify(z.array(z.number()).nonempty()) : z.array(z.number()).nonempty()
		const base = z.preprocess((val) => coerceArrayOfNumbers(val), constraint)

		if (config === undefined) {
			return base
		}

		if (isNonEmptyArray<number>(config, 'number')) {
			return base.catch(config)
		}

		if (!config || (config.optional && config.nullable)) {
			return base.nullish().catch(null)
		}

		if (config.optional) {
			return base.optional().catch(undefined)
		}

		if (config.nullable) {
			return base.nullable().catch(null)
		}

		return base
	}
}
