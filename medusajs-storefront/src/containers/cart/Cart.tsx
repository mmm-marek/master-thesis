import { Spin } from 'antd'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import Loading from '@/components/Loading/Loading'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './CartStyles'
import CartItems from './components/CartItems/CartItems'
import Summary from './components/Summary/Summary'

const Cart = () => {
	const t = useTranslations('containers.cart')
	const { cart, isUpdatingCart } = useStore()

	if (!cart) {
		return <Loading />
	}

	return (
		<Spin spinning={isUpdatingCart}>
			<Breadcrumb
				items={[
					{
						title: <Link href='/'>{t('home')}</Link>
					},
					{
						title: t('cart')
					}
				]}
			/>
			<SC.CartWrapper>
				<CartItems items={cart?.items ?? []} region={cart?.region} />
				<Summary />
			</SC.CartWrapper>
		</Spin>
	)
}

export default Cart
