import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import ErrorObserverExample from '@/containers/errorObserverExample/ErrorObserverExample'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const ErrorObserverPage = (props: any) => <ErrorObserverExample pageID={PAGE_IDS.ERROR_OBSERVER} {...props} />

ErrorObserverPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<ErrorBoundary>
			<div {...props}>{page}</div>
		</ErrorBoundary>
	)
}

export default ErrorObserverPage
