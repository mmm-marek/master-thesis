import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import ErrorBoundaryExample from '@/containers/errorBoundaryExample/ErrorBoundaryExample'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const ErrorBoundaryPage = (props: any) => <ErrorBoundaryExample pageID={PAGE_IDS.ERROR_BOUNDARY} {...props} />

ErrorBoundaryPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<ErrorBoundary>
			<div {...props}>{page}</div>
		</ErrorBoundary>
	)
}

export default ErrorBoundaryPage
