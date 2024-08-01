import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Checkout from '@/containers/checkout/Checkout'
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

const CartPage = (props: any) => <Checkout pageID={PAGE_IDS.CHECKOUT} {...props} />

CartPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.CHECKOUT}>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default CartPage
