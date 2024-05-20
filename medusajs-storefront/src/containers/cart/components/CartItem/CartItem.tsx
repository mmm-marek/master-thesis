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
	const { deleteItem } = useStore()

	const handleDelete = () => {
		deleteItem(item.id)
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
							<Button icon={<MinusIcon />} noBackground size='small' />
							<SC.Quantity>{item.quantity}</SC.Quantity>
							<Button icon={<PlusIcon />} noBackground size='small' />
						</SC.QuantityControls>
					</SC.QuantityWrapper>
					<Button icon={<Trash2Icon color={theme.tokens['color-base-content-primary']} />} noBackground onClick={handleDelete} />
				</div>
			</SC.ContentWrapper>
		</SC.Wrapper>
	)
}

export default CartItem
