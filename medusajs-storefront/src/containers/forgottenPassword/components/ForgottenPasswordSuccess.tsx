import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import IconCornerUpLeft from '@/assets/icons/corner-up-left.svg'
import IconEmail from '@/assets/icons/email.svg'
import Button from '@/atoms/Button/Button'
import { PATHS } from '@/utils/enums'

import * as SC from './ForgottenPasswordSuccessStyles'

type Props = {
	isLoading?: boolean
	onSubmit: () => void
	email?: string
}

const ForgottenPasswordSuccess = (props: Props) => {
	const { isLoading, onSubmit, email } = props
	const router = useRouter()
	const t = useTranslations('containers.forgottenPassword.forgottenPasswordSuccess')

	return (
		<SC.Wrapper>
			<SC.Header>
				<SC.Circle>
					<IconEmail />
				</SC.Circle>
				<SC.Title>{t('checkYourEmail')}</SC.Title>
				{email && (
					<SC.Info>
						{t.rich('passwordResetLinkSent', {
							styledEmail: (chunk) => <SC.Strong>{chunk}</SC.Strong>,
							email
						})}
					</SC.Info>
				)}
			</SC.Header>
			<Button type='primary' size='large' htmlType='submit' disabled={isLoading} loading={isLoading} block href={`mailto:${email}`}>
				{t('openEmailApp')}
			</Button>
			<SC.InfoLink>
				<SC.Info>{t('didntReceiveEmail')}?</SC.Info>
				<Button type='text' onClick={onSubmit} size='small' disabled={isLoading} loading={isLoading}>
					<span>{t('clickToResend')}</span>
				</Button>
			</SC.InfoLink>
			<SC.BackBtnWrapper>
				<Button
					type='link'
					onClick={() => {
						router.push(PATHS.LOGIN)
					}}
					size='small'
					icon={<IconCornerUpLeft />}
					noBackground
					disabled={isLoading}
					loading={isLoading}
				>
					<span>{t('backButton')}</span>
				</Button>
			</SC.BackBtnWrapper>
		</SC.Wrapper>
	)
}

export default ForgottenPasswordSuccess
