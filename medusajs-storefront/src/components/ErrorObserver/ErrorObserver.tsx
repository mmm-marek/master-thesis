import { useQueryClient } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'

import Error from '../Error/Error'
import { QUERY_KEYS } from '@/utils/enums'

import * as SC from './ErrorObserverStyles'

type ErrorObserverProps = {
	queryKeys: QUERY_KEYS[]
	onTryAgain?: (args?: any) => void
} & PropsWithChildren

/**
 * The ErrorObserver is a React component that monitors a list of queries (provided via queryKeys prop) for errors using the tanstack-query library.
 * It maintains a set of errored query keys. If all observed queries error, it renders an Error component; otherwise, it renders its children.
 */
const ErrorObserver = ({ queryKeys, children, onTryAgain }: ErrorObserverProps) => {
	const queryClient = useQueryClient()
	const [erroredQueryKeys, setErroredQueryKeys] = useState<Set<QUERY_KEYS>>(new Set())

	useEffect(() => {
		const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
			const observedQueryKey: QUERY_KEYS | undefined = event.query.queryKey.find(
				(queryKeyPart: unknown) => typeof queryKeyPart === 'string' && queryKeys.includes(queryKeyPart as QUERY_KEYS)
			)

			if (!observedQueryKey) return

			if (event.query.state.status === 'error') {
				setErroredQueryKeys((prev) => new Set([...Array.from(prev), observedQueryKey]))
			}

			if (event.query.state.status === 'success') {
				setErroredQueryKeys((prev) => {
					const newErroredQueryKeys = new Set(prev)
					newErroredQueryKeys.delete(observedQueryKey)
					return newErroredQueryKeys
				})
			}
		})
		return () => unsubscribe()
	}, [queryClient, queryKeys])

	return erroredQueryKeys.size === queryKeys.length ? (
		<>
			<Error onTryAgain={onTryAgain} />
			{/*
			In order to keep the errored queries in use so we can refetch them, we cannot simply unmount the children.
			Instead, we hide them from the DOM.
			*/}
			<SC.InvisibleContent>{children}</SC.InvisibleContent>
		</>
	) : (
		children
	)
}

export default ErrorObserver
