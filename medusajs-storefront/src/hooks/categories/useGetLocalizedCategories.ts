import { ProductCategory } from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'

import { getCategoryLocalizationSchema } from '@/schemas/pages/products'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

export const getLocalizedCategoriesQueryKey = (regionId?: string) => [QUERY_KEYS.API_GET_LOCALIZED_CATEGORIES, regionId]

export const getLocalizedCategories = async (regionId?: string) => {
	const { product_categories } = await medusa.productCategories.list()

	if (!regionId) {
		return product_categories
	}

	const localizedCategories = product_categories.map((category) => {
		const parsedCategory = getCategoryLocalizationSchema(category, regionId).safeParse(category)

		if (!parsedCategory.success) {
			return category
		}

		const regionLocalization = parsedCategory.data.metadata?.localization[regionId]
		return {
			...category,
			// In case region is not localized, return the original category attributes
			name: regionLocalization?.name ?? category.name,
			description: regionLocalization?.description ?? category.description,
			handle: regionLocalization?.handle ?? category.handle
		} as ProductCategory
	})

	return localizedCategories
}

export const useGetLocalizedCategories = (regionId?: string) => {
	return useQuery({
		queryKey: getLocalizedCategoriesQueryKey(regionId),
		queryFn: async () => getLocalizedCategories(regionId!),
		enabled: !!regionId
	})
}

export default useGetLocalizedCategories
