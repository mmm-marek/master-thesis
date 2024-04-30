import { Badge as AntdBadge } from 'antd'
import styled, { css } from 'styled-components'

export const Avatar = styled.img<{ $isCircle?: boolean }>`
	flex-shrink: 0;
	width: ${(p) => p.width}px;
	height: ${(p) => p.height}px;
	object-fit: cover;

	${(p) =>
		p.$isCircle &&
		css`
			border-radius: ${p.theme.borderRadius.circle};
			overflow: hidden;
		`}
`

export const Badge = styled(AntdBadge)`
	&.ant-badge {
		svg {
			top: auto;
			right: -2px;
			bottom: -2px;
			transform: none;
			width: 10px;
			height: 10px;
		}
	}
`
