import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'

import Button from '@/atoms/Button/Button'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './StripeFormStyles'

const StripeForm = () => {
	const router = useRouter()
	const stripe = useStripe()
	const elements = useElements()
	const { cart, completePayment } = useStore()

	const handlePayment = async () => {
		const cartId = cart?.id
		const clientSecret: string = cart?.payment_session?.data.client_secret as string

		if (!elements) return null

		const cardElement = elements.getElement(CardElement)

		if (!clientSecret || !cartId || !clientSecret || !elements || !cardElement || !stripe) return null

		return stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement,
					billing_details: {
						email: cart.email,
						phone: cart.billing_address.phone,
						address: {
							city: cart.billing_address.city,
							country: cart.billing_address.country_code,
							line1: cart.billing_address.address_1,
							line2: cart.billing_address.address_2,
							postal_code: cart.billing_address.postal_code
						}
					}
				}
			})
			.then(() => {
				completePayment({
					onSuccess: () => {
						router.push(PATHS.ORDER_CONFIRMED)
					}
				})
			})
	}

	return (
		<SC.Form>
			<SC.CardElementWrapper>
				<CardElement
					options={{
						hidePostalCode: true
					}}
				/>
			</SC.CardElementWrapper>
			<SC.ButtonWrapper>
				<Button variant='primary' onPress={handlePayment} type='submit'>
					Submit
				</Button>
			</SC.ButtonWrapper>
		</SC.Form>
	)
}

export default StripeForm
