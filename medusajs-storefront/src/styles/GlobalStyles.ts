import styled, { DefaultTheme, createGlobalStyle, css } from 'styled-components'

import {
	WRAPPER_MAX_WIDTH,
	WRAPPER_PADDING_DESKTOP,
	WRAPPER_PADDING_MOBILE,
	breakpoints,
	screenReaderOnly,
	textMdSemibold,
	textSmMedium,
	textSmRegular
} from './helpers'

import 'nprogress/nprogress.css'

const collapseStyles = () => css`
	.ant-collapse-header {
		align-items: center !important;
	}
`

const notificationsStyles = (theme: DefaultTheme) => css`
	.ant-notification {
		.ant-notification-notice {
			border: 1px solid ${theme.tokens['color-base-content-quintarny']};
			box-shadow: ${theme.tokens['drop-shadow-md']};
			background: ${theme.tokens['color-base-surface-primary']};
			// fonts
			.ant-notification-notice-message {
				${textMdSemibold}
				color: ${theme.tokens['color-base-content-primary']};
			}

			.ant-notification-notice-description {
				${textSmRegular}
				color: ${theme.tokens['color-base-content-tertiary']};
			}
		}

		// Icons
		.ant-notification-notice .ant-notification-notice-icon svg {
			width: 24px;
			height: 24px;
		}

		.ant-notification-notice .ant-notification-notice-close {
			color: ${theme.tokens['color-base-content-quaternary']};

			svg {
				width: 16px;
				height: 16px;
			}
		}

		.ant-notification-notice .ant-notification-notice-close:hover {
			background: none;
			color: ${theme.tokens['color-inverse-action-secondary-hover']};
		}

		.ant-notification-notice-error .ant-notification-notice-icon {
			color: ${theme.tokens['color-base-state-error-fg']};
		}

		.ant-notification-notice-info .ant-notification-notice-icon {
			color: ${theme.tokens['color-base-state-info-fg']};
		}

		.ant-notification-notice-warning .ant-notification-notice-icon {
			color: ${theme.tokens['color-base-state-warning-fg']};
		}

		.ant-notification-notice-success .ant-notification-notice-icon {
			color: ${theme.tokens['color-base-state-success-fg']};
		}
	}
`

const dropdownStyles = (theme: DefaultTheme) => css`
	.ant-dropdown:not(.ant-select-dropdown) {
		.ant-dropdown-menu {
			border: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};
			border-radius: ${theme.borderRadius[12]};
			background: ${theme.tokens['color-base-surface-primary']};
			padding: ${theme.spacing[16]};

			.ant-dropdown-menu-item {
				border-radius: ${theme.borderRadius[4]};
				padding: ${theme.spacing[8]};

				&:not(:last-of-type) {
					margin-bottom: ${theme.spacing[16]};
				}

				&:not(.ant-dropdown-menu-item-danger) {
					color: ${theme.tokens['color-base-content-primary']};

					&:not(.ant-dropdown-menu-item-disabled) {
						&:hover,
						&:focus-visible {
							outline: none;
							background-color: ${theme.tokens['color-base-action-secondary-bg10']};
							color: ${theme.tokens['color-base-content-primary']};
						}
					}
				}

				svg {
					width: 20px;
					height: 20px;
				}

				.ant-dropdown-menu-title-content {
					${textSmMedium};
				}

				&.ant-dropdown-menu-item-danger {
					color: ${theme.tokens['color-base-state-error-fg']};

					&:not(.ant-dropdown-menu-item-disabled) {
						&:hover,
						&:focus-visible {
							outline: none;
							background-color: ${theme.tokens['color-base-action-secondary-bg10']};
							color: ${theme.tokens['color-base-state-error-fg']};
						}
					}
				}

				// disabled styles
				&.ant-dropdown-menu-item-disabled {
					opacity: 0.5;

					&:not(.ant-dropdown-menu-item-danger) {
						&:hover,
						&:focus-visible {
							background-color: transparent;
							color: ${theme.tokens['color-base-content-primary']};
						}
					}

					&.ant-dropdown-menu-item-danger {
						&:hover,
						&:focus-visible {
							background-color: transparent;
							color: ${theme.tokens['color-base-state-error-fg']};
						}
					}
				}
			}
		}
	}
`

export const GlobalStyle = createGlobalStyle<{ $isDarkMode?: boolean }>`
	/*
	1. Use a more-intuitive box-sizing model.
	*/
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		outline-width: 1px;
		outline-color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
	}

	/*
	2. Remove default margin
	*/
	* {
		margin: 0;
	}

	/*
	3. Allow percentage-based heights in the application
	*/
	html,
	body {
		height: 100%;
		color-scheme: ${({ $isDarkMode }) => ($isDarkMode ? 'dark' : 'light')};
	}

	/*
	Typographic tweaks!
	4. Add accessible line-height
	5. Improve text rendering
	*/
	body {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}

	/*
	6. Improve media defaults
	*/
	img,
	picture,
	video,
	canvas {
		display: block;
	}

	img {
		width: 100%;
		height: auto;
	}

	/*
	7. Remove built-in form typography styles
	*/
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	/*
	8. Avoid text overflows
	*/
	p, h1, h2, h3, h4, h5, h6 {
		overflow-wrap: break-word;
	}

	/*
	9. Create a root stacking context
	*/
	#root, #__next {
		isolation: isolate;
	}

	.ant-spin {
		.ant-spin-dot-item {
			background-color: ${(p) => p.theme.tokens['color-base-action-primary-active']};
		}	
	}

	.ant-spin-nested-loading {
		.ant-spin-container {
			&::after {
				background: ${(p) => p.theme.tokens['color-inverse-content-top']};
			}
		}
	}

	.grecaptcha-badge { visibility: hidden; }

	.anticon.ant-notification-notice-icon-error {
		width: 24px;
		height: 24px;
	}
	
	${collapseStyles()}
	${({ theme }) => notificationsStyles(theme)}
	${({ theme }) => dropdownStyles(theme)}
`

const DROPDOWN_OPTIONS_GAP = 16
const DROPDOWN_OPTIONS_GAP_HALF = 8

export const selectDropdownStyles = css`
	${({ theme }) => css`
		.ant-select-dropdown {
			border: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};
			border-radius: ${theme.borderRadius[12]};
			background: ${theme.tokens['color-base-surface-primary']};
			cursor: auto;
			padding: ${theme.spacing[16]} ${theme.spacing[4]};

			.rc-virtual-list {
				.rc-virtual-list-scrollbar-show {
					display: block !important;

					.rc-virtual-list-scrollbar-thumb {
						background-color: ${theme.tokens['color-base-content-quintarny']} !important;
					}
				}

				.rc-virtual-list-holder-inner {
					display: flex;
					flex-direction: column;
					padding: 0 ${theme.spacing[12]};
				}

				/* default option state */
				.ant-select-item {
					padding: 0;
					color: ${theme.tokens['color-base-content-primary']};
					display: flex;
					${textSmMedium};
					flex-direction: row;
					position: relative;

					// NOTE: fake background to create effect of gap between
					&::after {
						position: absolute;
						inset: 0;
						transition: ease 0.3s;
						z-index: 1;
						border-radius: ${theme.borderRadius[4]};
						background: transparent;
						content: '';
						pointer-events: none;
					}

					.ant-select-item-option-state {
						&:not(:empty) {
							order: -1;
						}
					}

					&:not(:last-of-type, :first-of-type) {
						&::after {
							top: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
							bottom: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}

						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]} 0;
						}
					}

					&:last-of-type {
						&::after {
							top: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}

						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin-top: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}
					}

					&:first-of-type:not(.select-all-option) {
						&::after {
							bottom: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}

						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin-bottom: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}
					}

					.ant-select-item-option-content {
						z-index: 2;
						padding: ${theme.spacing[8]};
					}

					.ant-select-item-option-state {
						z-index: 2;
						padding: ${theme.spacing[8]} 0 ${theme.spacing[8]} ${theme.spacing[8]};
					}

					// select all option
					&.select-all-option {
						position: relative;

						&::before {
							display: block;
							position: absolute;
							bottom: 0;
							left: 0;
							background: ${theme.tokens['color-base-content-quintarny']};
							width: 100%;
							height: 1px;
							content: '';
						}

						&::after {
							bottom: ${theme.spacing[16]};
						}

						.ant-select-item-option-content {
							margin-bottom: ${theme.spacing[DROPDOWN_OPTIONS_GAP]};
						}

						.ant-select-item-option-state {
							display: none;
						}
					}

					&.select-all-option + .ant-select-item {
						&::after {
							top: ${theme.spacing[DROPDOWN_OPTIONS_GAP]};
						}

						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin-top: ${theme.spacing[DROPDOWN_OPTIONS_GAP]};
						}
					}

					.ant-checkbox-wrapper {
						.ant-checkbox {
							&::after {
								border-color: transparent;
							}

							.ant-checkbox-inner {
								transition: 0.3s ease;
								border: 1px solid;
								border-radius: ${theme.borderRadius[4]};
								border-color: ${theme.tokens['color-base-content-quaternary']};
								background-color: ${theme.tokens['color-base-surface-primary']};
							}

							&.ant-checkbox-indeterminate {
								.ant-checkbox-inner {
									border-color: ${theme.tokens['color-base-action-primary-default']};
									background: ${theme.tokens['color-base-action-primary-bg']};

									&::after {
										transform-origin: center;
										background: ${theme.tokens['color-base-action-primary-default']};
										height: 1px;
									}
								}
							}
						}
					}

					.ant-select-item-option-content {
						flex: 1;
					}

					&:not(.ant-select-item-option-disabled) {
						/* hover option state */
						&:not(.ant-select-item-option-selected) {
							background: transparent;

							&:hover {
								&::after {
									background-color: ${theme.tokens['color-base-action-secondary-bg10']};
								}

								.ant-checkbox-wrapper {
									.ant-checkbox {
										.ant-checkbox-inner {
											border-color: ${theme.tokens['color-base-action-primary-hover']};
											background-color: ${theme.tokens['color-base-action-primary-bg']};

											&::after {
												border-color: ${theme.tokens['color-base-action-primary-default']};
											}
										}
									}
								}
							}
						}

						/* active option state */
						&.ant-select-item-option-active:not(:hover) {
							background: transparent;

							&::after {
								background-color: ${theme.tokens['color-base-action-secondary-bg10']};
							}

							.ant-checkbox-wrapper {
								.ant-checkbox-inner {
									border-color: ${theme.tokens['color-base-action-primary-active']};
									box-shadow: ${theme.tokens['ring-primary-xs']};

									&::after {
										border-color: ${theme.tokens['color-base-action-primary-active']};
									}
								}
							}
						}

						/* selected option state */
						&.ant-select-item-option-selected,
						&.ant-select-item-option-selected.ant-select-item-option-active {
							background: transparent;

							&::after {
								background: ${(p) => p.theme.tokens['color-base-action-primary-bg10']};
							}

							&:hover {
								&::after {
									background: ${(p) => p.theme.tokens['color-base-action-primary-bg']};
								}
							}

							.ant-checkbox-wrapper {
								.ant-checkbox {
									.ant-checkbox-inner {
										border-color: ${theme.tokens['color-base-action-primary-default']};
										background-color: ${theme.tokens['color-base-action-primary-bg']};

										&::after {
											border-color: ${theme.tokens['color-base-action-primary-default']};
										}
									}
								}
							}
						}
					}

					// disabled styles
					&.ant-select-item-option-disabled {
						color: ${theme.tokens['color-base-content-quintarny']};

						.ant-checkbox-wrapper {
							.ant-checkbox {
								border-radius: ${theme.borderRadius[4]};
								background-color: ${theme.tokens['color-base-surface-primary']};

								.ant-checkbox-inner {
									opacity: 0.32;
								}

								&.ant-checkbox-checked {
									.ant-checkbox-inner {
										border-color: ${theme.tokens['color-base-action-primary-default']};

										&::after {
											border-color: ${theme.tokens['color-base-action-primary-default']};
										}
									}
								}

								&.ant-checkbox-indeterminate {
									.ant-checkbox-inner {
										background: ${theme.tokens['color-base-surface-primary']};
									}
								}
							}
						}
					}
				}
			}
		}
	`}
`

/* General shared componnets */

export const PageWrapper = styled.div`
	margin: 0 auto;
	padding: 0 ${WRAPPER_PADDING_MOBILE}px;
	max-width: ${WRAPPER_MAX_WIDTH}px;

	@media (min-width: ${breakpoints.lg}px) {
		padding: 0 ${WRAPPER_PADDING_DESKTOP}px;
	}
`

/* Utility components */

export const ScreenReaderOnly = styled.span`
	${screenReaderOnly}
`
