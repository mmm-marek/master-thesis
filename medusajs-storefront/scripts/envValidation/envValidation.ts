/* eslint-disable import/extensions */
/* eslint-disable no-console */

import { EnvSchema } from './schema'

// run env validation
export default (async () => {
	try {
		// build env values
		const envValues = {
			...process.env
		}

		const validationResult = EnvSchema.safeParse(envValues)

		if (validationResult.success !== false) {
			// \x1b[32m -> green color
			console.log('\x1b[32m', '\n✅ All required ENV variables successfully loaded.\n')
		} else {
			// \x1b[31m -> red color, \x1b[0m -> reset color (so the table colors are not broken)
			console.log('\x1b[31m', '❌ Errors occured with ENV variables', '\x1b[0m')

			const tableFormat = validationResult.error.issues.map((zodError) => {
				return {
					envName: zodError.path[0],
					errorMessage: zodError.message
				}
			})

			console.table(tableFormat)
		}
	} catch (err) {
		// \x1b[31m -> red color
		console.log('\x1b[31m', `\n❌ Unable to validate env: ${err}\n`)
		process.exit(1)
	}
})()
