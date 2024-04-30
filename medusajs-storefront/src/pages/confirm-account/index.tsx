import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import ConfirmAccountInvite from '@/containers/confirmAccountInvite/ConfirmAccountInvite'
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

const ConfirmAccountInvitePage = (props: any) => <ConfirmAccountInvite pageID={PAGE_IDS.CONFIRM_ACCOUNT} {...props} />

ConfirmAccountInvitePage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<LoginLayout {...props} pageID={PAGE_IDS.CONFIRM_ACCOUNT}>
			<ErrorBoundary>{page}</ErrorBoundary>
		</LoginLayout>
	)
}

export default ConfirmAccountInvitePage
