import { useProductCategories } from 'medusa-react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import ProductCard from '@/components/ProductCard/ProductCard'
import useGetLocalizedProducts from '@/hooks/products/useGetLocalizedProducts'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'
import { localizeCategory } from '@/utils/localization'

import * as SC from './CategoryStyles'

const Category = () => {
	const t = useTranslations('containers.category')
	const { cart } = useStore()
	const router = useRouter()
	const handle = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id

	const { product_categories } = useProductCategories({
		handle
	})

	const { data: products } = useGetLocalizedProducts({
		regionID: cart?.region_id,
		categoryID: product_categories?.map((category) => category.id)
	})

	const localizedCategories = product_categories?.map((category) =>
		localizeCategory({
			category,
			regionID: cart?.region_id
		})
	)

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: t('home'),
						href: PATHS.HOME
					},
					{
						title:
							localizedCategories
								?.map((category) => category.localizedName.charAt(0).toUpperCase() + category.localizedName.slice(1))
								?.join(',') ?? ''
					}
				]}
			/>
			<SC.ProductsGrid>{products?.map((product) => <ProductCard key={product.id} product={product} />)}</SC.ProductsGrid>
		</>
	)
}

export default Category
