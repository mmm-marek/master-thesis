import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'
import { PATHS } from '@/utils/enums'

import * as SC from './HeroBannerStyles'

const HeroBanner = () => {
	const router = useRouter()
	const t = useTranslations('containers.landing')

	return (
		<SC.Container>
			<SC.TextWrapper>
				<SC.Title>{t('title')}</SC.Title>
				<SC.Description>{t('description')}</SC.Description>
				<Button size='large' variant='primary' onPress={() => router.push(PATHS.PRODUCTS)}>
					{t('cta')}
				</Button>
			</SC.TextWrapper>
			<SC.ImageStyled src='/images/landing-illustration.png' alt='landing' width={1180} height={904} />
		</SC.Container>
	)
}

export default HeroBanner
