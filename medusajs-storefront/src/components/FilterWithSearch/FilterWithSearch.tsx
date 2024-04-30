import { Col } from 'antd'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Control, FieldValues, UseFormSetFocus } from 'react-hook-form'

import CloseIcon from '@/assets/icons/close.svg'
import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { useParseQuery } from '@/hooks/useQueryParser'
import { filterWithSearchSchema } from '@/schemas/components/filterWithSearch'
import { FIELD_MODE, VALIDATION_MAX_LENGTH } from '@/utils/enums'

import * as SC from './FilterWithSearchStyles'

type Props<ValuesType extends FieldValues & { search?: string | null }> = {
	setFocus: UseFormSetFocus<ValuesType>
	control: Control<ValuesType>
	onClearSearch: () => void
	placeholder: string
} & PropsWithChildren

const FilterWithSearch = <ValuesType extends FieldValues & { search?: string | null }>(props: Props<ValuesType>) => {
	const { control, setFocus, children, onClearSearch, placeholder } = props

	const [query] = useParseQuery(filterWithSearchSchema)

	const hasSearchValue = !!query.search

	const [isSearchOpen, setIsSearchOpen] = useState(false)

	useEffect(() => {
		if (isSearchOpen) {
			setFocus<any>('search')
		}
	}, [isSearchOpen, setFocus])

	useEffect(() => {
		if (hasSearchValue) {
			setIsSearchOpen(true)
		}
	}, [hasSearchValue])

	return (
		<SC.Form layout='vertical'>
			<SC.FiltersWrapper>
				{children && <Col flex='auto'>{children}</Col>}
				{isSearchOpen ? (
					<SC.SearchInputContainer>
						<HookFormField
							control={control}
							name='search'
							component={InputField}
							hideHelp
							placeholder={placeholder}
							size='middle'
							fieldMode={FIELD_MODE.FILTER}
							maxLength={VALIDATION_MAX_LENGTH.LENGTH_255}
							suffix={
								<Button
									icon={<CloseIcon />}
									size='small'
									noBackground
									onClick={(e) => {
										e.stopPropagation()
										setIsSearchOpen(false)
										if (hasSearchValue) {
											onClearSearch()
										}
									}}
								/>
							}
						/>
					</SC.SearchInputContainer>
				) : (
					<SC.SearchButtonWrapper>
						<SC.SearchButton
							noBackground
							type='default'
							icon={<SC.SearchIcon />}
							size='large'
							onClick={() => {
								setIsSearchOpen(true)
							}}
						/>
					</SC.SearchButtonWrapper>
				)}
			</SC.FiltersWrapper>
		</SC.Form>
	)
}

export default FilterWithSearch
