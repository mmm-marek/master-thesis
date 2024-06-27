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
		<SC.Wrapper>
			{categories
				?.filter((category) => category.category_children.length === 0)
				.map((category) => (
					<SC.CategoryLink href={`/category/${category.handle}`} key={category.id}>
						{category.name}
					</SC.CategoryLink>
				))}
		</SC.Wrapper>
	)
}
export default Categories
