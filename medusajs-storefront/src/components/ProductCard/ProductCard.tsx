import Image from 'next/image'
import { useRouter } from 'next/router'

import { LocalizedProduct } from '@/hooks/products/types'
import { PATHS } from '@/utils/enums'

import * as SC from './ProductCardStyles'

type ProductCardProps = {
	product: LocalizedProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
	const router = useRouter()

	return (
		<SC.Product onClick={() => router.push(`${PATHS.PRODUCTS}/${product.handle}`)}>
			{product.thumbnail && (
				<SC.ImageWrapper>
					<Image src={product.thumbnail} alt={product.localizedTitle ?? 'Product'} width={50} height={50} unoptimized />
				</SC.ImageWrapper>
			)}
			<SC.ProductTitle>{product.localizedTitle}</SC.ProductTitle>
		</SC.Product>
	)
}

export default ProductCard
