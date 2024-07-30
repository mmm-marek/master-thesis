import { useProductCategories } from 'medusa-react'
import { useRouter } from 'next/router'

import ProductCard from '@/components/ProductCard/ProductCard'
import useGetLocalizedProducts from '@/hooks/products/useGetLocalizedProducts'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './CategoryStyles'

const Category = () => {
	const { cart } = useStore()
	const router = useRouter()
	const handle = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id

	const { product_categories } = useProductCategories({
		handle
	})

	const { data: products } = useGetLocalizedProducts({
		regionID: cart?.region_id,
		categoryID: product_categories?.map((category) => category.id)
	})

	return <SC.ProductsGrid>{products?.map((product) => <ProductCard key={product.id} product={product} />)}</SC.ProductsGrid>
}

export default Category
