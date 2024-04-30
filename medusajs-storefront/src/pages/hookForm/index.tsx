import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import HookForm from '@/containers/hookForm/HookForm'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { FormsContextProvider } from '@/providers/FormsProvider'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const HookFormPage = (props: any) => <HookForm pageID={PAGE_IDS.HOOK_FORM} {...props} />

HookFormPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.HOOK_FORM}>
			<ErrorBoundary>
				<FormsContextProvider>{page}</FormsContextProvider>
			</ErrorBoundary>
		</MainLayout>
	)
}

export default HookFormPage
