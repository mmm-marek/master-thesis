// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod'

/**
 * Use URL constraint to validate url. Prevent URLs ending with '/'
 */
const urlConstraint = z
	.string()
	.nonempty()
	.url()
	.regex(/^(?!.*\/$).*$/, `ENV variable as URL can't ends with '/'`)

export const EnvSchema = z.object({
	NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z
		.string()
		.nonempty()
		.describe('Variable represents the public site key for integrating the reCAPTCHA service into application.'),
	NEXT_PUBLIC_MEDUSA_BACKEND_URL: urlConstraint.describe('Variable represents the base URL of the API service that application communicates with.'),
	NEXT_PUBLIC_SENTRY_DSN: z.string().nonempty().describe('Unique identifier that connects app with sentry project.'),
	NEXT_PUBLIC_SENTRY_ENV: z.string().nonempty().describe('Variable specify the environment or deployment stage of app for sentry.'),
	ANALYZE: z.string().describe('Used to control whether bundle analysis is enabled or disabled.').nullish(),
	NEXT_PUBLIC_APP_VERSION: z
		.string()
		.optional()
		.describe('Variable represents the version of the application. Automatically set to the current version in package.json.')
})
