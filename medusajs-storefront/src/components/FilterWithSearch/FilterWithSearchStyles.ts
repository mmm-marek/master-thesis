import { SearchOutlined } from '@ant-design/icons'
import { Form as AntdForm } from 'antd'
import styled from 'styled-components'

import Button from '@/atoms/Button/Button'
import { breakpoints } from '@/styles/helpers'

export const Form = styled(AntdForm)`
	width: 100%;
`

export const SearchButtonWrapper = styled.div`
	flex-shrink: 0;
	margin-left: auto;
`

export const SearchButton = styled(Button)`
	&.ant-btn.ant-btn-default {
		width: 36px !important;
		height: 36px !important;
	}
`

export const SearchIcon = styled(SearchOutlined)`
	width: 24px;
	height: 24px;
`

export const FiltersWrapper = styled.div`
	display: flex;
	flex-direction: column-reverse;
	gap: ${({ theme }) => theme.spacing[8]};

	@media (min-width: ${breakpoints.md}px) {
		flex-direction: row;
		gap: ${({ theme }) => theme.spacing[16]};
		align-items: center;
	}
`

export const SearchInputContainer = styled.div`
	margin-left: auto;
	width: 100%;

	@media (min-width: ${breakpoints.md}px) {
		width: 40%;
	}
`
