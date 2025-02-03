import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'
import { PATHS } from '@/utils/enums'

import * as SC from './ErrorStyles'

type ErrorProps = {
	statusCode: number
	title: string
	message: string
}

const Error = ({ statusCode, title, message }: ErrorProps) => {
	const t = useTranslations('containers.error')
	const router = useRouter()

	const handleRedirect = () => {
		router.push(PATHS.HOME)
	}

	return (
		<SC.Container>
			<SC.StatusCode>{statusCode}</SC.StatusCode>
			<SC.TextContainer>
				<SC.Title>{title}</SC.Title>
				<SC.Message>{message}</SC.Message>
			</SC.TextContainer>
			<Button onPress={handleRedirect} size='large' variant='primary'>
				{t('backButton')}
			</Button>
		</SC.Container>
	)
}

export default Error
