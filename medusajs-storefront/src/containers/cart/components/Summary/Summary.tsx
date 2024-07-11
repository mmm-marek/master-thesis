import { formatAmount } from 'medusa-react'
import { useRouter } from 'next/router'

import DiscountCodeForm from '../DiscountCodeForm/DiscountCodeForm'
import Button from '@/atoms/Button/Button'
import Loading from '@/components/Loading/Loading'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './SummaryStyles'

const Summary = () => {
	const router = useRouter()
	const { cart } = useStore()

	// TODO: Check why cart.region is undefined at the beginning
	if (!cart || !cart?.region) {
		return <Loading />
	}

	return (
		<SC.Wrapper>
			<SC.Heading>Summary</SC.Heading>
			<div>
				<DiscountCodeForm />
			</div>
			<SC.SummaryItem>
				<span>Subtotal</span>
				<span>
					{formatAmount({
						amount: cart?.subtotal ?? 0,
						region: cart?.region
					})}
				</span>
			</SC.SummaryItem>
			{!!cart.discount_total && (
				<SC.SummaryItem>
					<span>Discount</span>
					<span>
						{formatAmount({
							amount: cart?.discount_total ?? 0,
							region: cart?.region
						})}
					</span>
				</SC.SummaryItem>
			)}
			<SC.Total>
				<span>Total</span>
				<span>
					{formatAmount({
						amount: cart?.total ?? 0,
						region: cart?.region
					})}
				</span>
			</SC.Total>
			<Button block size='large' type='primary' onClick={() => router.push(PATHS.CHECKOUT)}>
				Checkout
			</Button>
		</SC.Wrapper>
	)
}

export default Summary
