import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import PrivateWrapper from '@/auth/PrivateWrapper'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Users from '@/containers/users/Users'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { PAGE_IDS } from '@/utils/enums'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: (await import(`../../locales/${locale}.json`)).default
		}
	}
}

const UsersPage = (props: any) => <Users pageID={PAGE_IDS.USERS} {...props} />

UsersPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<PrivateWrapper>
			<MainLayout {...props} pageID={PAGE_IDS.USERS}>
				<ErrorBoundary>{page}</ErrorBoundary>
			</MainLayout>
		</PrivateWrapper>
	)
}

export default UsersPage
