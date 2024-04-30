import { Form as AntdForm, Select as AntdSelect, SelectProps } from 'antd'
import styled, { css } from 'styled-components'

import * as OptionRenderStyles from '../OptionRender/OptionRenderStyles'
import Chevron from '@/assets/icons/chevron.svg'
import InfoCircle from '@/assets/icons/info-circle.svg'
import { selectDropdownStyles } from '@/styles/GlobalStyles'
import { textMdRegular, textSmMedium, textSmRegular } from '@/styles/helpers'

const hoverStyles = css`
	border-color: ${(p) => p.theme.tokens['color-base-surface-quaternary']};
	background: ${(p) => p.theme.tokens['color-base-surface-quaternary']};
`

const focusStyles = css`
	border-width: ${(p) => p.theme.borderWidth.xs};
	border-style: solid;
	border-color: ${(p) => p.theme.tokens['color-base-action-primary-active']};
	box-shadow: ${(p) => p.theme.tokens['ring-primary-xs']};
	background-color: ${(p) => p.theme.tokens['color-base-surface-primary']};
`

const errorFocusStyles = css`
	border-color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
	box-shadow: ${(p) => p.theme.tokens['ring-destructive-xs']};
	background-color: ${(p) => p.theme.tokens['color-base-surface-primary']};
`

export const FormItem = styled(AntdForm.Item)<{ $hasTooltip?: boolean }>`
	margin-bottom: 0;

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
						color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
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

	/*  error state */
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
`

// TODO: dorobit size specific styly
export const Select = styled(AntdSelect)<SelectProps>`
	&.ant-select-single.ant-select,
	&.ant-select-multiple.ant-select {
		.ant-select-selector {
			border: ${(p) => p.theme.borderWidth.xs} solid transparent;
			border-radius: ${(p) => p.theme.borderRadius[8]};
			background-color: ${(p) => p.theme.tokens['color-base-surface-tertiary']};
			padding: ${(p) => p.theme.spacing[12]} ${(p) => p.theme.spacing[16]};
			height: 48px;

			.ant-select-selection-placeholder {
				${textMdRegular};
				color: ${(p) => p.theme.tokens['color-base-content-quaternary']};
			}

			.ant-select-selection-item,
			.ant-select-selection-search-input {
				${textMdRegular};
				color: ${(p) => p.theme.tokens['color-base-content-primary']};
			}

			.ant-select-selection-search-input {
				height: 48px;
			}

			/* dropdown styles */
			${selectDropdownStyles}
		}

		.ant-select-arrow {
			svg {
				margin-inline-end: 6px;
				width: 20px;
				height: 20px;
				color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
			}
		}

		.ant-select-item-option-state {
			width: 14px;
			height: 22px;
			color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
		}
	}

	/* multiselect styles */

	&.ant-select-multiple.ant-select {
		.ant-select-selector {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: ${(p) => p.theme.spacing[6]} ${(p) => p.theme.spacing[16]};
			height: auto;
		}

		/* stylelint-disable-next-line */
		.ant-select-selection-item {
			height: fit-content;
		}

		.ant-select-selection-overflow {
			gap: ${(p) => p.theme.spacing[4]};
		}

		.ant-select-selection-overflow-item .ant-select-selection-search-input {
			height: 30px;
		}
	}

	/* focus styles */

	&.ant-select-single.ant-select.ant-select-focused:not(.ant-select-disabled),
	&.ant-select-multiple.ant-select.ant-select-focused:not(.ant-select-disabled) {
		& > .ant-select-selector {
			${focusStyles};
		}
	}

	/* hover styles */
	/* stylelint-disable */
	&.ant-select-single.ant-select:not(.ant-select-disabled):not(.ant-select-focused):hover, /* stylelint-disable-line */
	&.ant-select-multiple.ant-select:not(.ant-select-disabled):not(.ant-select-focused):hover {
		& > .ant-select-selector {
			${hoverStyles};
		}
	}
	/* stylelint-enable */

	/* error styles */

	&.ant-select.ant-select-status-error:not(.ant-select-disabled) {
		&.ant-select-selector {
			border: 1px solid ${(p) => p.theme.tokens['color-base-state-error-fg']};
			border-radius: ${(p) => p.theme.borderRadius[24]};
		}
	}

	/* error hover styles */

	&.ant-select-single.ant-select.ant-select-status-error:not(.ant-select-disabled):hover,
	&.ant-select-multiple.ant-select.ant-select-status-error:not(.ant-select-disabled):hover {
		& .ant-select-selector {
			border-color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
		}
	}

	/* error focus styles */

	&.ant-select-single.ant-select.ant-select-status-error.ant-select-focused:not(.ant-select-disabled),
	&.ant-select-multiple.ant-select.ant-select-status-error.ant-select-focused:not(.ant-select-disabled) {
		& > .ant-select-selector {
			${errorFocusStyles};
		}
	}

	/* disabled styles */
	/* stylelint-disable */
	&.ant-select-disabled.ant-select {
		&.ant-select-single,
		&.ant-select-multiple,
		&.ant-select-single,
		&.ant-select-multiple {
			.ant-select-selector {
				.ant-select-selection-item,
				.ant-select-selection-search-input {
					color: ${(p) => p.theme.tokens['color-base-content-quaternary']};
				}

				.ant-select-selection-item {
					${OptionRenderStyles.OptionLabel} {
						color: ${(p) => p.theme.tokens['color-base-content-quaternary']};
					}
					${OptionRenderStyles.IconPlaceholder},
					${OptionRenderStyles.ImageContainer} {
						opacity: 0.5;
					}
				}

				.ant-select-selection-placeholder {
					color: ${(p) => p.theme.tokens['color-base-content-quintarny']};
				}
			}
		}

		.ant-select-arrow {
			svg {
				color: ${(p) => p.theme.tokens['color-base-content-quintarny']};
			}
		}
	}
	/* stylelint-enable */
`

export const ChevronDown = styled(Chevron)`
	transform: rotate(90deg);
`

export const TooltipTriggerContainer = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing[4]};
	align-items: center;
`

export const TooltipTriggerLabel = styled.span`
	&::after {
		display: inline-block;
		line-height: 1;
		color: ${({ theme }) => theme.tokens['color-base-state-error-fg']};
		font-size: 14px;
		content: '*';
	}
`

export const InfoCircleIcon = styled(InfoCircle)`
	width: 15px;
	height: 15px;
	color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
`
