import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import ProductCard from '@/components/ProductCard/ProductCard'
import useGetLocalizedProducts from '@/hooks/products/useGetLocalizedProducts'
import { PATHS } from '@/utils/enums'

import * as SC from './CategoryStyles'

const Category = () => {
	const router = useRouter()
	const t = useTranslations('containers.category')
	const handle = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id

	const { data: products } = useGetLocalizedProducts(handle)

	const productCategories = products?.map((product) => product.categories).flat()

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: t('home'),
						href: PATHS.HOME
					},
					{
						title: productCategories?.map((category) => category.name.charAt(0).toUpperCase() + category.name.slice(1))?.join(',') ?? ''
					}
				]}
			/>
			<SC.ProductsGrid>{products?.map((product) => <ProductCard key={product.id} product={product} />)}</SC.ProductsGrid>
		</>
	)
}

export default Category
