import { Badge, Layout } from 'antd'
import { ShoppingCart } from 'lucide-react'
import { useCart } from 'medusa-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import GrLogo from '@/assets/icons/gr-logo.svg'
import { PATHS } from '@/utils/enums'

import * as SC from './MainLayoutStyles'
import Categories from './components/Categories/Categories'

const MainLayout = ({ children }: PropsWithChildren) => {
	const { cart } = useCart()

	return (
		<Layout>
			<SC.Header>
				<SC.CappedContainer>
					<SC.HeaderContent>
						<Link href='/'>
							<GrLogo />
						</Link>
						<Categories />
						<SC.CartLink href={`/${PATHS.CART}`}>
							<Badge count={cart?.items.length || 0} showZero={false}>
								<ShoppingCart color='white' />
							</Badge>
						</SC.CartLink>
					</SC.HeaderContent>
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
