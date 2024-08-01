import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Cart from '@/containers/cart/Cart'
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

const CartPage = (props: any) => <Cart pageID={PAGE_IDS.CART} {...props} />

CartPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.CART} hasBreadcrumbs>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default CartPage
