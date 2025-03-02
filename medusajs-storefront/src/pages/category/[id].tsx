import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactElement } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import Category from '@/containers/category/Category'
import { getLocalizedCategories } from '@/hooks/categories/useGetLocalizedCategories'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { PAGE_IDS } from '@/utils/enums'
import { getLocales } from '@/utils/locales'
import { medusa } from '@/utils/medusaHelpers'

export const getStaticPaths: GetStaticPaths = async () => {
	const { regions } = await medusa.regions.list()

	const pathsPromise = await Promise.all(
		regions.map(async (region) => {
			const localizedCategories = await getLocalizedCategories(region.name)
			return localizedCategories.map((category) => [
				{
					params: {
						id: category.handle
					},
					locale: region.name.toLowerCase()
				}
			])
		})
	)
	const paths = pathsPromise.flat().flat()

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
		<MainLayout {...props} pageID={PAGE_IDS.CATEGORY} hasBreadcrumbs>
			<ErrorBoundary>{page}</ErrorBoundary>
		</MainLayout>
	)
}

export default CategoryPage
