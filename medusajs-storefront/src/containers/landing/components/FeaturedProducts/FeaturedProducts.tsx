import { useProductCategories, useProducts } from 'medusa-react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'
import ProductCard from '@/components/ProductCard/ProductCard'
import { PATHS } from '@/utils/enums'

import * as SC from './FeaturedProductsStyles'

const FEATURED_CATEGORY_HANDLE = 'clothes'

const FeaturedProducts = () => {
	const router = useRouter()
	const t = useTranslations('containers.landing')

	const { product_categories } = useProductCategories({
		handle: FEATURED_CATEGORY_HANDLE
	})

	const { products } = useProducts({
		category_id: product_categories?.map((category) => category.id)
	})

	return (
		<SC.Container>
			<SC.TitleWrapper>
				<SC.Title>{t('productsTitle')}</SC.Title>
				<Button type='primary' shape='round' onClick={() => router.push(`${PATHS.CATEGORY}/${FEATURED_CATEGORY_HANDLE}`)}>
					{t('productsCta')}
				</Button>
			</SC.TitleWrapper>
			<SC.ProductsGrid>{products?.map((product) => <ProductCard key={product.id} product={product} />)}</SC.ProductsGrid>
		</SC.Container>
	)
}

export default FeaturedProducts
