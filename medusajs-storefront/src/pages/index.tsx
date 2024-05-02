import Medusa from '@medusajs/medusa-js'
import { InferGetStaticPropsType } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Products from '@/containers/products/Products'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { getLocales } from '@/utils/locales'

export const getStaticProps = async ({ locale }: { locale?: string }) => {
	const medusa = new Medusa({ baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL, maxRetries: 3 })
	const products = await medusa.products.list()

	return {
		props: {
			locales: await getLocales(locale),
			products: products.products
		}
	}
}

const DashboardPage = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <Products products={products} />
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<MainLayout>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default DashboardPage
