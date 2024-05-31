import { Badge, Layout } from 'antd'
import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { useCart, useMeCustomer } from 'medusa-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { useTheme } from 'styled-components'

import GrLogo from '@/assets/icons/gr-logo.svg'
import { PATHS } from '@/utils/enums'

import * as SC from './MainLayoutStyles'
import Categories from './components/Categories/Categories'

const MainLayout = ({ children }: PropsWithChildren) => {
	const { cart } = useCart()
	const theme = useTheme()

	const { customer } = useMeCustomer()

	return (
		<Layout>
			<SC.Header>
				<SC.CappedContainer>
					<SC.HeaderContent>
						<SC.LogoLink href='/'>
							<GrLogo />
						</SC.LogoLink>
						<Categories />
						<SC.LinksWrapper>
							<Link href={`/${PATHS.CART}`}>
								<Badge count={cart?.items.length || 0} showZero={false}>
									<ShoppingCart color={theme.tokens['color-base-content-top']} />
								</Badge>
							</Link>
							<Link href={customer ? `/${PATHS.PROFILE}` : `/${PATHS.LOGIN}`}>
								<CircleUserRound color={theme.tokens['color-base-content-top']} />
							</Link>
						</SC.LinksWrapper>
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
