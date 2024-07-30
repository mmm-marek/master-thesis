import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Login from '@/containers/login/Login'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const LoginPage = (props: any) => <Login pageID={PAGE_IDS.LOGIN} {...props} />

LoginPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.LOGIN} verticalPadding>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default LoginPage
