import Medusa from '@medusajs/medusa-js'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Products from '@/containers/products/Products'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { QUERY_KEYS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getStaticProps = async ({ locale }: { locale?: string }) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEYS.API_GET_PRODUCTS],
		queryFn: async () => {
			const medusa = new Medusa({ baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL, maxRetries: 3 })
			const products = await medusa.products.list()

			return products.products
		}
	})

	return {
		props: {
			locales: await getLocales(locale),
			dehydratedState: dehydrate(queryClient)
		}
	}
}

const DashboardPage = () => {
	return <Products />
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<MainLayout>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default DashboardPage
