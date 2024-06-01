import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { IntlTranslator } from '@/utils/intl'

import Loading from './Loading/Loading'

type Props = PropsWithChildren

const AppInit = (props: Props) => {
	const { locale } = useRouter()

	const { children } = props

	const [intlInitialized, setIntlInitialized] = useState(false)

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
		case intlInitialized === false:
			return <Loading height='100vh' />
		default:
			return children
	}
}

export default AppInit
