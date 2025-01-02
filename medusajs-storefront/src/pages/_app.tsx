import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Locale } from 'antd/lib/locale'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter'
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore'
import minMax from 'dayjs/plugin/minMax'
import timezonePlugin from 'dayjs/plugin/timezone'
import utcPlugin from 'dayjs/plugin/utc'
import { CartProvider, MedusaProvider } from 'medusa-react'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { NextRouter, useRouter } from 'next/router'
import { NextIntlClientProvider } from 'next-intl'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { z } from 'zod'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import { useLoader } from '@/hooks/loader/useLoader'
import AntdProvider from '@/providers/AntdProvider'
import AppStateProvider from '@/providers/AppProvider'
import { StoreProvider } from '@/providers/StoreProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import { DEFAULT_LANGUAGE, ERROR_BOUNDARY_TYPE, LANGUAGE, LOCALES } from '@/utils/enums'
import { defaultErrorMap } from '@/utils/globalZod'

import type { AppProps } from 'next/app'
import 'dayjs/locale/en'
import 'dayjs/locale/sk'

// dayjs plugins
dayjs.extend(isBetween)
dayjs.extend(utcPlugin)
dayjs.extend(isSameOrBeforePlugin)
dayjs.extend(isSameOrAfterPlugin)
dayjs.extend(customParseFormat)
dayjs.extend(timezonePlugin)
dayjs.extend(minMax)
dayjs.locale(LOCALES[DEFAULT_LANGUAGE].countryCode)

declare module 'react-aria-components' {
	interface RouterConfig {
		routerOptions: NonNullable<Parameters<NextRouter['push']>[2]>
	}
}

export const interFont = Inter({ subsets: ['latin', 'latin-ext'], variable: '--inter-font' })
export const tiemposFineFont = localFont({
	src: [
		// Light 300
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-Light.woff2',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-LightItalic.woff2',
			weight: '300',
			style: 'italic'
		},

		// Regular 400
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-RegularItalic.woff2',
			weight: '400',
			style: 'italic'
		},

		// Medium 500
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-Medium.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-MediumItalic.woff2',
			weight: '500',
			style: 'italic'
		},

		// SemiBold 600
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-SemiBold.woff2',
			weight: '600',
			style: 'normal'
		},
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-SemiBoldItalic.woff2',
			weight: '600',
			style: 'italic'
		},

		// Bold 700
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-Bold.woff2',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-BoldItalic.woff2',
			weight: '700',
			style: 'italic'
		},

		// Black 900
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-Black.woff2',
			weight: '900',
			style: 'normal'
		},
		{
			path: '../assets/fonts/TiemposFine/TiemposFine-BlackItalic.woff2',
			weight: '900',
			style: 'italic'
		}
	],
	variable: '--tiempos-fine-font'
})

// set default errors for ZOD
z.setErrorMap(defaultErrorMap)

// Per-Page Layouts: https://nextjs.org/docs/basic-features/layouts#with-typescript
type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement, props?: any) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	const router = useRouter()
	const [antdLocale, setAntdLocale] = useState<Locale>(LOCALES[DEFAULT_LANGUAGE].antD)
	const [timeZone, setTimeZone] = useState<string>(LOCALES[DEFAULT_LANGUAGE].timeZone)

	// client side navigation loader initialisation
	useLoader()

	// dayjs and antd locale setup
	useEffect(() => {
		const locale = LOCALES[router.locale as LANGUAGE] || LOCALES[DEFAULT_LANGUAGE]
		dayjs.locale(locale.ISO_639)
		setAntdLocale(locale.antD)
		setTimeZone(locale.timeZone)
	}, [router.locale])

	// query client setup
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: false,
						// Disable caching by default
						cacheTime: 0
					}
				}
			})
	)

	// Per-Page Layouts: https://nextjs.org/docs/basic-features/layouts#with-typescript
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<MedusaProvider baseUrl={process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!} queryClientProviderProps={{ client: queryClient }}>
			<NextIntlClientProvider messages={pageProps.locales} locale={router.locale} timeZone={timeZone}>
				<ErrorBoundary fallbackType={ERROR_BOUNDARY_TYPE.REPORT_DIALOG}>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<ThemeProvider>
								<AntdProvider locale={antdLocale}>
									<RouterProvider navigate={(href, opts) => router.push(href, undefined, opts)}>
										<AppStateProvider>
											<CartProvider>
												<StoreProvider>{getLayout(<Component {...pageProps} />, pageProps)}</StoreProvider>
											</CartProvider>
										</AppStateProvider>
									</RouterProvider>
								</AntdProvider>
							</ThemeProvider>
						</Hydrate>
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</ErrorBoundary>
			</NextIntlClientProvider>
		</MedusaProvider>
	)
}

export default App
