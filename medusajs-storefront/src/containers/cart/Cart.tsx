import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import Loading from '@/components/Loading/Loading'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './CartStyles'
import CartItems from './components/CartItems/CartItems'
import Summary from './components/Summary/Summary'

const Cart = () => {
	const t = useTranslations('containers.cart')
	const { cart } = useStore()

	if (!cart) {
		return <Loading />
	}

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: t('home'),
						href: PATHS.HOME
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
		</>
	)
}

export default Cart
