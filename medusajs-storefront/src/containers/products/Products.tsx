import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import Image from 'next/image'

import * as SC from './ProductsStyles'

type ProductsProps = {
	products: PricedProduct[]
}

const Products = ({ products }: ProductsProps) => {
	return (
		<SC.ProductsGrid>
			{products.map((product) => (
				<SC.Product key={product.id}>
					{product.images?.at(0) && (
						<SC.ImageWrapper>
							<Image src={product.images.at(0)!.url} alt={product.title ?? 'Product'} width={50} height={50} unoptimized objectFit='contain' />
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
