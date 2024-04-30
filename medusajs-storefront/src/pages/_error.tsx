import { GetStaticProps } from 'next'
import { useTranslations } from 'next-intl'

import ErrorPage from '@/containers/error/Error'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const ServerError = () => {
	const t = useTranslations('pages.error')

	return <ErrorPage statusCode={500} title={t('internalServerError')} message={t('internalServerErrorInfo')} />
}

export default ServerError
