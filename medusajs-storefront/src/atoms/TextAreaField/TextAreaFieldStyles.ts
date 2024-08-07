import { Form, Input } from 'antd'
import styled, { css } from 'styled-components'

import { textMdRegular, textSmMedium, textSmRegular } from '@/styles/helpers'

export const FormItem = styled(Form.Item)<{ $hideHelp?: boolean }>`
	margin-bottom: 0;
	width: 100%;

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
			padding: 0;
			text-align: left;

			label {
				display: inline-flex;
				flex-direction: row-reverse;
				height: 20px;
				color: ${(p) => p.theme.tokens['color-base-content-primary']};
				${textSmMedium};

				&::after {
					display: none;
				}

				&.ant-form-item-required {
					&::before {
						color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
					}
				}

				svg {
					display: inline-block;
					order: -1;
					margin-inline-start: 0;
					width: 15px;
					height: 15px;
					color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
				}
			}
		}

		.ant-form-item-control-input {
			min-height: auto;
		}

		.ant-form-item-explain {
			.ant-form-item-explain-error {
				text-align: left;
				color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
				${textSmRegular};
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
`

export const TextArea = styled(Input.TextArea)`
	&.ant-input {
		${textMdRegular};
	}
`
