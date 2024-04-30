import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import ResetPassword from '@/containers/resetPassword/ResetPassword'
import LoginLayout from '@/layouts/LoginLayout/LoginLayout'
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

const ResetPasswordPage = (props: any) => <ResetPassword pageID={PAGE_IDS.RESET_PASSWORD} {...props} />

ResetPasswordPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<LoginLayout {...props} pageID={PAGE_IDS.RESET_PASSWORD}>
			<ErrorBoundary>{page}</ErrorBoundary>
		</LoginLayout>
	)
}

export default ResetPasswordPage
