import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import useRefreshToken from '@/hooks/auth/useRefreshToken'
import { REFRESH_TOKEN_INTERVAL } from '@/utils/enums'
import { setIntervalImmediately } from '@/utils/helpers'
import { IntlTranslator } from '@/utils/intl'

import Loading from './Loading/Loading'

type Props = PropsWithChildren

/**
 * To demonstrate error on root level set to 'true'
 */
// eslint-disable-next-line prefer-const
let throwRootLevelError = false

const AppInit = (props: Props) => {
	const { locale } = useRouter()
	const refreshToken = useRefreshToken()

	const { children } = props

	const [loadingRefreshToken, setLoadingRefreshToken] = useState(true)
	const [intlInitialized, setIntlInitialized] = useState(false)

	useEffect(() => {
		// periodically refresh tokens
		const refreshInterval = setIntervalImmediately(async () => {
			refreshToken.mutate(undefined, {
				onSettled: () => setLoadingRefreshToken(false)
			})
		}, REFRESH_TOKEN_INTERVAL)

		return () => {
			if (refreshInterval) {
				clearInterval(refreshInterval)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const initIntl = useCallback(async (currentLocale: string) => {
		setIntlInitialized(false)
		await IntlTranslator.initAsync(currentLocale)
		setIntlInitialized(true)
	}, [])

	useEffect(() => {
		if (locale) {
			initIntl(locale)
		}
	}, [locale, initIntl])

	switch (true) {
		case intlInitialized === false || loadingRefreshToken:
			return <Loading height='100vh' />
		case throwRootLevelError:
			throw new Error('Root level error')
		default:
			return children
	}
}

export default AppInit
