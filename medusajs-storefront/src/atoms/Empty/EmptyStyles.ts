import { Empty as AntdEmpty } from 'antd'
import styled from 'styled-components'

import { textLgSemibold } from '@/styles/helpers'

export const Empty = styled(AntdEmpty)`
	.ant-empty-image {
		margin-bottom: ${({ theme }) => theme.spacing[16]};
		height: 128px;
	}

	.ant-empty-description {
		${textLgSemibold};
		color: ${({ theme }) => theme.tokens['color-base-content-primary']};
	}
`
