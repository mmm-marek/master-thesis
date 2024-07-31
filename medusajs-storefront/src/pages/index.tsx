import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Landing from '@/containers/landing/Landing'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { getLocales } from '@/utils/locales'

export const getStaticProps = async ({ locale }: { locale?: string }) => {
	return {
		props: {
			locales: await getLocales(locale)
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
