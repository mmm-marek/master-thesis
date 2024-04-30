import { Row as AntdRow } from 'antd'
import styled from 'styled-components'

import { breakpoints } from '@/styles/helpers'

export const Row = styled(AntdRow)`
	&.ant-row {
		gap: ${({ theme }) => theme.spacing[8]};

		@media (min-width: ${breakpoints.md}px) {
			gap: ${({ theme }) => theme.spacing[16]};
		}
	}
`
