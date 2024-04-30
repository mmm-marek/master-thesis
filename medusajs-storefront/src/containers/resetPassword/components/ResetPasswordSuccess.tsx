import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import IconCheckCircle from '@/assets/icons/check-circle.svg'
import IconCornerUpLeft from '@/assets/icons/corner-up-left.svg'
import Button from '@/atoms/Button/Button'
import { PATHS } from '@/utils/enums'

import * as SC from './ResetPasswordSuccessStyles'

const ResetPasswordSuccess = () => {
	const router = useRouter()
	const t = useTranslations('containers.resetPassword.resetPasswordSuccess')

	return (
		<SC.Wrapper>
			<SC.Header>
				<SC.Circle>
					<IconCheckCircle />
				</SC.Circle>
				<SC.Title>{t('passwordReset')}</SC.Title>
				<SC.InfoMd>{t('passwordResetSuccess')}</SC.InfoMd>
			</SC.Header>
			<Button type='primary' size='large' htmlType='submit' block onClick={() => router.push('/')}>
				{t('continue')}
			</Button>
			<SC.BackBtnWrapper>
				<Button
					type='link'
					onClick={() => {
						router.push(PATHS.LOGIN)
					}}
					size='small'
					icon={<IconCornerUpLeft />}
					noBackground
				>
					<span>{t('backButton')}</span>
				</Button>
			</SC.BackBtnWrapper>
		</SC.Wrapper>
	)
}

export default ResetPasswordSuccess
