import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import Image from 'next/image'

import * as SC from './ProductCardStyles'

type ProductCardProps = {
	product: PricedProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<SC.Product>
			{product.thumbnail && (
				<SC.ImageWrapper>
					<Image src={product.thumbnail} alt={product.title ?? 'Product'} width={50} height={50} unoptimized />
				</SC.ImageWrapper>
			)}
			<SC.ProductTextContent>
				<SC.ProductTitle>{product.title}</SC.ProductTitle>
				<SC.ProductDescription>{product.description}</SC.ProductDescription>
			</SC.ProductTextContent>
		</SC.Product>
	)
}

export default ProductCard
