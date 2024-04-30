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

const notificationsStyles = (theme: DefaultTheme) => css`
	.ant-notification {
		.ant-notification-notice {
			background: ${theme.tokens['color-base-surface-primary']};
			box-shadow: ${theme.tokens['drop-shadow-md']};
			border: 1px solid ${theme.tokens['color-base-content-quintarny']};
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
			color: ${theme.tokens['color-inverse-action-secondary-hover']};
			background: none;
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
			border-radius: ${theme.borderRadius[12]};
			border: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};
			background: ${theme.tokens['color-base-surface-primary']};
			padding: ${theme.spacing[16]};

			.ant-dropdown-menu-item {
				&:not(:last-of-type) {
					margin-bottom: ${theme.spacing[16]};
				}

				border-radius: ${theme.borderRadius[4]};
				padding: ${theme.spacing[8]};

				svg {
					width: 20px;
					height: 20px;
				}

				.ant-dropdown-menu-title-content {
					${textSmMedium};
				}

				&:not(.ant-dropdown-menu-item-danger) {
					color: ${theme.tokens['color-base-content-primary']};

					&:not(.ant-dropdown-menu-item-disabled) {
						&:hover,
						&:focus-visible {
							color: ${theme.tokens['color-base-content-primary']};
							background-color: ${theme.tokens['color-base-action-secondary-bg10']};
							outline: none;
						}
					}
				}

				&.ant-dropdown-menu-item-danger {
					color: ${theme.tokens['color-base-state-error-fg']};

					&:not(.ant-dropdown-menu-item-disabled) {
						&:hover,
						&:focus-visible {
							color: ${theme.tokens['color-base-state-error-fg']};
							background-color: ${theme.tokens['color-base-action-secondary-bg10']};
							outline: none;
						}
					}
				}

				// disabled styles
				&.ant-dropdown-menu-item-disabled {
					opacity: 0.5;

					&:not(.ant-dropdown-menu-item-danger) {
						&:hover,
						&:focus-visible {
							color: ${theme.tokens['color-base-content-primary']};
							background-color: transparent;
						}
					}

					&.ant-dropdown-menu-item-danger {
						&:hover,
						&:focus-visible {
							color: ${theme.tokens['color-base-state-error-fg']};
							background-color: transparent;
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
	
	${({ theme }) => notificationsStyles(theme)}
	${({ theme }) => dropdownStyles(theme)}
`

const DROPDOWN_OPTIONS_GAP = 16
const DROPDOWN_OPTIONS_GAP_HALF = 8

export const selectDropdownStyles = css`
	${({ theme }) => css`
		.ant-select-dropdown {
			border-radius: ${theme.borderRadius[12]};
			border: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};
			background: ${theme.tokens['color-base-surface-primary']};
			padding: ${theme.spacing[16]} ${theme.spacing[4]};
			cursor: auto;

			.rc-virtual-list {
				.rc-virtual-list-scrollbar-show {
					display: block !important;
					.rc-virtual-list-scrollbar-thumb {
						background-color: ${theme.tokens['color-base-content-quintarny']} !important;
					}
				}

				.rc-virtual-list-holder-inner {
					padding: 0 ${theme.spacing[12]};
					display: flex;
					flex-direction: column;
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
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						pointer-events: none;
						content: '';
						transition: ease 0.3s;
						background: transparent;
						border-radius: ${theme.borderRadius[4]};
						z-index: 1;
					}

					.ant-select-item-option-state {
						&:not(:empty) {
							order: -1;
						}
					}

					&:not(:last-of-type):not(:first-of-type) {
						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]} 0;
						}

						&::after {
							top: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
							bottom: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}
					}

					&:last-of-type {
						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin-top: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}

						&::after {
							top: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}
					}

					&:first-of-type:not(.select-all-option) {
						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin-bottom: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}

						&::after {
							bottom: ${theme.spacing[DROPDOWN_OPTIONS_GAP_HALF]};
						}
					}

					.ant-select-item-option-content {
						padding: ${theme.spacing[8]};
						z-index: 2;
					}

					.ant-select-item-option-state {
						padding: ${theme.spacing[8]} 0 ${theme.spacing[8]} ${theme.spacing[8]};
						z-index: 2;
					}

					// select all option
					&.select-all-option {
						position: relative;

						&::before {
							content: '';
							display: block;
							position: absolute;
							width: 100%;
							left: 0;
							bottom: 0;
							height: 1px;
							background: ${theme.tokens['color-base-content-quintarny']};
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
						.ant-select-item-option-content,
						.ant-select-item-option-state {
							margin-top: ${theme.spacing[DROPDOWN_OPTIONS_GAP]};
						}
						&::after {
							top: ${theme.spacing[DROPDOWN_OPTIONS_GAP]};
						}
					}

					.ant-checkbox-wrapper {
						.ant-checkbox {
							.ant-checkbox-inner {
								border: 1px solid;
								border-color: ${theme.tokens['color-base-content-quaternary']};
								background-color: ${theme.tokens['color-base-surface-primary']};
								border-radius: ${theme.borderRadius[4]};
								transition: 0.3s ease;
							}

							&::after {
								border-color: transparent;
							}

							&.ant-checkbox-indeterminate {
								.ant-checkbox-inner {
									background: ${theme.tokens['color-base-action-primary-bg']};
									border-color: ${theme.tokens['color-base-action-primary-default']};

									&::after {
										height: 1px;
										background: ${theme.tokens['color-base-action-primary-default']};
										transform-origin: center;
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

							.ant-checkbox-wrapper {
								.ant-checkbox {
									.ant-checkbox-inner {
										background-color: ${theme.tokens['color-base-action-primary-bg']};
										border-color: ${theme.tokens['color-base-action-primary-default']};

										&::after {
											border-color: ${theme.tokens['color-base-action-primary-default']};
										}
									}
								}
							}

							&:hover {
								&::after {
									background: ${(p) => p.theme.tokens['color-base-action-primary-bg']};
								}
							}
						}
					}

					// disabled styles
					&.ant-select-item-option-disabled {
						color: ${theme.tokens['color-base-content-quintarny']};

						.ant-checkbox-wrapper {
							.ant-checkbox {
								background-color: ${theme.tokens['color-base-surface-primary']};
								border-radius: ${theme.borderRadius[4]};

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
	max-width: ${WRAPPER_MAX_WIDTH}px;
	margin: 0 auto;
	padding: 0 ${WRAPPER_PADDING_MOBILE}px;

	@media (min-width: ${breakpoints.lg}px) {
		padding: 0 ${WRAPPER_PADDING_DESKTOP}px;
	}
`

/* Utility components */

export const ScreenReaderOnly = styled.span`
	${screenReaderOnly}
`
