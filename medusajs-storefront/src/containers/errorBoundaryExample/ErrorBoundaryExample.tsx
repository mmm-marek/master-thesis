import { useState } from 'react'

import Button from '@/atoms/Button/Button'

import * as SC from './ErrorBoundaryExampleStyles'

const ErrorComponent = () => {
	throw new Error('ErrorComponent')
	return <div>ErrorComponent</div>
}

const ErrorBoundaryExample = () => {
	const [showErrorComponent, setShowErrorComponent] = useState(false)

	return (
		<SC.ErrorBoundaryExampleContainer>
			<SC.Title>Error Boundary Example</SC.Title>
			<div>
				<Button type='primary' onClick={() => setShowErrorComponent((prevShowError) => !prevShowError)}>
					Trigger Error
				</Button>
				{showErrorComponent && <ErrorComponent />}
			</div>
		</SC.ErrorBoundaryExampleContainer>
	)
}

export default ErrorBoundaryExample
