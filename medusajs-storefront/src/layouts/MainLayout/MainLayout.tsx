import { Layout } from 'antd'
import { PropsWithChildren } from 'react'

import GrLogo from '@/assets/icons/gr-logo.svg'

import * as SC from './MainLayoutStyles'

const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<Layout>
			<SC.Header>
				<SC.CappedContainer>
					<GrLogo />
				</SC.CappedContainer>
			</SC.Header>
			<SC.Content>
				<SC.CappedContainer>{children}</SC.CappedContainer>
			</SC.Content>
			<SC.Footer>
				<SC.CappedContainer>Footer</SC.CappedContainer>
			</SC.Footer>
		</Layout>
	)
}

export default MainLayout
