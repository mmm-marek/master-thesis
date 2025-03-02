import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'
import ProductCard from '@/components/ProductCard/ProductCard'
import useGetLocalizedProducts from '@/hooks/products/useGetLocalizedProducts'
import { PATHS } from '@/utils/enums'

import * as SC from './FeaturedProductsStyles'

const FEATURED_CATEGORY_HANDLE = 'clothes'

const FeaturedProducts = () => {
	const router = useRouter()
	const t = useTranslations('containers.landing')

	const { data: products } = useGetLocalizedProducts(FEATURED_CATEGORY_HANDLE)

	return (
		<SC.Container>
			<SC.TitleWrapper>
				<SC.Title>{t('productsTitle')}</SC.Title>
				<Button variant='primary' onPress={() => router.push(`${PATHS.CATEGORY}/${FEATURED_CATEGORY_HANDLE}`)}>
					{t('productsCta')}
				</Button>
			</SC.TitleWrapper>
			<SC.ProductsGrid>{products?.map((product) => <ProductCard key={product.id} product={product} />)}</SC.ProductsGrid>
		</SC.Container>
	)
}

export default FeaturedProducts
