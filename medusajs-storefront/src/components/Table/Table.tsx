import { TableProps } from 'antd/lib/table'
import { isEmpty } from 'lodash'
import { useTranslations } from 'next-intl'

import Empty from '@/atoms/Empty/Empty'

import * as SC from './TableStyles'

type ComponentProps<RecordType> = TableProps<RecordType> & {
	emptyText?: string
	emptyStateButton?: JSX.Element
	rowClickable?: boolean
	header?: React.ReactNode
	scrollToTopAfterPaginationChange?: boolean
}

const Table = <RecordType extends object = any>(props: ComponentProps<RecordType>) => {
	const { pagination, rowClickable, emptyStateButton, emptyText, header, scrollToTopAfterPaginationChange = true, dataSource, ...restProps } = props
	const t = useTranslations('components.table')

	const emptyLocale = {
		emptyText: <Empty description={emptyText}>{emptyStateButton}</Empty>
	}

	return (
		<SC.TableWrapper>
			{header && <SC.HeaderWrapper>{header}</SC.HeaderWrapper>}
			<SC.Table
				{...restProps}
				$paginationItemsPerPageText={t('itemsPerPage') || ''}
				$rowClickable={rowClickable}
				$hasHeader={!!header}
				$hasPagination={!!pagination && !isEmpty(dataSource)}
				locale={emptyLocale}
				pagination={
					pagination
						? {
								position: ['bottomCenter'],
								locale: { items_per_page: '' },
								showTotal: (total, range) => t('resultsRange', { rangeFrom: range[0], rangeTo: range[1], total }),
								hideOnSinglePage: false,
								showSizeChanger: true,
								onChange: (page: number, pageSize: number) => {
									if (pagination.onChange) {
										pagination.onChange(page, pageSize)
									}
									if (scrollToTopAfterPaginationChange && typeof window !== 'undefined') {
										window.scrollTo({ behavior: 'smooth', top: 0 })
									}
								},
								...pagination
							}
						: false
				}
			/>
		</SC.TableWrapper>
	)
}

export default Table
