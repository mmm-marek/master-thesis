import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import { PATHS } from '@/utils/enums'

import ProductList from './components/ProductList/ProductList'

const Products = () => {
	const t = useTranslations('containers.products')

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: t('home'),
						href: PATHS.HOME
					},
					{
						title: t('products')
					}
				]}
			/>
			<ProductList />
		</>
	)
}

export default Products
