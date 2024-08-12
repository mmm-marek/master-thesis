import styled, { css } from 'styled-components'

export const CardElementWrapper = styled.div`
	${({ theme }) => css`
		border-radius: 16px;
		background: ${theme.tokens['color-base-surface-secondary']};
		padding: 16px;
	`}
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const ButtonWrapper = styled.div`
	margin-left: auto;
	width: fit-content;
`
