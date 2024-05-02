import { useProducts } from 'medusa-react'
import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import MainLayout from '@/layouts/MainLayout/MainLayout'
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

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Admin content</p>
		</div>
	)
}

DashboardPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default DashboardPage
