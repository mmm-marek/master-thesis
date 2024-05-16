import Image from 'next/image'

import useGetProducts from '@/hooks/products/useGetProducts'

import * as SC from './ProductsStyles'

const Products = () => {
	const { data } = useGetProducts()

	const products = data ?? []

	return (
		<SC.ProductsGrid>
			{products.map((product) => (
				<SC.Product key={product.id}>
					{product.images?.at(0) && (
						<SC.ImageWrapper>
							<Image src={product.images.at(0)!.url} alt={product.title ?? 'Product'} width={50} height={50} unoptimized />
						</SC.ImageWrapper>
					)}
					<SC.ProductTextContent>
						<SC.ProductTitle>{product.title}</SC.ProductTitle>
						<SC.ProductDescription>{product.description}</SC.ProductDescription>
					</SC.ProductTextContent>
				</SC.Product>
			))}
		</SC.ProductsGrid>
	)
}

export default Products
