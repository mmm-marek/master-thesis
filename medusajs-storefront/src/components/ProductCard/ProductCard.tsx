import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import Image from 'next/image'

import Button from '@/atoms/Button/Button'

import * as SC from './ProductCardStyles'
import { useStore } from '@/providers/StoreProvider'
import { useCart } from 'medusa-react'

type ProductCardProps = {
	product: PricedProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
	const { cart } = useCart()
	const { addItem } = useStore()

	const handleAddToCart = () => {
		addItem({
			quantity: 1,
			variantId: product.variants[0]!.id!
		})
	}

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
				<Button size='large' type='primary' onClick={handleAddToCart}>
					Add to cart
				</Button>
			</SC.ProductTextContent>
		</SC.Product>
	)
}

export default ProductCard
