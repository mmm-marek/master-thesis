import { LineItem } from '@medusajs/medusa'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { RegionInfo, formatAmount } from 'medusa-react'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'
import useGetLocalizedProduct from '@/hooks/products/useGetLocalizedProduct'
import { useStore } from '@/providers/StoreProvider'

import CartItemSkeleton from './CartItemSkeleton'
import * as SC from './CartItemStyles'

type CartItemProps = {
	region: RegionInfo
	item: LineItem
}

const CartItem = ({ item, region }: CartItemProps) => {
	const t = useTranslations('containers.cart')
	const { deleteItem, updateItem, isUpdatingCart } = useStore()

	const { data: localizedProduct, isLoading: isLoadingLocalizedProduct } = useGetLocalizedProduct(item.variant.product.handle!)

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

	if (isLoadingLocalizedProduct) {
		return <CartItemSkeleton />
	}

	const productInfo = localizedProduct ?? item
	const variantInfo = localizedProduct?.variants?.find((v) => v.id === item.variant.id)

	return (
		<SC.Wrapper>
			{item.thumbnail && <SC.Thumbnail src={item.thumbnail} alt={productInfo?.title ?? t('product')} objectFit='contain' width={164} height={164} />}
			<SC.ContentWrapper>
				<SC.Header>
					<SC.Title>{productInfo.title}</SC.Title>
					<SC.Price>{formatAmount({ amount: item.subtotal ?? 0, region })}</SC.Price>
				</SC.Header>
				<SC.Variant>{variantInfo?.title}</SC.Variant>
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
					<Button onPress={handleDelete} isDisabled={isUpdatingCart} size='small' variant='secondary'>
						<Trash2Icon />
					</Button>
				</div>
			</SC.ContentWrapper>
		</SC.Wrapper>
	)
}

export default CartItem
