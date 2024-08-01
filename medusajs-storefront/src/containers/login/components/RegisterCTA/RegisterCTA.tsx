import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'
import { PATHS } from '@/utils/enums'

import * as SC from './RegisterCTAStyles'

const RegisterCTA = () => {
	const t = useTranslations('containers.login')
	const router = useRouter()

	return (
		<SC.RegisterCTAWrapper>
			<SC.HeaderWrapper>
				<SC.RegisterCTAHeader>{t('registrationTitle')}</SC.RegisterCTAHeader>
				<SC.RegisterCTAParagraph>{t('registrationDescription')}:</SC.RegisterCTAParagraph>
			</SC.HeaderWrapper>
			<SC.RegisterList>
				<SC.RegisterListItem>
					<SC.Bullet />
					<div>{t('accessHistory')}</div>
				</SC.RegisterListItem>
				<SC.RegisterListItem>
					<SC.Bullet />
					<div>{t('obtainDiscount')}</div>
				</SC.RegisterListItem>
				<SC.RegisterListItem>
					<SC.Bullet />
					<div>{t('quickProcess')}</div>
				</SC.RegisterListItem>
			</SC.RegisterList>
			<Button type='primary' size='middle' onClick={() => router.push(PATHS.SIGN_UP)} block shape='round'>
				{t('register')}
			</Button>
		</SC.RegisterCTAWrapper>
	)
}

export default RegisterCTA
