import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Category from '@/containers/category/Category'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'
import { medusa } from '@/utils/medusaHelpers'

export const getStaticPaths = async () => {
	const categories = await medusa.productCategories.list()

	const paths = categories.product_categories
		?.filter((category) => category.category_children.length === 0)
		.map((category) => [
			{
				params: {
					id: category.handle
				},
				locale: 'en'
			},
			{
				params: {
					id: category.handle
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locales: await getLocales(locale)
		}
	}
}

const CategoryPage = (props: any) => <Category pageID={PAGE_IDS.CATEGORY} {...props} />

CategoryPage.getLayout = function getLayout(page: ReactElement, props: any) {
	return (
		<MainLayout {...props} pageID={PAGE_IDS.CATEGORY}>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default CategoryPage
