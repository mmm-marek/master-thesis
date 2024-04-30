import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

import Error from '@/components/Error/Error'
import ErrorObserver from '@/components/ErrorObserver/ErrorObserver'
import Loading from '@/components/Loading/Loading'
import { QUERY_KEYS } from '@/utils/enums'

import * as SC from './ErrorObserverExampleStyles'

const useGetHoundImages = (limit: number, shouldError: boolean) => {
	return useQuery({
		queryKey: [QUERY_KEYS.HOUND_OBSERVER_EXAMPLE, limit, shouldError],
		queryFn: async () => {
			const reqUrl = shouldError ? `https://dog.ceo/api/breed/error/images/random/${limit}` : `https://dog.ceo/api/breed/hound/images/random/${limit}`
			const response = await axios.get(reqUrl)
			return response.data.message
		}
	})
}

const useGetBoxerImages = (limit: number, shouldError: boolean) => {
	return useQuery({
		queryKey: [QUERY_KEYS.BOXER_OBSERVER_EXAMPLE, limit, shouldError],
		queryFn: async () => {
			const reqUrl = shouldError ? `https://dog.ceo/api/breed/error/images/random/${limit}` : `https://dog.ceo/api/breed/boxer/images/random/${limit}`
			const response = await axios.get(reqUrl)
			return response.data.message
		}
	})
}

const HoundImages = () => {
	const [shouldError, setShouldError] = useState(false)
	// NOTE: Try setting the shouldError value to true.
	const { data, isLoading, isError } = useGetHoundImages(3, shouldError)
	if (isLoading) return <Loading />
	if (isError) return <Error onTryAgain={() => setShouldError(false)} />
	return (
		<div>
			<SC.Subtitle>Hounds</SC.Subtitle>
			<div>
				{data.map((url: string) => (
					<SC.DogImage src={url} alt='hound' key={url} />
				))}
			</div>
		</div>
	)
}

const BoxerImages = () => {
	const [shouldError, setShouldError] = useState(true)
	// NOTE: Try setting the shouldError value to true.
	const { data, isLoading, isError } = useGetBoxerImages(3, shouldError)
	if (isLoading) return <Loading />
	if (isError) return <Error onTryAgain={() => setShouldError(false)} />
	return (
		<div>
			<SC.Subtitle>Boxers</SC.Subtitle>
			<div>
				{data.map((url: string) => (
					<SC.DogImage src={url} alt='boxer' key={url} />
				))}
			</div>
		</div>
	)
}

/**
 * This page is used to showcase the functionality of ErrorObserver component.
 * In this example, the HoundImages and BoxerImages components are wrapped inside the ErrorObserver component.
 * If an error occurs in both of the components, the ErrorObserver will catch it and display a fallback Error component.
 * If only one fails, the error is handled by the component itself.
 *
 * Try to set the shouldError attribute to true in one (or both) of the useGetHoundImages or useGetBoxerImages hooks to see the ErrorObserver in action.
 */
const ErrorObserverExample = () => {
	return (
		<ErrorObserver queryKeys={[QUERY_KEYS.HOUND_OBSERVER_EXAMPLE, QUERY_KEYS.BOXER_OBSERVER_EXAMPLE]}>
			<SC.ContentWrapper>
				<SC.Title>Example of ErrorObserver</SC.Title>
				<SC.DogsContainer>
					<HoundImages />
					<BoxerImages />
				</SC.DogsContainer>
			</SC.ContentWrapper>
		</ErrorObserver>
	)
}

export default ErrorObserverExample
