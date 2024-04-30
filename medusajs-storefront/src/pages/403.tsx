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

const Forbidden = () => {
	const t = useTranslations('pages.403')

	return <ErrorPage statusCode={403} title={t('forbiddenAccess')} message={t('noPermission')} />
}

export default Forbidden
