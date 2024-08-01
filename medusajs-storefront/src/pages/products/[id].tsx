import { GetStaticProps } from 'next'
import Router from 'next/router'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Product from '@/containers/product/Product'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'
import { medusa } from '@/utils/medusaHelpers'

export const getStaticPaths = async () => {
	const { products } = await medusa.products.list()

	const paths = products
		.map((product) => [
			{
				params: {
					id: product.handle
				},
				locale: 'en'
			},
			{
				params: {
					id: product.handle
				},
				locale: 'sk'
			}
		])
		.flat()

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
	if (!params || !params!.id || typeof params.id !== 'string') {
		Router.push('/404')
		return { props: {} }
	}

	return {
		props: {
			locales: await getLocales(locale),
			id: params.id
		}
	}
}

const ProductPage = (props: any) => <Product pageID={PAGE_IDS.PRODUCT} {...props} />

ProductPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.PRODUCT} hasBreadcrumbs>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default ProductPage
