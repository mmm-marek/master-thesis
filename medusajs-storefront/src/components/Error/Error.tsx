import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import Button from '@/atoms/Button/Button'

import * as SC from './ErrorStyles'

type ErrorProps = {
	title?: string
	description?: string
	height?: string
	onTryAgain?: (args?: any) => void
}

const Error = ({ title, description, height = '500px', onTryAgain }: ErrorProps) => {
	const queryClient = useQueryClient()
	const t = useTranslations('components.error')

	const handleRefetchAllQueries = () => {
		if (onTryAgain) {
			onTryAgain()
		} else {
			queryClient.invalidateQueries({ predicate: (query) => query.state.status === 'error' })
		}
	}

	return (
		<SC.ErrorContainer $height={height}>
			<SC.ErrorHeading>{title ?? t('somethingWentWrong')}</SC.ErrorHeading>
			<SC.ErrorText>{description ?? t('tryLater')}</SC.ErrorText>
			<Button type='primary' onClick={handleRefetchAllQueries}>
				{t('tryAgain')}
			</Button>
		</SC.ErrorContainer>
	)
}

export default Error
