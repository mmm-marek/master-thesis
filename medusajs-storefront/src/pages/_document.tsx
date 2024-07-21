import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'

import envConfig from '@/config'

import { interFont, tiemposFineFont } from './_app'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: [initialProps.styles, sheet.getStyleElement()]
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel='icon' type='image/png' href='/favicon.png' />
				</Head>
				<body className={`${interFont.variable} ${tiemposFineFont.variable}`}>
					<Main />
					<NextScript />
					<Script src={`https://www.google.com/recaptcha/api.js?render=${envConfig.recaptcha.siteKey}`} strategy='afterInteractive' />
					<Script src='/prevent-theme-flash.js' strategy='beforeInteractive' />
				</body>
			</Html>
		)
	}
}
