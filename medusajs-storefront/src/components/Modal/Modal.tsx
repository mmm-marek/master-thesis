import { Spin } from 'antd'
import { useTranslations } from 'next-intl'

import CloseIcon from '@/assets/icons/close.svg'
import Button from '@/atoms/Button/Button'

import * as SC from './ModalStyles'
import { ModalProps } from './types'

const Modal = ({
	onCancel,
	onOk,
	okText,
	cancelText,
	okDisabled,
	cancelDisabled,
	okButtonProps,
	cancelButtonProps,
	open,
	danger,
	children,
	description,
	title,
	footer,
	loading,
	...restProps
}: ModalProps) => {
	const t = useTranslations('components.modal')

	const hasFooter = footer !== null
	const hasHeader = !!(title || description)

	const closeButton = <SC.CloseButton noBackground size='small' icon={<CloseIcon />} onClick={onCancel} $absolute={!hasHeader} />

	return (
		<SC.Modal footer={null} centered onCancel={onCancel} open={open} width={danger ? 400 : 600} {...restProps} closeIcon={false}>
			<Spin spinning={!!loading}>
				{hasHeader ? (
					<SC.HeaderContainer>
						<SC.TitleWrapper>
							<SC.ModalTitle>{title}</SC.ModalTitle>
							{description && <SC.ModalDescription>{description}</SC.ModalDescription>}
						</SC.TitleWrapper>
						{closeButton}
					</SC.HeaderContainer>
				) : (
					closeButton
				)}
				<SC.ContentContainer $hasHeader={hasHeader} $hasFooter={hasFooter}>
					{children}
				</SC.ContentContainer>
				{hasFooter && (
					<SC.FooterContainer>
						<Button size='large' onClick={onCancel} block shape='round' disabled={cancelDisabled || loading} {...(cancelButtonProps || {})}>
							{cancelText || t('cancel')}
						</Button>
						<Button
							size='large'
							onClick={onOk}
							type='primary'
							danger={danger}
							block
							shape='round'
							disabled={okDisabled || loading}
							{...(okButtonProps || {})}
						>
							{okText || (danger ? t('delete') : t('save'))}
						</Button>
					</SC.FooterContainer>
				)}
			</Spin>
		</SC.Modal>
	)
}

export default Modal
