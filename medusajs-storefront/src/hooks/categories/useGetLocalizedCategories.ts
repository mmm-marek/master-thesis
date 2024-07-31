import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { localizeCategory } from '@/utils/localization'
import { medusa } from '@/utils/medusaHelpers'

export const getLocalizedCategoriesQueryKey = (regionId?: string) => [QUERY_KEYS.API_GET_LOCALIZED_CATEGORIES, regionId]

export const getLocalizedCategories = async (regionId?: string) => {
	const { product_categories } = await medusa.productCategories.list({
		expand: 'products'
	})

	return product_categories.map((category) => localizeCategory({ category, regionID: regionId }))
}

export const useGetLocalizedCategories = (regionId?: string) => {
	return useQuery({
		queryKey: getLocalizedCategoriesQueryKey(regionId),
		queryFn: async () => getLocalizedCategories(regionId!),
		enabled: !!regionId
	})
}

export default useGetLocalizedCategories
