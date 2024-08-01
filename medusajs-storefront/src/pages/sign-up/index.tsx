import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import SignUp from '@/containers/signUp/SignUp'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
	return {
		props: {
			locales: await getLocales(locale),
			token: query?.t || null
		}
	}
}

const SignUpPage = (props: any) => <SignUp pageID={PAGE_IDS.SIGN_UP} {...props} />

SignUpPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.SIGN_UP} hasBreadcrumbs>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default SignUpPage
