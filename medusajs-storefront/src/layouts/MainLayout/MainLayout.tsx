import { Layout } from 'antd'
import { PropsWithChildren } from 'react'

import GrLogo from '@/assets/icons/gr-logo.svg'

import * as SC from './MainLayoutStyles'
import Categories from './components/Categories/Categories'
import Link from 'next/link'

const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<Layout>
			<SC.Header>
				<SC.CappedContainer>
					<Link href='/'>
						<GrLogo />
					</Link>
				</SC.CappedContainer>
			</SC.Header>
			<SC.Subheader>
				<SC.CappedContainer>
					<Categories />
				</SC.CappedContainer>
			</SC.Subheader>
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
