import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'

import QueryParams from '@/containers/query-params/QueryParams'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const QueryParamsPage = (props: any) => <QueryParams pageID={PAGE_IDS.QUERY_PARAMS} {...props} />

// NOTE: Page is available on URL `/query-params` but needs to be provided query param `score`. See definition in `QueryParams` component
QueryParamsPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<Head>
				<title>Query params testing</title>
			</Head>
			{page}
		</>
	)
}

export default QueryParamsPage
