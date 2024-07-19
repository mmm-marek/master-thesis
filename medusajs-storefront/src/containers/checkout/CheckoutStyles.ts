import styled, { css } from 'styled-components'

export const Container = styled.div`
	${({ theme }) => css`
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: ${theme.spacing[16]};
	`}
`
