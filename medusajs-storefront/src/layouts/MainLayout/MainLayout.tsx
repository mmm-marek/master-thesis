import { Badge } from 'antd'
import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { useCart } from 'medusa-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { useTheme } from 'styled-components'

import GrLogo from '@/assets/icons/gr-logo.svg'
import useCustomerProfile from '@/hooks/auth/useCustomerProfile'
import useLogoutCustomer from '@/hooks/auth/useLogoutCustomer'
import { PATHS } from '@/utils/enums'

import * as SC from './MainLayoutStyles'
import Categories from './components/Categories/Categories'

const MainLayout = ({ children }: PropsWithChildren) => {
	const router = useRouter()
	const { cart } = useCart()
	const theme = useTheme()

	const { data: customer } = useCustomerProfile()
	const { mutate: logoutUser } = useLogoutCustomer()

	const handleLogout = () => {
		logoutUser(undefined, {
			onSuccess: () => {
				router.push('/')
			}
		})
	}

	return (
		<SC.Layout>
			<SC.Header>
				<SC.ActionsWrapper>
					<SC.CappedContainer>
						<SC.Actions>
							{customer ? (
								<SC.ActionButton onClick={handleLogout} type='button'>
									Logout
								</SC.ActionButton>
							) : (
								<>
									<SC.ActionLink href={`/${PATHS.SIGN_UP}`}>Join us</SC.ActionLink>
									<SC.ActionDivider />
									<SC.ActionLink href={`/${PATHS.LOGIN}`}>Sign in</SC.ActionLink>
								</>
							)}
						</SC.Actions>
					</SC.CappedContainer>
				</SC.ActionsWrapper>
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
							{customer && (
								<Link href={`/${PATHS.PROFILE}`}>
									<CircleUserRound color={theme.tokens['color-base-content-top']} />
								</Link>
							)}
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
		</SC.Layout>
	)
}

export default MainLayout
