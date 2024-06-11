import BundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs'

const withBundleAnalyzer = BundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'sk'],
		defaultLocale: 'en'
	},
	compiler: {
		styledComponents: true
	},
	webpack(config) {
		config.module.rules.push(
			{
				test: /\.svg$/,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack'],
				resourceQuery: { not: [/url/] } // exclude react component if *.svg?url
			},
			{
				test: /\.svg$/,
				issuer: /\.[jt]sx?$/,
				type: 'asset',
				resourceQuery: /url/
			}
		)
		return config
	}
}

const userSentryWebpackPluginOptions = {
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options

	// Suppresses source map uploading logs during build
	silent: true,

	org: 'goodrequest',
	project: 'template-frontend-next' // TODO: change this to the actual project name
}

const sentryOptions = {
	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: false,

	// Hides source maps from generated client bundles
	hideSourceMaps: true,

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true
}

// Make sure adding Sentry options is the last code to run before exporting
export default withBundleAnalyzer(withSentryConfig(nextConfig, userSentryWebpackPluginOptions, sentryOptions))
