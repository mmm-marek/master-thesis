import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Landing from '@/containers/landing/Landing'
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
	return <Landing />
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<MainLayout verticalPadding>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default DashboardPage
