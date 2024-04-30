import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

const STOP_NEXT_NAVIGATION_ERROR_MESSAGE = 'Nextjs routeChange aborted'

/**
 * Hook to prompt the user when they attempt to navigate away from the current page.
 *
 * @param {boolean} enabled - If true, the leave prompt will be enabled.
 * @returns {void}
 *
 * @example
 * useLeavePrompt(true);
 *
 * @example
 * // usage with useForm
 * const {
 *  formState: { isDirty },
 *  // ...
 * } = useForm({
 *  // ...
 * })
 * useLeavePrompt(isDirty);
 *
 * @note This hook is inspired by https://github.com/vercel/next.js/discussions/9662
 */
export const useLeavePrompt = (enabled: boolean) => {
	const router = useRouter()
	const t = useTranslations()

	/* NOTE: 
    The ref is a fix for a situation when leave prompt is shown multiple times due to 
    useParseQuery hook. The following situation can happen; user tries to leave the page, 
    the prompt is shown and the user confirms it, Next.js changes the path BUT the component 
    that uses this hook seems to be STILL MOUNTED, useParseQuery is triggered on a new page,  
    it changes the url (for example it adds default query parameters) and prompt is shown AGAIN. */
	const confirmedRef = useRef<boolean>()

	useEffect(() => {
		// NOTE: there is no way to customize default message on BeforeUnloadEvent, see: https://stackoverflow.com/a/38880926
		const handleWindowClose = (e: BeforeUnloadEvent) => {
			if (!enabled) return

			e.preventDefault()
			// included for legacy support, e.g. Chrome/Edge < 119, see: https://developer.mozilla.org/en-US/docs/Web/API/BeforeUnloadEvent#examples
			e.returnValue = true
		}

		const handleBrowseAway = () => {
			if (!enabled || confirmedRef.current) return

			// eslint-disable-next-line no-alert
			if (window.confirm(t('hooks.useLeavePrompt.confirmationMessage'))) {
				confirmedRef.current = true
				return
			}

			router.events.emit('routeChangeError')
			throw new Error(STOP_NEXT_NAVIGATION_ERROR_MESSAGE)
		}

		// NOTE: "handling" of our error that cancels navigation (so it's not tracked by Sentry)
		const handleError = (event: PromiseRejectionEvent) => {
			if (event.reason.message === STOP_NEXT_NAVIGATION_ERROR_MESSAGE) {
				// eslint-disable-next-line no-console
				console.info('Info:', event.reason.message)
				event.preventDefault()
			}
		}

		// cancelling navigation
		window.addEventListener('beforeunload', handleWindowClose)
		router.events.on('routeChangeStart', handleBrowseAway)

		// handling error
		window.addEventListener('unhandledrejection', handleError)

		return () => {
			confirmedRef.current = false

			window.removeEventListener('beforeunload', handleWindowClose)
			router.events.off('routeChangeStart', handleBrowseAway)

			window.removeEventListener('unhandledrejection', handleError)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enabled])
}
