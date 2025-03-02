import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import { PATHS } from '@/utils/enums'

import * as SC from './ProductCardStyles'

type ProductCardProps = {
	product: any // TODO: Fix
}

const ProductCard = ({ product }: ProductCardProps) => {
	const router = useRouter()
	const t = useTranslations('components.productCard')

	return (
		<SC.Product onClick={() => router.push(`${PATHS.PRODUCTS}/${product.handle}`)}>
			{product.thumbnail && (
				<SC.ImageWrapper>
					<Image src={product.thumbnail} alt={product.title ?? t('title')} width={50} height={50} unoptimized />
				</SC.ImageWrapper>
			)}
			<SC.ProductTitle>{product.title}</SC.ProductTitle>
		</SC.Product>
	)
}

export default ProductCard
