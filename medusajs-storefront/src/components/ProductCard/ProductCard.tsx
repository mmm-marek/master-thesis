import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { PATHS } from '@/utils/enums'

import * as SC from './ProductCardStyles'

type ProductCardProps = {
	product: PricedProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
	const router = useRouter()

	return (
		<SC.Product onClick={() => router.push(`${PATHS.PRODUCTS}/${product.id}`)}>
			{product.thumbnail && (
				<SC.ImageWrapper>
					<Image src={product.thumbnail} alt={product.title ?? 'Product'} width={50} height={50} unoptimized />
				</SC.ImageWrapper>
			)}
			<SC.ProductTitle>{product.title}</SC.ProductTitle>
		</SC.Product>
	)
}

export default ProductCard
