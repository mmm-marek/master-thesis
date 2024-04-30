import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import PrivateWrapper from '@/auth/PrivateWrapper'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import Permissions from '@/utils/Permissions'
import { PAGE_IDS, USER_ROLE } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const DashboardPage = () => {
	return (
		<Permissions
			allowed={[USER_ROLE.ADMINISTRATOR]}
			render={(hasPermissions) => {
				if (hasPermissions) {
					return <div>Admin Dashboard</div>
				}
				return <div>User Dashboard</div>
			}}
		/>
	)
}

DashboardPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<PrivateWrapper>
			<MainLayout {...props} pageID={PAGE_IDS.DASHBOARD}>
				<ErrorBoundary>{page}</ErrorBoundary>
			</MainLayout>
		</PrivateWrapper>
	)
}

export default DashboardPage
