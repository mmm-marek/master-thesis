import { LineItem } from '@medusajs/medusa'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'

import Button from '@/atoms/Button/Button'

import * as SC from './CartItemStyles'

type CartItemProps = {
	item: LineItem
}

const CartItem = ({ item }: CartItemProps) => {
	return (
		<SC.Wrapper>
			{item.thumbnail && (
				<SC.ImageWrapper>
					<Image src={item.thumbnail} alt={item.title ?? 'Product'} fill unoptimized objectFit='cover' />
				</SC.ImageWrapper>
			)}
			<div>
				<SC.Header>
					<SC.Title>{item.title}</SC.Title>
					<SC.Title>{item.unit_price}</SC.Title>
				</SC.Header>
				<div>{item.variant.title}</div>
				<div>
					<div>
						<div>Quantity:</div>
						<div>{item.quantity}</div>
					</div>
					<Button icon={<Trash2Icon color='white' />} noBackground />
				</div>
			</div>
		</SC.Wrapper>
	)
}

export default CartItem
