import { NextRouter, useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import z, { ZodSchema, ZodTypeAny } from 'zod'

/**
 * Parser custom hook
 */

const compareQueryValue = (routerQueryValue: unknown, parsedQueryValue: unknown) => {
	// handle ?queryKey=1, ?queryKey=value, ?queryKey1=value&queryKey1=value2
	if (String(routerQueryValue) === String(parsedQueryValue)) return true
	// handle: ?queryKey=&queryKey2=other
	if (routerQueryValue === '' && parsedQueryValue === null) return true

	return false
}

const isRouterQuerySameAsNewValues = (newValues: z.infer<ZodTypeAny>, router: NextRouter) =>
	Object.entries(newValues).every(([key, value]) => {
		return compareQueryValue(router.query[key], value)
	})

/**
 * Generates a hook that parses and manages query parameters.
 *
 * @template TZodSchema The type of the query schema.
 * @param {TZodSchema} querySchema The schema used to parse the query data.
 * @param {boolean} shouldCheckRouterStatus If is needed to check if router is ready (queries are available). To prevent issues with `undefined` query params in *SSG* pages (getStaticProps(..)) set this to `true`. Check is no needed for *SSR*.
 * @returns {Array} An array containing:
 * - `z.infer<TZodSchema>` the parsed query result
 * - `(newValues: z.infer<TZodSchema>) => void` callback to set query params programmatically
 * - `boolean` flag that indicates if there was an error during parsing the query
 */
export function useParseQuery<TZodSchema extends ZodSchema>(
	querySchema: TZodSchema,
	shouldCheckRouterStatus = true
): [z.infer<TZodSchema>, (newValues: z.infer<TZodSchema>) => void, boolean] {
	const router = useRouter()

	const [hasParseError, setHasParseError] = useState<boolean>(false)
	const [parseResult, setParseResult] = useState<z.infer<TZodSchema>>(() => {
		try {
			return querySchema.parse({})
		} catch (error) {
			setHasParseError(true)
			return {}
		}
	})

	const setQueryParams = useCallback(
		(newValues: z.infer<TZodSchema>, skipValidation?: boolean) => {
			if (isRouterQuerySameAsNewValues(newValues, router) === false) {
				let valuesForCheck = newValues

				if (!skipValidation) {
					// Make sure the new values are valid, not just their types
					const parsedNewValues = querySchema.safeParse(newValues)

					if (!parsedNewValues.success) {
						return
					}

					valuesForCheck = parsedNewValues.data
				}

				// Remove all undefined values, because Next.js preserve query key with undefined value
				const filteredParseResult = JSON.parse(JSON.stringify(valuesForCheck))

				router.replace(
					{
						pathname: router.pathname,
						query: filteredParseResult
					},
					undefined,
					{ shallow: true }
				)
			}
		},

		[router, querySchema]
	)

	useEffect(() => {
		if (shouldCheckRouterStatus && !router.isReady) {
			return
		}

		const parsedQueries = querySchema.safeParse(router.query)
		if (!parsedQueries.success) {
			setHasParseError(true)

			return
		}

		// NOTE: validation is skipped because was made on previous lines
		setQueryParams(parsedQueries.data, true)
		setHasParseError(false)
		setParseResult(parsedQueries.data)
	}, [router, querySchema, shouldCheckRouterStatus, setQueryParams])

	return [parseResult, setQueryParams, hasParseError]
}
