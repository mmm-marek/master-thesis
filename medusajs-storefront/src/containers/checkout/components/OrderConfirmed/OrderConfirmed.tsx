import { BadgeCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

import * as SC from './OrderConfirmedStyles'

const OrderConfirmed = () => {
	const t = useTranslations('containers.checkout')

	return (
		<SC.Container>
			<BadgeCheck size={64} />
			<SC.TextWrapper>
				<SC.Title>{t('orderConfirmedTitle')}</SC.Title>
				<SC.Description>{t('orderConfirmedDescription')}</SC.Description>
			</SC.TextWrapper>
		</SC.Container>
	)
}

export default OrderConfirmed
