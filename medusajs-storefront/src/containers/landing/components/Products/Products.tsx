import ProductCard from '@/components/ProductCard/ProductCard'
import useGetProducts from '@/hooks/products/useGetProducts'

import * as SC from './ProductsStyles'

const Products = () => {
	const { data } = useGetProducts()

	const products = data ?? []

	return (
		<SC.ProductsGrid>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</SC.ProductsGrid>
	)
}

export default Products
