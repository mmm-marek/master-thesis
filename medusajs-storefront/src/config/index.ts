// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod'

// eslint-disable-next-line import/no-named-as-default
import { EnvSchema } from '../../scripts/envValidation/schema'

type EnvType = z.infer<typeof EnvSchema>

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ProcessEnv extends EnvType {}
	}
}

const envConfig = {
	recaptcha: {
		siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
	},
	apiUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
	sentry: {
		dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
		env: process.env.NEXT_PUBLIC_SENTRY_ENV
	},
	nodeEnv: process.env.NODE_ENV,
	appVersion: process.env.NEXT_PUBLIC_APP_VERSION
}

export default envConfig
