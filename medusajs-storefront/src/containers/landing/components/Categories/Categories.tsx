import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import useGetLocalizedCategories from '@/hooks/categories/useGetLocalizedCategories'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './CategoriesStyles'

const Categories = () => {
	const { cart } = useStore()
	const { data: categories, isError, isLoading } = useGetLocalizedCategories(cart?.region_id)

	if (isLoading) {
		return <Loading />
	}

	if (isError) {
		return <Error />
	}

	return (
		<SC.Container>
			<SC.IllustrationImage src='/images/t-shirt-illustration.png' alt='landing' width={1180} height={904} />
			{categories.map((category) => (
				<SC.CategoryCard key={category.id}>
					<SC.Name>{category.localizedName}</SC.Name>
					<SC.Description>{category.localizedDescription}</SC.Description>
				</SC.CategoryCard>
			))}
		</SC.Container>
	)
}

export default Categories
