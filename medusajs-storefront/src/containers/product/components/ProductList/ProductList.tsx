import ProductCard from '@/components/ProductCard/ProductCard'
import useGetLocalizedProducts from '@/hooks/products/useGetLocalizedProducts'

import * as SC from './ProductListStyles'

const ProductList = () => {
	const { data: localizedData } = useGetLocalizedProducts()

	if (!localizedData) {
		return null
	}

	return (
		<SC.ProductsGrid>
			{localizedData.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</SC.ProductsGrid>
	)
}

export default ProductList
