import styled, { css } from 'styled-components'

import { breakpoints, headingXsSemibold, textMdRegular, textSmRegular } from '@/styles/helpers'

export const Title = styled.h2`
	${({ theme }) => css`
		${headingXsSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const ReviewsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const Review = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: 4px;
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		padding-bottom: 16px;

		& .ant-rate {
			color: ${theme.tokens['color-base-action-primary-default']};
		}
	`}
`

export const ReviewTitle = styled.p`
	${({ theme }) => css`
		${textMdRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Content = styled.p`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const Reviewer = styled.p`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const NoReviews = styled.p`
	${({ theme }) => css`
		width: 100%;
		text-align: center;
		${textMdRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const ReviewFormWrapper = styled.div`
	width: 100%;

	@media (min-width: ${breakpoints.md}px) {
		display: flex;
		justify-content: center;
		margin: auto;
		width: 50%;
	}
`
