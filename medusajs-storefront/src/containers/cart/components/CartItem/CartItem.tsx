import { LineItem } from '@medusajs/medusa'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { RegionInfo, formatAmount } from 'medusa-react'
import Image from 'next/image'
import { useTheme } from 'styled-components'

import Button from '@/atoms/Button/Button'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './CartItemStyles'

type CartItemProps = {
	region: RegionInfo
	item: LineItem
}

const CartItem = ({ item, region }: CartItemProps) => {
	const theme = useTheme()
	const { deleteItem, updateItem } = useStore()

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

	return (
		<SC.Wrapper>
			{item.thumbnail && (
				<SC.ImageWrapper>
					<Image src={item.thumbnail} alt={item.title ?? 'Product'} fill unoptimized objectFit='cover' />
				</SC.ImageWrapper>
			)}
			<SC.ContentWrapper>
				<SC.Header>
					<SC.Title>{item.title}</SC.Title>
					<SC.Title>{formatAmount({ amount: item.subtotal ?? 0, region })}</SC.Title>
				</SC.Header>
				<SC.Variant>{item.variant.title}</SC.Variant>
				<div>
					<SC.QuantityWrapper>
						<SC.QuantityLabel>Quantity:</SC.QuantityLabel>
						<SC.QuantityControls>
							<Button icon={<MinusIcon />} noBackground size='small' onClick={handleRemoveQuantity} />
							<SC.Quantity>{item.quantity}</SC.Quantity>
							<Button icon={<PlusIcon />} noBackground size='small' onClick={handleAddQuantity} />
						</SC.QuantityControls>
					</SC.QuantityWrapper>
					<Button icon={<Trash2Icon color={theme.tokens['color-base-content-primary']} />} noBackground onClick={handleDelete} />
				</div>
			</SC.ContentWrapper>
		</SC.Wrapper>
	)
}

export default CartItem
