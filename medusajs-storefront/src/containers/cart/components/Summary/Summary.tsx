import { formatAmount } from 'medusa-react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import DiscountCodeForm from '../DiscountCodeForm/DiscountCodeForm'
import Button from '@/atoms/Button/Button'
import Loading from '@/components/Loading/Loading'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './SummaryStyles'

const Summary = () => {
	const router = useRouter()
	const { cart } = useStore()
	const t = useTranslations('containers.cart')

	if (!cart || !cart?.region) {
		return <Loading />
	}

	return (
		<SC.Wrapper>
			<SC.Heading>{t('summary')}</SC.Heading>
			<DiscountCodeForm />
			<SC.SummaryItem>
				<span>{t('subtotal')}</span>
				<span>
					{formatAmount({
						amount: cart?.subtotal ?? 0,
						region: cart?.region
					})}
				</span>
			</SC.SummaryItem>
			{!!cart.discount_total && (
				<SC.SummaryItem>
					<span>{t('discount')}</span>
					<span>
						{formatAmount({
							amount: cart?.discount_total ?? 0,
							region: cart?.region
						})}
					</span>
				</SC.SummaryItem>
			)}
			<SC.Total>
				<span>{t('total')}</span>
				<span>
					{formatAmount({
						amount: cart?.total ?? 0,
						region: cart?.region
					})}
				</span>
			</SC.Total>
			<Button size='large' variant='primary' onPress={() => router.push(PATHS.CHECKOUT)}>
				{t('checkout')}
			</Button>
		</SC.Wrapper>
	)
}

export default Summary
