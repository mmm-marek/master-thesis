import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from '@/atoms/Button/Button'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './ProductCardStyles'

type ProductCardProps = {
	product: PricedProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
	const router = useRouter()
	const { addItem } = useStore()

	const handleAddToCart = () => {
		addItem({
			quantity: 1,
			variantId: product.variants[0]!.id!
		})
	}

	return (
		<SC.Product onClick={() => router.push(`/${PATHS.PRODUCT}/${product.id}`)}>
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
