import { Input as AntdInput, Form } from 'antd'
import styled, { css } from 'styled-components'

import { textMdRegular, textSmMedium, textSmRegular } from '@/styles/helpers'

import { InputSize } from './types'

export const FormItem = styled(Form.Item)<{ $size: InputSize }>`
	margin-bottom: 0;
	padding-bottom: 16px;

	.ant-form-item-control {
		flex: auto;
	}

	.ant-form-item-row {
		flex-direction: column;

		.ant-form-item-label {
			margin-bottom: ${(p) => p.theme.spacing[4]};
			padding: 0;
			text-align: left;

			label {
				display: inline-flex;
				flex-direction: row-reverse;
				height: 20px;
				${textSmMedium};
				color: ${(p) => p.theme.tokens['color-base-content-primary']};

				&::after {
					display: none;
				}

				&.ant-form-item-required {
					&::before {
						color: ${(p) => p.theme.tokens['color-base-state-error-fg']} !important;
					}
				}
			}
		}

		.ant-form-item-control-input {
			min-height: auto;
		}

		.ant-form-item-explain {
			.ant-form-item-explain-error {
				${textSmRegular};
				text-align: left;
				color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
			}
		}
	}

	/* error state */
	&.ant-form-item-has-error {
		.ant-form-item-row {
			.ant-form-item-label {
				label {
					color: ${(p) => p.theme.tokens['color-base-state-error-fg']};

					&.ant-form-item-required {
						&::before {
							color: ${(p) => p.theme.tokens['color-base-state-error-fg']} !important;
						}
					}
				}
			}

			.ant-form-item-control-input {
				margin-bottom: ${(p) => p.theme.spacing[4]};
			}
		}
	}

	/* size specific styles */
	${(p) =>
		p.$size === 'small' &&
		css`
			.ant-form-item-row {
				.ant-form-item-label {
					margin-bottom: 0;
				}
			}

			&.ant-form-item-has-error {
				.ant-form-item-row {
					.ant-form-item-control-input {
						margin-bottom: 0;
					}
				}
			}
		`}
`

const inputSizeSmall = css`
	&.ant-input-affix-wrapper {
		border-radius: ${(p) => p.theme.borderRadius[4]};
		padding: ${(p) => `${p.theme.spacing[2]} ${p.theme.spacing[8]}`};
		height: 28px;

		.ant-input {
			${textSmRegular};
		}

		.ant-input-prefix,
		.ant-input-suffix {
			svg {
				width: 16px;
				height: 16px;
			}
		}

		.ant-input-prefix {
			margin-inline-end: ${(p) => p.theme.spacing[4]};
		}

		.ant-input-suffix {
			margin-inline-start: ${(p) => p.theme.spacing[4]};
		}
	}
`

const inputSizeMiddle = css`
	&.ant-input-affix-wrapper {
		border-radius: ${(p) => p.theme.borderRadius[6]};
		padding: ${(p) => `${p.theme.spacing[6]} ${p.theme.spacing[12]}`};
		height: 36px;

		.ant-input {
			${textSmRegular};
		}

		.ant-input-prefix,
		.ant-input-suffix {
			svg {
				width: 16px;
				height: 16px;
			}
		}

		.ant-input-prefix {
			margin-inline-end: ${(p) => p.theme.spacing[8]};
		}

		.ant-input-suffix {
			margin-inline-start: ${(p) => p.theme.spacing[8]};
		}
	}
`

const inputSizeLarge = css`
	&.ant-input-affix-wrapper {
		border-radius: ${(p) => p.theme.borderRadius[8]};
		padding: ${(p) => `${p.theme.spacing[12]} ${p.theme.spacing[16]}`};
		height: 48px;

		input {
			${textMdRegular};
		}

		.ant-input-prefix,
		.ant-input-suffix {
			svg {
				width: 20px;
				height: 20px;
			}
		}

		.ant-input-prefix {
			margin-inline-end: ${(p) => p.theme.spacing[8]};
		}

		.ant-input-suffix {
			margin-inline-start: ${(p) => p.theme.spacing[8]};
		}
	}
`

const inputSizeExtraLarge = css`
	&.ant-input-affix-wrapper {
		border-radius: ${(p) => p.theme.borderRadius[8]};
		padding: ${(p) => p.theme.spacing[16]};
		height: 56px;

		input {
			${textMdRegular};
		}

		.ant-input-prefix,
		.ant-input-suffix {
			svg {
				width: 20px;
				height: 20px;
			}
		}

		.ant-input-prefix {
			margin-inline-end: ${(p) => p.theme.spacing[8]};
		}

		.ant-input-suffix {
			margin-inline-start: ${(p) => p.theme.spacing[8]};
		}
	}
`

export const Input = styled(AntdInput.Password)`
	/* stylelint-disable-next-line */
	&.ant-input-affix-wrapper {
		transition: 0.3s;
		border: ${(p) => `${p.theme.borderWidth.xs} solid ${p.theme.tokens['color-base-surface-tertiary']}`};
		border-radius: ${(p) => p.theme.borderRadius[24]};
		background: ${(p) => p.theme.tokens['color-base-surface-tertiary']};

		&:not(.ant-input-affix-wrapper-focused, .ant-input-affix-wrapper-disabled) {
			&:hover {
				border-color: ${(p) => p.theme.tokens['color-base-surface-quaternary']};
				background: ${(p) => p.theme.tokens['color-base-surface-quaternary']};

				.ant-input {
					&:-webkit-autofill {
						transition: 300ms ease;
						box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-quaternary']} inset !important;
						background-clip: content-box !important;
						-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
					}
				}
			}
		}

		/* stylelint-disable-next-line */
		.ant-input {
			background: transparent;
			color: ${(p) => p.theme.tokens['color-base-content-primary']};

			&::placeholder {
				color: ${(p) => p.theme.tokens['color-base-content-quaternary']};
			}

			/* stylelint-disable-next-line */
			&:-webkit-autofill {
				transition: 300ms ease;
				box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-tertiary']} inset !important;
				background-clip: content-box !important;
				-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
			}
		}

		.ant-input-prefix,
		.ant-input-suffix {
			svg {
				color: ${(p) => p.theme.tokens['color-base-content-tertiary']};
			}
		}

		&.ant-input-affix-wrapper-focused:not(.ant-input-affix-wrapper-disabled, .ant-input-affix-wrapper-status-error) {
			border-color: ${(p) => p.theme.tokens['color-base-action-primary-active']};
			box-shadow: ${(p) => p.theme.tokens['ring-primary-xs']};
			background-color: ${(p) => p.theme.tokens['color-base-surface-primary']};

			/* stylelint-disable-next-line */
			.ant-input {
				&:-webkit-autofill {
					transition: 300ms ease;
					box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-primary']} inset !important;
					background-clip: content-box !important;
					-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
				}
			}
		}

		/* disabled state */
		&.ant-input-affix-wrapper-disabled {
			background-color: ${(p) => p.theme.tokens['color-base-surface-tertiary']};

			&:not(.ant-input-affix-wrapper-status-error) {
				border-color: ${(p) => p.theme.tokens['color-base-surface-tertiary']} !important;
			}

			/* stylelint-disable-next-line */
			.ant-input {
				color: ${(p) => p.theme.tokens['color-base-content-quaternary']};

				&::placeholder {
					color: ${(p) => p.theme.tokens['color-base-content-quintarny']};
				}

				/* stylelint-disable-next-line */
				&:-webkit-autofill {
					transition: 300ms ease;
					box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-tertiary']} inset !important;
					background-clip: content-box !important;
					color: ${(p) => p.theme.tokens['color-base-content-quaternary']} !important;
				}
			}

			.ant-input-prefix,
			.ant-input-suffix {
				svg {
					color: ${(p) => p.theme.tokens['color-base-content-quintarny']};
				}
			}
		}

		/* error state */
		&.ant-input-affix-wrapper-status-error {
			border-color: ${(p) => p.theme.tokens['color-base-state-error-fg']} !important;

			.ant-input-prefix,
			.ant-input-suffix {
				svg {
					color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
				}
			}

			&.ant-input-affix-wrapper-focused {
				box-shadow: ${(p) => p.theme.tokens['ring-destructive-xs']} !important;
				background-color: ${(p) => p.theme.tokens['color-base-surface-primary']};

				/* stylelint-disable-next-line */
				.ant-input {
					&:-webkit-autofill {
						transition: 300ms ease;
						box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-primary']} inset !important;
						background-clip: content-box !important;
						-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
					}
				}
			}
		}
	}

	/* size specific styles */
	${(p) => {
		switch (p.size as InputSize) {
			case 'small':
				return inputSizeSmall
			case 'middle':
				return inputSizeMiddle
			case 'large':
				return inputSizeLarge
			case 'extra-large':
				return inputSizeExtraLarge
			default:
				return inputSizeMiddle
		}
	}}
`
