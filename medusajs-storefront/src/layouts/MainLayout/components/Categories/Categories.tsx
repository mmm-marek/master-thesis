import { useProductCategories } from 'medusa-react'

import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'

import * as SC from './CategoriesStyles'

const Categories = () => {
	const { product_categories, isError, isLoading } = useProductCategories()

	if (isLoading) {
		return <Loading />
	}

	if (isError) {
		return <Error />
	}

	return (
		<SC.Wrapper>
			{product_categories
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
