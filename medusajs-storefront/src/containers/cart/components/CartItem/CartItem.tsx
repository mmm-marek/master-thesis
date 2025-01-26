import { LineItem } from '@medusajs/medusa'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { RegionInfo, formatAmount } from 'medusa-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'styled-components'

import Button from '@/atoms/Button/Button'
import { useStore } from '@/providers/StoreProvider'
import { localizeProduct } from '@/utils/localization'

import * as SC from './CartItemStyles'

type CartItemProps = {
	region: RegionInfo
	item: LineItem
}

const CartItem = ({ item, region }: CartItemProps) => {
	const theme = useTheme()
	const { cart } = useStore()
	const t = useTranslations('containers.cart')
	const { deleteItem, updateItem, isUpdatingCart } = useStore()

	const handleDelete = () => {
		deleteItem(item.id)
	}

	const handleAddQuantity = () => {
		updateItem({ lineId: item.id, quantity: item.quantity + 1 })
	}

	const handleRemoveQuantity = () => {
		if (item.quantity === 1) {
			deleteItem(item.id)
			return
		}

		updateItem({ lineId: item.id, quantity: item.quantity - 1 })
	}

	const localizedProduct = localizeProduct({ product: item.variant.product, regionID: cart?.region_id })

	return (
		<SC.Wrapper>
			{item.thumbnail && <SC.Thumbnail src={item.thumbnail} alt={item.title ?? t('product')} objectFit='contain' width={164} height={164} />}
			<SC.ContentWrapper>
				<SC.Header>
					<SC.Title>{localizedProduct.localizedTitle}</SC.Title>
					<SC.Price>{formatAmount({ amount: item.subtotal ?? 0, region })}</SC.Price>
				</SC.Header>
				<SC.Variant>{item.variant.title}</SC.Variant>
				<div>
					<SC.QuantityWrapper>
						<SC.QuantityLabel>{t('quantity')}:</SC.QuantityLabel>
						<SC.QuantityControls>
							<Button size='small' isDisabled={isUpdatingCart} onPress={handleRemoveQuantity}>
								<MinusIcon />
							</Button>
							<SC.Quantity>{item.quantity}</SC.Quantity>
							<Button size='small' isDisabled={isUpdatingCart} onPress={handleAddQuantity}>
								<PlusIcon />
							</Button>
						</SC.QuantityControls>
					</SC.QuantityWrapper>
					<Button onPress={handleDelete} isDisabled={isUpdatingCart}>
						<Trash2Icon color={theme.tokens['color-base-content-primary']} />
					</Button>
				</div>
			</SC.ContentWrapper>
		</SC.Wrapper>
	)
}

export default CartItem
