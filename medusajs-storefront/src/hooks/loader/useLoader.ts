import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'

NProgress.configure({ showSpinner: false })

export const useLoader = () => {
	const [isRouting, setIsRouting] = useState(false)
	const router = useRouter()

	useEffect(() => {
		router.events.on('routeChangeStart', (_url: string, { shallow }: { shallow: boolean }) => {
			if (shallow) {
				return
			}
			setIsRouting(true)
			NProgress.start()
		})
		router.events.on('routeChangeComplete', () => {
			setIsRouting(false)
			NProgress.done()
		})
		router.events.on('routeChangeError', () => {
			setIsRouting(false)
			NProgress.done()
		})
	}, [router])

	return { isRouting }
}
