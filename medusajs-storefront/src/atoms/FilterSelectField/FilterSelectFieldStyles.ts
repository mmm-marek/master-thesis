import { Form as AntdForm, Select as AntdSelect, Checkbox } from 'antd'
import styled, { css } from 'styled-components'

import * as OptionRenderStyles from '../OptionRender/OptionRenderStyles'
import { selectDropdownStyles } from '@/styles/GlobalStyles'
import { textMdMedium, textXsMedium, transition, truncate } from '@/styles/helpers'

const { Option } = AntdSelect

const MAIN_PADDING_X = '8px'
const LABEL_VALUE_SPACING = '8px'
const SUFFIX_ICON_WIDTH = '20px'
const SELECTOR_MIN_WIDTH = '24px'

export const FormItem = styled(AntdForm.Item)`
	${({ theme }) => css`
		&.ant-form-item {
			position: relative;
			margin-bottom: 0;

			> .ant-form-item-row {
				.ant-form-item-control {
					display: block;
					flex-grow: unset;
				}

				.ant-form-item-label {
					display: flex;
					position: absolute;
					left: ${MAIN_PADDING_X};
					align-items: center;
					opacity: 0;
					padding: 0;
					height: 100%;

					label {
						height: 100%;
						${textMdMedium};
						color: ${theme.tokens['color-base-content-secondary']};

						&::after {
							display: none;
						}
					}
				}
			}
		}
	`}
`

const selectionItemStyles = css`
	display: inline-block;
	${textMdMedium};
	white-space: nowrap;
	color: ${(p) => p.theme.tokens['color-base-content-primary']};
`

export const TagRender = styled.span`
	width: fit-content;
	max-width: 200px;
	${truncate};
	${selectionItemStyles};
`

export const Select = styled(AntdSelect)<{ $labelText: string; $placeholderText?: string; $hasValue?: boolean; $multiple?: boolean }>`
	${({ theme, $labelText, $placeholderText, $hasValue, $multiple }) => css`
		&.ant-select:not(.ant-select-customize-input) {
			.ant-select-clear {
				background: ${theme.tokens['color-base-surface-primary']};
				width: ${SUFFIX_ICON_WIDTH};
				height: ${SUFFIX_ICON_WIDTH};
				${transition};

				svg {
					color: ${theme.tokens['color-base-content-quaternary']};
				}
			}

			.ant-select-arrow {
				${transition};
				transform-origin: center;

				svg {
					transform: rotate(90deg);
					width: ${SUFFIX_ICON_WIDTH};
					height: ${SUFFIX_ICON_WIDTH};
					color: ${theme.tokens['color-base-content-quaternary']};
				}
			}

			.ant-select-selector {
				display: flex;
				align-items: center;
				border-radius: ${theme.borderRadius[8]};
				border-color: transparent;
				padding: 0 ${MAIN_PADDING_X};
				padding-inline-end: 36px !important;
				height: 36px;
				line-height: 1.5rem;
				${transition};

				.ant-select-selection-item {
					${selectionItemStyles};
					padding-right: 0;

					&::after {
						display: none;
					}
				}

				${$placeholderText &&
				$multiple &&
				css`
					&::after {
						display: block;
						position: relative;
						width: auto;
						min-width: ${SELECTOR_MIN_WIDTH};
						height: 1px;
						content: '${$placeholderText}';
						${textMdMedium};
					}
				`}

				/* stylelint-disable-next-line  */
				&::before {
					display: flex;
					align-items: center;
					opacity: 1;
					padding-right: ${LABEL_VALUE_SPACING};
					height: 100%;
					overflow: hidden;
					white-space: nowrap;
					color: ${theme.tokens['color-base-content-secondary']};
					content: '${$labelText}:';
					${textMdMedium};
				}

				.ant-select-selection-overflow {
					height: 1.5rem;
					line-height: 1.5rem !important;
					${textMdMedium};

					${!$placeholderText &&
					css`
						min-width: ${SELECTOR_MIN_WIDTH};
					`};

					.ant-select-selection-overflow-item {
						&:not(.ant-select-selection-overflow-item-rest, .ant-select-selection-overflow-item-suffix) {
							> span {
								display: flex;
								align-items: center;
							}
						}

						&.ant-select-selection-overflow-item-suffix {
							width: 0;
						}

						&.ant-select-selection-overflow-item-rest {
							display: flex;
							align-items: center;
							padding-right: 0;
							padding-left: ${theme.spacing[6]};
							line-height: 1.5rem;

							.ant-select-selection-item {
								margin: 0;
								border-radius: ${theme.borderRadius[8]};
								background: ${theme.tokens['color-base-action-primary-default']};
								cursor: pointer;
								padding: ${theme.spacing[2]} ${theme.spacing[8]};
								height: 1.25rem;
								color: ${textXsMedium};
								color: ${theme.tokens['color-inverse-content-top']};

								.ant-select-selection-item-content {
									margin: 0;
								}
							}
						}
					}
				}

				/* placeholder */
				.ant-select-selection-placeholder {
					inset-inline: ${MAIN_PADDING_X} 36px;
					padding-right: 0;
					${textMdMedium};
					color: ${theme.tokens['color-base-content-primary']};

					${$multiple &&
					css`
						&::before {
							opacity: 0;
							padding-right: ${LABEL_VALUE_SPACING};
							height: 1px;
							overflow: hidden;
							white-space: nowrap;
							content: '${$labelText}:';
							${textMdMedium};
						}
					`}
				}

				/* dropdown */
				${selectDropdownStyles}
			}

			${$hasValue
				? css`
						.ant-select-selector {
							background-color: ${theme.tokens['color-base-action-primary-bg10']};
						}

						&:hover:not(.ant-select-focused, .ant-select-disabled) {
							.ant-select-selector,
							.ant-select-clear {
								background-color: ${theme.tokens['color-base-action-primary-bg']};
							}
						}
					`
				: css`
						.ant-select-selector {
							background-color: ${theme.tokens['color-base-surface-primary']};
						}

						&:hover:not(.ant-select-focused, .ant-select-disabled) {
							.ant-select-selector {
								border-color: transparent;
							}

							.ant-select-selector,
							.ant-select-clear {
								background-color: ${theme.tokens['color-base-surface-secondary']};
							}
						}
					`}

			/* stylelint-disable-next-line */
			&:not(.ant-pagination-size-changer) {
				/* focused styles */
				&:not(.ant-select-disabled) {
					&:not(.ant-select-focused):hover {
						.ant-select-selector {
							border-color: transparent;
						}
					}

					&.ant-select-focused:not(.ant-select-status-error) {
						.ant-select-selector {
							border-color: ${theme.tokens['color-base-action-primary-active']};
							box-shadow: ${theme.tokens['ring-primary-xs']};
							background-color: ${theme.tokens['color-base-surface-primary']};
						}
					}

					/* error styles */
					&.ant-select-status-error {
						/* stylelint-disable-next-line */
						.ant-select-selector,
						&:hover .ant-select-selector {
							border-color: ${theme.tokens['color-base-state-error-fg']};
						}

						&.ant-select-focused {
							.ant-select-selector {
								box-shadow: ${(p) => p.theme.tokens['ring-destructive-xs']};
								background-color: ${(p) => p.theme.tokens['color-base-surface-primary']};
							}
						}
					}
				}

				/* disabled styles */
				&.ant-select-disabled {
					/* stylelint-disable-next-line */
					.ant-select-selector {
						background-color: ${theme.tokens['color-base-surface-primary']};

						&::before {
							color: ${theme.tokens['color-base-content-quintarny']};
						}

						.ant-select-selection-overflow {
							.ant-select-selection-overflow-item {
								&.ant-select-selection-overflow-item-rest {
									.ant-select-selection-item {
										opacity: 0.3;
										cursor: not-allowed;
									}
								}
							}
						}
					}

					.ant-select-selection-item,
					.ant-select-selection-placeholder,
					${TagRender}, ${OptionRenderStyles.OptionLabel} {
						color: ${theme.tokens['color-base-content-quaternary']};
					}

					${OptionRenderStyles.IconPlaceholder},
					${OptionRenderStyles.ImageContainer} {
						opacity: 0.5;
					}

					.ant-select-arrow,
					.ant-select-clear {
						svg {
							filter: ${theme.filters['color-base-content-quintarny']};
						}
					}
				}
			}
		}

		/* dropdown open styles */
		&.ant-select-open {
			/* stylelint-disable-next-line */
			.ant-select-selection-item {
				color: ${theme.tokens['color-base-content-primary']};
			}

			/* stylelint-disable-next-line */
			.ant-select-arrow {
				transform: rotate(180deg);
			}
		}
	`}
`

export const DropdownWrapper = styled.div`
	min-width: 200px;
`

export const SearchWrapper = styled.div`
	padding: ${({ theme }) => `0 ${theme.spacing[12]}`};

	.ant-input-affix-wrapper {
		.ant-input {
			cursor: text !important;
		}
	}
`

export const MenuItemSelectedIcon = styled(Checkbox)`
	user-select: none;
	pointer-events: none;
`

export const SelectAllOptionLabel = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: row-reverse;
		gap: ${theme.spacing[8]};
		align-items: center;
		justify-content: space-between;
		width: 100%;

		> span {
			flex: 1;
		}
	`}
`

export const SelectAllOption = styled(Option)`
	${({ theme }) => css`
		border-bottom: 1px solid red;
		padding: ${theme.spacing[12]};
	`}
`

export const EmptyWrapper = styled.div`
	margin-top: ${({ theme }) => theme.spacing[16]};
`
