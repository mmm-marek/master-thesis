import { ProductCategory } from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/providers/StoreProvider'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

export const getLocalizedCategoriesQueryKey = (languageCode?: string) => [QUERY_KEYS.API_GET_LOCALIZED_CATEGORIES, languageCode]

export const getLocalizedCategories = async (languageCode?: string) => {
	const { localizedCategories } = await medusa.client.request('GET', `/store/localized-category`, undefined, undefined, {
		'accept-language': languageCode
	})

	return localizedCategories as ProductCategory[]
}

export const useGetLocalizedCategories = () => {
	const { getRegion } = useStore()
	const languageCode = getRegion()?.countryCode

	return useQuery({
		queryKey: getLocalizedCategoriesQueryKey(languageCode!),
		queryFn: async () => getLocalizedCategories(languageCode!),
		enabled: !!languageCode
	})
}

export default useGetLocalizedCategories
