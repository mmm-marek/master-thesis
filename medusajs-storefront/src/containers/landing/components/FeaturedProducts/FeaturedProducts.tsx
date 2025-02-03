import { useProductCategories } from 'medusa-react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'
import ProductCard from '@/components/ProductCard/ProductCard'
import useGetLocalizedProducts from '@/hooks/products/useGetLocalizedProducts'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './FeaturedProductsStyles'

const FEATURED_CATEGORY_HANDLE = 'clothes'

const FeaturedProducts = () => {
	const router = useRouter()
	const { cart } = useStore()
	const t = useTranslations('containers.landing')

	const { product_categories } = useProductCategories({
		handle: FEATURED_CATEGORY_HANDLE
	})

	const { data: products } = useGetLocalizedProducts({
		categoryID: product_categories?.map((category) => category.id),
		regionID: cart?.region_id
	})

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
