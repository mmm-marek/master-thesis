import { useProducts } from 'medusa-react'
import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const DashboardPage = () => {
	const { products } = useProducts()

	console.log(products)

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Admin content</p>
		</div>
	)
}

DashboardPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<div {...props}>
			<ErrorBoundary>{page}</ErrorBoundary>
		</div>
	)
}

export default DashboardPage
