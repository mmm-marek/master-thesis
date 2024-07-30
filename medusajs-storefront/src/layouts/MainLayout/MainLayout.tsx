import { Badge } from 'antd'
import { CircleUserRound, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'
import { useTheme } from 'styled-components'

import GrLogo from '@/assets/icons/gr-logo.svg'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import useLogoutCustomer from '@/hooks/customer/useLogoutCustomer'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './MainLayoutStyles'
import RegionPicker from './components/RegionPicker/RegionPicker'

type MainLayoutProps = {
	verticalPadding?: boolean
} & PropsWithChildren

const MainLayout = ({ children, verticalPadding }: MainLayoutProps) => {
	const theme = useTheme()
	const router = useRouter()
	const { cart } = useStore()
	const t = useTranslations('layouts.mainLayout')

	const { data: customer } = useCustomerProfile()
	const { mutate: logoutUser } = useLogoutCustomer()

	const handleLogout = () => {
		logoutUser(undefined, {
			onSuccess: () => {
				router.push('/')
			}
		})
	}

	const handleSignInClick = () => {
		router.push(PATHS.LOGIN)
	}

	return (
		<SC.Layout>
			<SC.Header>
				<SC.ActionsWrapper>
					<SC.CappedContainer>
						<SC.Actions>
							{customer ? (
								<SC.ActionButton onClick={handleLogout} type='button'>
									{t('logout')}
								</SC.ActionButton>
							) : (
								<>
									<SC.ActionLink href={PATHS.SIGN_UP}>{t('joinUs')}</SC.ActionLink>
									<SC.ActionDivider />
									<RegionPicker />
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
						<SC.LinksWrapper>
							{customer ? (
								<Link href={PATHS.PROFILE}>
									<CircleUserRound color={theme.tokens['color-base-content-top']} />
								</Link>
							) : (
								<SC.SignInButton type='primary' size='middle' shape='round' onClick={handleSignInClick}>
									{t('signIn')}
								</SC.SignInButton>
							)}
							<Link href={PATHS.CART}>
								<Badge count={cart?.items.length || 0} showZero={false}>
									<ShoppingCart color={theme.tokens['color-base-content-top']} />
								</Badge>
							</Link>
						</SC.LinksWrapper>
					</SC.HeaderContent>
				</SC.CappedContainer>
			</SC.Header>
			<SC.Content $verticalPadding={verticalPadding}>
				<SC.CappedContainer>{children}</SC.CappedContainer>
			</SC.Content>
			<SC.Footer>
				<SC.CappedContainer>Footer</SC.CappedContainer>
			</SC.Footer>
		</SC.Layout>
	)
}

export default MainLayout
