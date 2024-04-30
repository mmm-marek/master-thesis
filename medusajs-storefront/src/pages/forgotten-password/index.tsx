import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import ForgottenPassword from '@/containers/forgottenPassword/ForgottenPassword'
import LoginLayout from '@/layouts/LoginLayout/LoginLayout'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			// TODO: use getLocales everywhere!
			locales: await getLocales(locale)
		}
	}
}

const ForgottenPasswordPage = (props: any) => <ForgottenPassword pageID={PAGE_IDS.FORGOTTEN_PASSWORD} {...props} />

ForgottenPasswordPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<LoginLayout {...props} pageID={PAGE_IDS.FORGOTTEN_PASSWORD}>
			<ErrorBoundary>{page}</ErrorBoundary>
		</LoginLayout>
	)
}

export default ForgottenPasswordPage
