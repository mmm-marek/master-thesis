import { Col } from 'antd'
import { debounce } from 'lodash'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo } from 'react'
import { WatchObserver, useForm } from 'react-hook-form'

import FilterSelectField from '@/atoms/FilterSelectField/FilterSelectField'
import { optionRenderTag } from '@/atoms/OptionRender/OptionRender'
import FilterWithSearch from '@/components/FilterWithSearch/FilterWithSearch'
import HookFormField from '@/components/HookFormField'
import { SelectOptionWithTag } from '@/types/interfaces'
import { FILTER_CHANGE_DEBOUNCE_TIME } from '@/utils/enums'
import { USER_PERMISSIONS_OPTIONS, USER_STATES_OPTIONS } from '@/utils/helpers'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './UsersFilterStyles'
import { UsersFilterFields, UsersQueryParams } from './types'
import UsersFilterSchema from './usersFilterSchema'

type Props = {
	query: UsersQueryParams
	onChangeFilter: (values: UsersFilterFields) => void
	onClearSearch: () => void
}

const UsersFilter = (props: Props) => {
	const { onChangeFilter, query, onClearSearch } = props
	const t = useTranslations('containers.users.usersFilter')

	const { control, watch, setFocus, setValue, reset } = useForm<UsersFilterFields>({
		mode: 'onChange',
		resolver: zodResolver(UsersFilterSchema),
		defaultValues: {
			permission: undefined,
			state: undefined,
			search: query.search || ''
		}
	})

	useEffect(() => {
		// initialize form values from URL query params on page init
		reset({ permission: query.permission, state: query.state, search: query.search })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const debounceChangeFilter = useMemo(() => {
		return debounce<WatchObserver<UsersFilterFields>>((data, info) => {
			if (info.type === 'change') {
				onChangeFilter(data as UsersFilterFields)
			}
		}, FILTER_CHANGE_DEBOUNCE_TIME)
	}, [onChangeFilter])

	watch((data, info) => {
		debounceChangeFilter(data, info)
	})

	const handleClearSearch = () => {
		setValue('search', '')
		onClearSearch()
	}

	return (
		<FilterWithSearch setFocus={setFocus} control={control} onClearSearch={handleClearSearch} placeholder={t('search')}>
			<SC.Row wrap>
				<Col>
					<HookFormField
						control={control}
						name='permission'
						component={FilterSelectField}
						label={t('role')}
						options={USER_PERMISSIONS_OPTIONS()}
						allowClear
						showSearch
					/>
				</Col>
				<Col>
					<HookFormField
						control={control}
						name='state'
						component={FilterSelectField<UsersFilterFields['state'], SelectOptionWithTag>}
						label={t('state')}
						options={USER_STATES_OPTIONS()}
						optionRender={optionRenderTag}
						allowClear
					/>
				</Col>
			</SC.Row>
		</FilterWithSearch>
	)
}

export default UsersFilter
