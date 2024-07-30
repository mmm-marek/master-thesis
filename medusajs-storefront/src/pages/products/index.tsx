import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Products from '@/containers/product/Products'
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

const ProductsPage = (props: any) => <Products pageID={PAGE_IDS.PRODUCTS} {...props} />

ProductsPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.PRODUCTS} verticalPadding>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default ProductsPage
