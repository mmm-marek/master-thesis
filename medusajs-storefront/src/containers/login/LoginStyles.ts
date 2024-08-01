import styled, { css } from 'styled-components'

export const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin: auto;
	padding-bottom: 48px;
	max-width: 440px;
`

export const Divider = styled.div`
	${({ theme }) => css`
		background-color: ${theme.tokens['color-base-surface-quaternary']};
		width: 100%;
		height: 1px;
	`}
`
