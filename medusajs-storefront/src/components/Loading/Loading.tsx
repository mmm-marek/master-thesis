import Spinner from '@/atoms/Spinner/Spinner'

import * as SC from './LoadingStyles'

type LoadingProps = {
	height?: string
}

const Loading = ({ height = '500px' }: LoadingProps) => {
	return (
		<SC.LoadingContainer $height={height}>
			<Spinner />
		</SC.LoadingContainer>
	)
}

export default Loading
