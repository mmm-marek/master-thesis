import Link from 'next/link'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'

import ProductList from './components/ProductList/ProductList'

const Products = () => {
	const t = useTranslations('containers.products')

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: <Link href='/'>{t('home')}</Link>
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
