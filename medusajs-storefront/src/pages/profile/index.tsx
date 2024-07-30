import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import PrivateWrapper from '@/auth/PrivateWrapper'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Profile from '@/containers/profile/Profile'
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

type Props = any

const ProfilePage = (props: Props) => <Profile {...props} />

ProfilePage.getLayout = function getLayout(page: ReactElement, props: Props) {
	return (
		<PrivateWrapper>
			<MainLayout {...props} pageID={PAGE_IDS.PROFILE} verticalPadding>
				<ErrorBoundary>{page}</ErrorBoundary>
			</MainLayout>
		</PrivateWrapper>
	)
}

export default ProfilePage
