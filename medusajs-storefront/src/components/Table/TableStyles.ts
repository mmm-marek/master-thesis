import { Table as AntdTable } from 'antd'
import styled, { css } from 'styled-components'

import Chevron from '@/assets/icons/chevron.svg?url'
import TableSortIcon from '@/assets/icons/table-sort-icon.svg?url'
import { selectDropdownStyles } from '@/styles/GlobalStyles'
import { breakpoints, textSmMedium, textSmRegular, textXsRegular, textXsSemibold } from '@/styles/helpers'

const Z_INDEX_TABLE = 1
const Z_INDEX_FOOTER = 2
const BORDER_RADIUS = 12

type AdditionalTableProps = { $paginationItemsPerPageText?: string; $rowClickable?: boolean; $hasHeader?: boolean; $hasPagination?: boolean }

const focusButtonStyle = css`
	box-shadow: ${(p) => p.theme.tokens['ring-secondary-xs']};
`

const headerSortIconStyles = css`
	position: absolute;
	top: calc(50% - 8px);
	left: 5px;
	content: url('${TableSortIcon}');
	filter: ${(p) => p.theme.filters['color-base-content-secondary']};
`

const tableHeaderStyles = css<AdditionalTableProps>`
	${({ theme, $hasHeader }) => css`
		/* stylelint-disable */
		.ant-table-thead {
			tr {
				th {
					${textXsSemibold};
					color: ${theme.tokens['color-base-content-secondary']};
					border-bottom: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-surface-quaternary']};
					padding: ${theme.spacing[12]} ${theme.spacing[16]};
					background: ${theme.tokens['color-base-surface-tertiary']};

					&:before {
						content: none !important; /* hide divider */
					}

					${() =>
						$hasHeader &&
						css`
							border-top: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-surface-quaternary']};
						`}
				}

				&:first-child {
					& > *:first-child {
						border-start-start-radius: ${$hasHeader ? 0 : theme.borderRadius[BORDER_RADIUS]};
					}
					& > *:last-child {
						border-start-end-radius: ${$hasHeader ? 0 : theme.borderRadius[BORDER_RADIUS]};
					}
				}

				th.ant-table-column-has-sorters {
					&.ant-table-column-sort,
					&.ant-table-cell-fix-left:hover,
					&.ant-table-cell-fix-right:hover {
						background: ${theme.tokens['color-base-surface-tertiary']};
					}

					.ant-table-column-title {
						${textXsSemibold};
						flex: initial;
						color: ${theme.tokens['color-base-content-secondary']};
					}

					&:hover {
						background: ${theme.tokens['color-base-surface-tertiary']};
						.ant-table-column-sorter {
							.anticon-caret-up,
							.anticon-caret-down {
								display: block !important;
							}
						}
					}
					&:not(.table-col-with-sorter-right) {
						.ant-table-column-sorters {
							justify-content: flex-start;
						}
					}
					.ant-table-column-sorters {
						.ant-table-column-sorter {
							position: relative;
							.anticon-caret-up:not(.active),
							.anticon-caret-down:not(.active) {
								display: none;
							}
							.anticon-caret-up,
							.anticon-caret-down {
								svg {
									display: none;
								}
							}
							.anticon-caret-up {
								&:after {
									${headerSortIconStyles};
									transform: rotate(-180deg);
								}
							}
							.anticon-caret-up.active {
								&:after {
									${headerSortIconStyles};
									transform: rotate(0deg);
								}
							}
							.anticon-caret-down.active {
								&:after {
									${headerSortIconStyles};
									transform: rotate(-180deg);
								}
							}
						}
					}
				}
			}

			@media (min-width: ${breakpoints.md}px) {
				tr {
					th {
						padding: ${theme.spacing[12]} ${theme.spacing[24]};
					}
				}
			}
		}
	`}
`

const tableBodyStyles = css<AdditionalTableProps>`
	${({ theme, $rowClickable }) => css`
		.ant-table-tbody {
			// selected row style
			tr.ant-table-row-selected {
				/* TODO: (FR) vyriesit selected row - zatial sa nikde nepouziva */
			}
			// default style
			tr.ant-table-row {
				td {
					${textSmMedium};
					color: ${theme.tokens['color-base-content-primary']};
					background: ${theme.tokens['color-base-surface-primary']};
					cursor: ${$rowClickable ? 'pointer' : 'default'};
					padding: ${theme.spacing[16]};
					height: 64px;

					&.ant-table-column-sort {
						background: ${theme.tokens['color-base-surface-primary']};
					}
					&.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-row-hover,
					&.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-row-hover {
						position: relative;
						background: ${theme.tokens['color-base-surface-primary']};
						&::before {
							content: '';
							position: absolute;
							inset: 0;
							background-color: ${theme.tokens['color-base-action-secondary-bg10']};
						}
					}
				}
				&:not(:last-of-type) {
					td {
						border-bottom: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-surface-quaternary']};
					}
				}
				&:last-of-type {
					td {
						border-bottom-color: transparent;
					}
				}
				&:hover {
					td,
					td.ant-table-column-sort {
						background: ${theme.tokens['color-base-action-secondary-bg10']};
					}
				}
			}
			tr.ant-table-placeholder {
				background: ${theme.tokens['color-base-surface-primary']};

				td {
					border-bottom: ${theme.borderWidth.xs} solid transparent;

					.ant-empty {
						margin-top: ${theme.spacing[80]};
						margin-bottom: ${theme.spacing[80]};
					}
				}

				&:hover {
					td {
						background: ${theme.tokens['color-base-surface-primary']};
					}
				}
			}

			@media (min-width: ${breakpoints.md}px) {
				tr.ant-table-row {
					td {
						padding: ${theme.spacing[16]} ${theme.spacing[24]};
					}
				}
			}
		}
	`}
`

const tableStyles = css<AdditionalTableProps>`
	.ant-table {
		padding: 0;
		z-index: ${Z_INDEX_TABLE};
		position: relative;
		background: ${({ theme }) => theme.tokens['color-base-surface-primary']};

		${({ $hasHeader, theme }) =>
			!$hasHeader &&
			css`
				border-top-left-radius: ${theme.borderRadius[BORDER_RADIUS]};
				border-top-right-radius: ${theme.borderRadius[BORDER_RADIUS]};

				.ant-table-content {
					border-top-left-radius: ${theme.borderRadius[BORDER_RADIUS]};
					border-top-right-radius: ${theme.borderRadius[BORDER_RADIUS]};
				}
			`}

		${({ $hasPagination, theme }) =>
			!$hasPagination &&
			css`
				border-bottom-left-radius: ${theme.borderRadius[BORDER_RADIUS]};
				border-bottom-right-radius: ${theme.borderRadius[BORDER_RADIUS]};

				.ant-table-content {
					border-bottom-left-radius: ${theme.borderRadius[BORDER_RADIUS]};
					border-bottom-right-radius: ${theme.borderRadius[BORDER_RADIUS]};
				}
			`}


		// Header
		${tableHeaderStyles}
		// Body
		${tableBodyStyles}

		// fixed styles
		&.ant-table-ping-left,
		&.ant-table-ping-right {
			.ant-table-container {
				&::before,
				&:after {
					box-shadow: none;
				}
			}
		}
	}
`
const paginationPrevNextButtonStyles = css`
	position: absolute;
	content: '';
	border-radius: 50%;
	transition: background-color 400ms;
	top: calc(50% - 12px);
	left: calc(50% - 12px);
	width: 24px;
	height: 24px;
	filter: ${(p) => p.theme.filters['color-base-content-secondary']};
	background: url('${Chevron}') no-repeat center center;
`

const paginationStyles = css<AdditionalTableProps>`
	${({ theme, $paginationItemsPerPageText }) => css`
		.ant-table-pagination {
			align-items: center;
			row-gap: ${theme.spacing[16]};
			background: ${theme.tokens['color-base-surface-primary']};
			padding: ${theme.spacing[16]};
			border-bottom-left-radius: ${theme.borderRadius[16]};
			border-bottom-right-radius: ${theme.borderRadius[16]};
			border-top: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-surface-quaternary']};

			&.ant-pagination {
				margin: 0;
			}

			// total text
			.ant-pagination-total-text {
				order: -1;
				flex: 0 0 45%;
				margin-right: auto;
				${textXsRegular};
				color: ${theme.tokens['color-base-content-tertiary']};
				display: flex;
				align-items: center;
			}

			// page size changer
			.ant-pagination-options {
				order: -1;
				margin-left: auto;
				display: flex;
				flex: 0 0 55%;
				align-items: center;
				justify-content: flex-end;
				gap: ${theme.spacing['8']};

				&::before {
					content: '${$paginationItemsPerPageText}';
					white-space: nowrap;
					${textXsRegular};
					color: ${theme.tokens['color-base-content-tertiary']};
				}

				// select
				.ant-select {
					text-align: left;
					position: relative;
					z-index: 2;
					cursor: default;

					span.ant-select-arrow {
						display: none;
					}
					.ant-select-selector {
						cursor: pointer;
						border: ${theme.borderWidth.xs} solid transparent;
						border-radius: ${theme.borderRadius[8]};
						background-color: ${theme.tokens['color-base-surface-tertiary']};
						position: relative;
						padding: 0 ${theme.spacing[12]};
						display: flex;
						align-items: center;
						height: 36px;
						&:before {
							position: absolute;
							z-index: 1;
							content: '';
							transition-property: background-color, opacity;
							top: calc(50% - 8px);
							right: 12px;
							width: 16px;
							transform: rotate(90deg);
							transform-origin: center;
							height: 16px;
							background: url('${Chevron}') no-repeat center center;
							background-size: contain;
							filter: ${theme.filters['color-base-content-tertiary']};
							transition: all 0.2s ease;
						}
						.ant-select-selection-item {
							${textSmRegular};
							color: ${theme.tokens['color-base-content-quaternary']};
							padding-inline-end: ${theme.spacing[20]};
						}
						.ant-select-selection-search input {
							${textSmRegular};
							color: ${theme.tokens['color-base-content-tertiary']};
						}
					}
					&:not(.ant-select-disabled) {
						.ant-select-selector {
							&:hover {
								background-color: ${theme.tokens['color-base-surface-quaternary']};
							}
						}
						&:hover {
							.ant-select-selector {
								border-color: transparent;
							}
						}
					}
					&.ant-select-disabled {
						.ant-select-selector {
							cursor: default;
							.ant-select-selection-item {
								color: ${theme.tokens['color-base-content-quintarny']};
							}
							.ant-select-selection-search {
								input {
									cursor: default;
								}
							}
							&:before {
								filter: ${theme.filters['color-base-content-quintarny']};
							}
						}
					}
					&.ant-select-focused {
						&:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) {
							.ant-select-selector {
								border-color: ${theme.tokens['color-base-action-primary-active']};
								background-color: ${theme.tokens['color-base-surface-primary']};
								box-shadow: ${theme.tokens['ring-primary-xs']};

								&::before {
									opacity: 1;
								}
							}
						}
					}

					&.ant-select-open {
						.ant-select-selector {
							&:before {
								transform: rotate(270deg);
							}
						}
					}
				}

				.ant-empty-description {
					${textXsRegular};
					color: ${theme.tokens['color-base-content-tertiary']};
				}

				/* dropdown */
				${selectDropdownStyles}
			}

			// pagination
			.ant-pagination-item {
				border: none;
				${textSmMedium};
				border-radius: ${theme.borderRadius[8]};
				color: ${theme.tokens['color-base-content-primary']};
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				background: ${theme.tokens['color-base-surface-primary']};
				outline: none;

				a {
					color: ${theme.tokens['color-base-content-primary']};
				}
			}
			.ant-pagination-prev,
			.ant-pagination-next {
				.ant-pagination-item-link {
					background: ${theme.tokens['color-base-surface-primary']};
					border: none;
					position: relative;
					transition: all 0.2s ease;
					outline: none;
					span {
						display: none;
					}
				}
			}
			.ant-pagination-jump-next,
			.ant-pagination-jump-prev {
				outline: none;
				.ant-pagination-item-container {
					.ant-pagination-item-link-icon {
						opacity: 0;
						filter: ${theme.filters['color-base-content-tertiary']};
						width: 14px;
						height: 14px;
					}
					.ant-pagination-item-ellipsis {
						opacity: 1;
						color: ${theme.tokens['color-base-content-primary']};
					}
				}
			}
			.ant-pagination-prev {
				.ant-pagination-item-link {
					&:before {
						${paginationPrevNextButtonStyles};
						transform: rotate(180deg);
					}
				}
			}
			.ant-pagination-next {
				.ant-pagination-item-link {
					&:before {
						${paginationPrevNextButtonStyles}
					}
				}
			}
			// pagination (not disabled) styles
			&:not(.ant-pagination-disabled) {
				.ant-pagination-item-active {
					> a {
						color: ${theme.tokens['color-base-content-primary']};
					}
					background-color: ${theme.tokens['color-base-surface-tertiary']};
					transition: background-color 0.2s ease;
				}
				.ant-pagination-item,
				.ant-pagination-item-link:not(:disabled) {
					&:hover {
						background-color: ${theme.tokens['color-base-action-secondary-bg10']};
					}
					&:focus-visible {
						${focusButtonStyle};
					}
				}
				.ant-pagination-jump-next,
				.ant-pagination-jump-prev {
					&:hover {
						.ant-pagination-item-container {
							.ant-pagination-item-link-icon {
								opacity: 1;
							}
							.ant-pagination-item-ellipsis {
								opacity: 0;
							}
						}
					}
					&:focus-visible {
						${focusButtonStyle};
					}
				}
				.ant-pagination-prev,
				.ant-pagination-next {
					&:focus-visible {
						.ant-pagination-item-link {
							${focusButtonStyle};
						}
					}
				}
				.ant-pagination-item-link:disabled {
					&::before {
						opacity: 0.2;
					}
				}
			}
			// pagination disabled styles
			&.ant-pagination-disabled {
				cursor: default;
				.ant-pagination-item {
					cursor: default;
					a {
						cursor: default;
						color: ${theme.tokens['color-base-action-secondary-bg10']};
					}
				}
				.ant-pagination-next,
				.ant-pagination-prev {
					.ant-pagination-item-link {
						cursor: default;
						&::before {
							filter: ${theme.filters['color-base-content-quintarny']};
						}
					}
				}
				.ant-pagination-jump-next,
				.ant-pagination-jump-prev {
					.ant-pagination-item-container {
						cursor: default;
						.ant-pagination-item-link-icon {
							filter: ${theme.filters['color-base-content-quintarny']};
						}
						.ant-pagination-item-ellipsis {
							color: ${theme.filters['color-base-content-quintarny']};
						}
					}
				}
				.ant-pagination-item-active {
					&:hover {
						background-color: ${theme.tokens['color-base-surface-primary']};
					}
				}
			}

			@media (min-width: ${breakpoints.md}px) {
				position: sticky;
				bottom: 0;
				z-index: ${Z_INDEX_FOOTER};
				padding: ${theme.spacing[16]} ${theme.spacing[24]};

				.ant-pagination-total-text {
					order: 0;
					flex: auto;
				}

				.ant-pagination-options {
					order: 0;
					flex: auto;
				}
			}
		}
	`}
`

export const Table = styled(AntdTable)<AdditionalTableProps>`
	${tableStyles}
	${paginationStyles}
`

export const TableWrapper = styled.div`
	${({ theme }) => css`
		border-radius: ${theme.borderRadius[BORDER_RADIUS]};
		background: ${theme.tokens['color-base-surface-primary']};
		border: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};

		@media (min-width: ${breakpoints.md}px) {
			gap: ${theme.spacing[16]};
		}

		@media (min-width: ${breakpoints.lg}px) {
			gap: ${theme.spacing[24]};
		}
	`}
`

export const HeaderWrapper = styled.div`
	${({ theme }) => css`
		padding: ${theme.spacing[16]};

		@media (min-width: ${breakpoints.md}px) {
			gap: ${theme.spacing[24]};
		}
	`};
`
