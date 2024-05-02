import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Products from '@/containers/products/Products'
import { getProducts, productsQueryKey } from '@/hooks/products/useGetProducts'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { getLocales } from '@/utils/locales'

export const getStaticProps = async ({ locale }: { locale?: string }) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: productsQueryKey,
		queryFn: getProducts
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
