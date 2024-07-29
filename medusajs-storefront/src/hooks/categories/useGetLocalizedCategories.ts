import { ProductCategory } from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'

import { getCategoryLocalizationSchema } from '@/schemas/pages/products'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type LocalizedCategory = ProductCategory & {
	localizedName: string
	localizedDescription: string
	localizedHandle: string
}

export const getLocalizedCategoriesQueryKey = (regionId?: string) => [QUERY_KEYS.API_GET_LOCALIZED_CATEGORIES, regionId]

export const getLocalizedCategories = async (regionId?: string) => {
	const { product_categories } = await medusa.productCategories.list()

	if (!regionId) {
		return product_categories.map((category) => ({
			...category,
			localizedName: category.name,
			localizedDescription: category.description,
			localizedHandle: category.handle
		}))
	}

	const localizedCategories = product_categories.map((category) => {
		const parsedCategory = getCategoryLocalizationSchema(category, regionId).safeParse(category)

		if (!parsedCategory.success) {
			return {
				...category,
				localizedName: category.name,
				localizedDescription: category.description,
				localizedHandle: category.handle
			}
		}

		const regionLocalization = parsedCategory.data.metadata?.localization[regionId]
		return {
			...category,
			// In case region is not localized, return the original category attributes
			localizedName: regionLocalization?.name || category.name,
			localizedDescription: regionLocalization?.description || category.description,
			localizedHandle: regionLocalization?.handle || category
		} as LocalizedCategory
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
