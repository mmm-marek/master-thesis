import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'

import * as SC from './ErrorStyles'

interface ErrorProps {
	statusCode: number
	title: string
	message: string
}

const Error = ({ statusCode, title, message }: ErrorProps) => {
	const t = useTranslations('containers.error')
	const router = useRouter()

	const handleRedirect = () => {
		router.push('/')
	}

	return (
		<SC.Container>
			<SC.StatusCode>{statusCode}</SC.StatusCode>
			<SC.TextContainer>
				<SC.Title>{title}</SC.Title>
				<SC.Message>{message}</SC.Message>
			</SC.TextContainer>
			<Button onClick={handleRedirect} size='large' type='primary'>
				{t('backButton')}
			</Button>
		</SC.Container>
	)
}

export default Error
