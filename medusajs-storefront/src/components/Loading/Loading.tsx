import { Spin } from 'antd'

import * as SC from './LoadingStyles'

type LoadingProps = {
	height?: string
}

const Loading = ({ height = '500px' }: LoadingProps) => {
	return (
		<SC.LoadingContainer $height={height}>
			<Spin spinning size='large' />
		</SC.LoadingContainer>
	)
}

export default Loading
