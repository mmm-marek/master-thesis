import Button from '@/atoms/Button/Button'
import { ButtonProps } from '@/atoms/Button/types'

import * as SC from './PageHeaderStyles'

type PageHeaderProps = {
	title: string
	description?: string
	buttonProps?: {
		action: () => void
		label: string
		icon: React.ReactNode
		type?: ButtonProps['type']
	}
}

const PageHeader = ({ title, description, buttonProps }: PageHeaderProps) => {
	return (
		<SC.Header>
			<SC.TitleWrapper>
				<SC.Title>{title}</SC.Title>
				{description && <SC.Description>{description}</SC.Description>}
			</SC.TitleWrapper>
			{buttonProps && (
				<Button type={buttonProps.type || 'primary'} onClick={buttonProps.action} size='large' icon={buttonProps.icon}>
					{buttonProps.label}
				</Button>
			)}
		</SC.Header>
	)
}

export default PageHeader
