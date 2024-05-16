import { useProductCategories, useProducts } from 'medusa-react'
import { useRouter } from 'next/router'

import ProductCard from '@/components/ProductCard/ProductCard'

import * as SC from './CategoryStyles'

const Category = () => {
	const router = useRouter()
	const handle = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id

	const { product_categories } = useProductCategories({
		handle
	})

	const { products } = useProducts({
		category_id: product_categories?.map((category) => category.id)
	})

	return (
		<div>
			<SC.ProductsGrid>{products?.map((product) => <ProductCard key={product.id} product={product} />)}</SC.ProductsGrid>
		</div>
	)
}

export default Category
