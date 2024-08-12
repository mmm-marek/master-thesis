import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import StripeForm from '../StripeForm/StripeForm'
import { useStore } from '@/providers/StoreProvider'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? '')

const StripeContainer = () => {
	const { cart } = useStore()

	const clientSecret: string = cart?.payment_session?.data.client_secret as string

	return (
		<div>
			{clientSecret && (
				<Elements
					stripe={stripePromise}
					options={{
						clientSecret,
						// @ts-expect-error locale is not in the types
						locale: cart?.region.name.toLowerCase() ?? 'en'
					}}
				>
					<StripeForm />
				</Elements>
			)}
		</div>
	)
}

export default StripeContainer
