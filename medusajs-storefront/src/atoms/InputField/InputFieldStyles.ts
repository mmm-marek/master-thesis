import { Input as AntdInput, Form } from 'antd'
import styled, { css } from 'styled-components'

import { textMdRegular, textSmMedium, textSmRegular } from '@/styles/helpers'

import { InputSize } from './types'

export const FormItem = styled(Form.Item)<{ $size: InputSize; $hideHelp?: boolean }>`
	/* stylelint-disable */
	margin-bottom: 0;

	${(p) =>
		!p.$hideHelp &&
		css`
			padding-bottom: ${p.theme.spacing[16]};
		`}

	.ant-form-item-control {
		flex: auto;
	}

	.ant-form-item-row {
		flex-direction: column;

		.ant-form-item-label {
			margin-bottom: ${(p) => p.theme.spacing[4]};
			text-align: left;
			padding: 0;

			label {
				${textSmMedium};
				color: ${(p) => p.theme.tokens['color-base-content-primary']};
				height: 20px;
				display: inline-flex;
				flex-direction: row-reverse;

				&.ant-form-item-required {
					&::before {
						color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
					}
				}

				&::after {
					display: none;
				}
			}
		}

		.ant-form-item-control-input {
			min-height: auto;
		}

		.ant-form-item-explain {
			.ant-form-item-explain-error {
				${textSmRegular};
				color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
				text-align: left;
			}
		}
	}

	// error state
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
	/* common styles (affix + no affix) */
	padding: ${(p) => `${p.theme.spacing[2]} ${p.theme.spacing[8]}`};
	height: 28px;
	border-radius: ${(p) => p.theme.borderRadius[4]};
	${textSmRegular};

	// affix specific styles
	&.ant-input-affix-wrapper {
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
	/* common styles (affix + no affix) */
	padding: ${(p) => `${p.theme.spacing[6]} ${p.theme.spacing[12]}`};
	height: 36px;
	border-radius: ${(p) => p.theme.borderRadius[6]};
	${textSmRegular};

	// affix specific styles
	&.ant-input-affix-wrapper {
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
	${textMdRegular};
	padding: ${(p) => `${p.theme.spacing[12]} ${p.theme.spacing[16]}`};
	height: 48px;
	border-radius: ${(p) => p.theme.borderRadius[8]};

	&.ant-input-affix-wrapper {
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
	${textMdRegular};
	padding: ${(p) => p.theme.spacing[16]};
	height: 56px;
	border-radius: ${(p) => p.theme.borderRadius[8]};

	&.ant-input-affix-wrapper {
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

const baseStyles = css`
	color: ${(p) => p.theme.tokens['color-base-content-primary']};
	background: ${(p) => p.theme.tokens['color-base-surface-tertiary']};
	transition: 0.3s;
	border: ${(p) => `${p.theme.borderWidth.xs} solid ${p.theme.tokens['color-base-surface-tertiary']}`};
`

const hoverStyles = css`
	background: ${(p) => p.theme.tokens['color-base-surface-quaternary']};
	border-color: ${(p) => p.theme.tokens['color-base-surface-quaternary']};
`

const focusStyles = css`
	border-color: ${(p) => p.theme.tokens['color-base-action-primary-active']};
	background-color: ${(p) => p.theme.tokens['color-base-surface-primary']};
`

const errorFocusStyles = css`
	background-color: ${(p) => p.theme.tokens['color-base-surface-primary']};
	box-shadow: ${(p) => p.theme.tokens['ring-destructive-xs']} !important;
`

const placeholderStyles = css`
	color: ${(p) => p.theme.tokens['color-base-content-quaternary']};
`

const disabledStyles = css`
	color: ${(p) => p.theme.tokens['color-base-content-quaternary']};
	background-color: ${(p) => p.theme.tokens['color-base-surface-tertiary']};

	&:not(.ant-input-status-error):not(.ant-input-affix-wrapper-status-error) {
		border-color: ${(p) => p.theme.tokens['color-base-surface-tertiary']} !important;
	}
`

const placeholderDisabledStyles = css`
	color: ${(p) => p.theme.tokens['color-base-content-quintarny']};
`

export const Input = styled(AntdInput)`
	// no affix specific styles
	&:not(.ant-input-affix-wrapper) {
		${baseStyles}

		&:-webkit-autofill {
			box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-tertiary']} inset !important;
			-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
			background-clip: content-box !important;
			transition: 300ms ease;
		}

		&::placeholder {
			${placeholderStyles}
		}

		&:not(.ant-input-status-error):not(:disabled) {
			&:hover {
				${hoverStyles}

				&:-webkit-autofill {
					box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-quaternary']} inset !important;
					-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
					background-clip: content-box !important;
					transition: 300ms ease;
				}
			}

			&:focus {
				${focusStyles};
				box-shadow: ${(p) => p.theme.tokens['ring-primary-xs']};

				&:-webkit-autofill {
					box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-primary']} inset ${(p) => p.theme.tokens['ring-primary-xs']} !important;
					-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
					background-clip: content-box !important;
					transition: 300ms ease;
				}
			}
		}

		// disabled state
		&:disabled {
			${disabledStyles}

			&:-webkit-autofill {
				box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-tertiary']} inset !important;
				background-clip: content-box !important;
				color: ${(p) => p.theme.tokens['color-base-content-quaternary']} !important;
				transition: 300ms ease;
			}

			&::placeholder {
				${placeholderDisabledStyles};
			}
		}

		// error state
		&.ant-input-status-error {
			border-color: ${(p) => p.theme.tokens['color-base-state-error-fg']} !important;

			&:not(:disabled) {
				&:hover {
					background: ${(p) => p.theme.tokens['color-base-surface-quaternary']};
				}

				&:focus {
					${errorFocusStyles}

					&:-webkit-autofill {
						box-shadow:
							0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-primary']} inset,
							${(p) => p.theme.tokens['ring-destructive-xs']} !important;
						-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
						background-clip: content-box !important;
						transition: 300ms ease;
					}
				}
			}
		}
	}

	// affix specific styles
	&.ant-input-affix-wrapper {
		${baseStyles}

		.ant-input {
			background: transparent;
			color: ${(p) => p.theme.tokens['color-base-content-primary']};

			&::placeholder {
				${placeholderStyles}
			}

			&:-webkit-autofill {
				box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-tertiary']} inset !important;
				-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
				background-clip: content-box !important;
				transition: 300ms ease;
			}
		}

		.ant-input-prefix,
		.ant-input-suffix {
			svg {
				color: ${(p) => p.theme.tokens['color-base-content-tertiary']};
			}
		}

		&:not(.ant-input-affix-wrapper-focused):not(.ant-input-affix-wrapper-disabled) {
			&:hover {
				${hoverStyles}

				.ant-input {
					&:-webkit-autofill {
						box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-quaternary']} inset !important;
						-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
						background-clip: content-box !important;
						transition: 300ms ease;
					}
				}
			}
		}

		&.ant-input-affix-wrapper-focused:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-status-error) {
			${focusStyles};
			box-shadow: ${(p) => p.theme.tokens['ring-primary-xs']};

			.ant-input {
				&:-webkit-autofill {
					box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-primary']} inset !important;
					-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
					background-clip: content-box !important;
					transition: 300ms ease;
				}
			}
		}

		// disabled state
		&.ant-input-affix-wrapper-disabled {
			${disabledStyles}

			.ant-input {
				color: ${(p) => p.theme.tokens['color-base-content-quaternary']};

				&:-webkit-autofill {
					box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-tertiary']} inset !important;
					background-clip: content-box !important;
					color: ${(p) => p.theme.tokens['color-base-content-quaternary']} !important;
					transition: 300ms ease;
				}

				&::placeholder {
					${placeholderDisabledStyles};
				}
			}

			.ant-input-prefix,
			.ant-input-suffix {
				svg {
					color: ${(p) => p.theme.tokens['color-base-content-quintarny']};
				}
			}
		}

		// error state
		&.ant-input-affix-wrapper-status-error {
			border-color: ${(p) => p.theme.tokens['color-base-state-error-fg']} !important;

			.ant-input-prefix,
			.ant-input-suffix {
				svg {
					color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
				}
			}

			&.ant-input-affix-wrapper-focused {
				${errorFocusStyles}

				.ant-input {
					&:-webkit-autofill {
						box-shadow: 0 0 0 1000px ${(p) => p.theme.tokens['color-base-surface-primary']} inset !important;
						-webkit-text-fill-color: ${(p) => p.theme.tokens['color-base-content-primary']} !important;
						background-clip: content-box !important;
						transition: 300ms ease;
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
