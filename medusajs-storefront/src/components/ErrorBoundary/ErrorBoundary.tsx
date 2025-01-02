import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { ErrorInfo, useEffect, useState } from 'react'
import { ErrorBoundary as ReactErrorBoundary, ErrorBoundaryProps as ReactErrorBoundaryProps, useErrorBoundary } from 'react-error-boundary'

import Button from '@/atoms/Button/Button'
import { ERROR_BOUNDARY_TYPE } from '@/utils/enums'

import * as SC from './ErrorBoundaryStyles'

type FallbackProps = {
	title: string
	description: string
}

const Fallback = ({ title, description }: FallbackProps) => {
	const t = useTranslations('components.errorBoundary')
	// Find the closest ErrorBoundary
	const { resetBoundary } = useErrorBoundary()

	return (
		<SC.ErrorBoundaryWrapper>
			<SC.Content role='alert'>
				<SC.Title>{title}</SC.Title>
				<SC.Description>{description}</SC.Description>
				<Button onPress={resetBoundary} variant='primary'>
					{t('tryAgain')}
				</Button>
			</SC.Content>
		</SC.ErrorBoundaryWrapper>
	)
}

type ErrorBoundaryProps = Pick<ReactErrorBoundaryProps, 'onReset' | 'children' | 'onError' | 'resetKeys'> & {
	title?: string
	description?: string
	fallbackType?: ERROR_BOUNDARY_TYPE
}

/**
 * Wrapper for ErrorBoundary component from react-error-boundary package.
 * It provides a simple fallback UI in case of an error, which can either trigger a rerender of the subtree of the error boundary,
 * as well as a report dialog for the user to report the steps that lead to the error.
 */
const ErrorBoundary = ({ children, onReset, resetKeys, onError, title, description, fallbackType = ERROR_BOUNDARY_TYPE.RETRY }: ErrorBoundaryProps) => {
	const t = useTranslations('components.errorBoundary')
	const [eventId, setEventId] = useState<string | null>(null)
	const { locale } = useRouter()

	useEffect(() => {
		if (eventId && fallbackType === ERROR_BOUNDARY_TYPE.REPORT_DIALOG) {
			Sentry.showReportDialog({
				eventId, // : Sentry.captureException(error),
				successMessage: t('reportSent'),
				title: t('unexpectedErrorOccured'),
				subtitle: t('contactUs'),
				subtitle2: '',
				labelName: t('name'),
				labelComments: t('errorDescription'),
				labelClose: t('close'),
				labelSubmit: t('sendErrorReport'),
				lang: locale
			})
		}
	}, [eventId, fallbackType, t, locale])

	return (
		<ReactErrorBoundary
			fallbackRender={() =>
				fallbackType === ERROR_BOUNDARY_TYPE.RETRY ? (
					<Fallback title={title ?? t('somethingWentWrong')} description={description ?? t('tryAgain')} />
				) : null
			}
			onReset={onReset}
			resetKeys={resetKeys}
			onError={(error: Error, info: ErrorInfo) => {
				if (onError) {
					onError(error, info)
				}
				Sentry.withScope((scope: any) => {
					scope.setExtras(info)
					const eventID = Sentry.captureException(error)
					setEventId(eventID)
				})
			}}
		>
			{children}
		</ReactErrorBoundary>
	)
}

export default ErrorBoundary
