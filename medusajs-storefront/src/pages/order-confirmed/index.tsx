import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import OrderConfirmed from '@/containers/checkout/components/OrderConfirmed/OrderConfirmed'
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

const OrderConfirmedPage = (props: any) => <OrderConfirmed pageID={PAGE_IDS.ORDER_CONFIRMED} {...props} />

OrderConfirmedPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.ORDER_CONFIRMED} verticalPadding>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default OrderConfirmedPage
