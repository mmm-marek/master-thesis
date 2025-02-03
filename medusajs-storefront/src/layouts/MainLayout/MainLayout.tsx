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
	hasBreadcrumbs?: boolean
} & PropsWithChildren

const MainLayout = ({ children, hasBreadcrumbs }: MainLayoutProps) => {
	const theme = useTheme()
	const router = useRouter()
	const { cart } = useStore()
	const t = useTranslations('layouts.mainLayout')

	const { data: customer } = useCustomerProfile()
	const { mutate: logoutUser } = useLogoutCustomer()

	const handleLogout = () => {
		logoutUser(undefined, {
			onSuccess: () => {
				router.push(PATHS.HOME)
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
					<SC.Spacer>
						<SC.CappedContainer>
							<SC.Actions>
								{customer ? (
									<SC.ActionButton onClick={handleLogout} type='button'>
										{t('logout')}
									</SC.ActionButton>
								) : (
									<SC.ActionLink href={PATHS.SIGN_UP}>{t('joinUs')}</SC.ActionLink>
								)}
								<SC.ActionDivider />
								<RegionPicker />
							</SC.Actions>
						</SC.CappedContainer>
					</SC.Spacer>
				</SC.ActionsWrapper>
				<SC.Spacer>
					<SC.CappedContainer>
						<SC.HeaderContent>
							<SC.LogoLink href={PATHS.HOME}>
								<GrLogo />
							</SC.LogoLink>
							<SC.LinksWrapper>
								{customer ? (
									<Link href={PATHS.PROFILE}>
										<CircleUserRound color={theme.tokens['color-base-content-top']} />
									</Link>
								) : (
									<SC.SignInButton variant='primary' size='medium' onPress={handleSignInClick}>
										{t('signIn')}
									</SC.SignInButton>
								)}
								<Link href={PATHS.CART}>
									<SC.CartWrapper>
										<ShoppingCart color={theme.tokens['color-base-content-top']} />
										{cart?.items.length ? (
											<SC.CartBadge aria-label={`${cart.items.length} ${t('itemsInCart')}`}>{cart?.items.length}</SC.CartBadge>
										) : null}
									</SC.CartWrapper>
								</Link>
							</SC.LinksWrapper>
						</SC.HeaderContent>
					</SC.CappedContainer>
				</SC.Spacer>
			</SC.Header>
			<SC.Content $hasBreadcrumbs={hasBreadcrumbs}>
				<SC.CappedContainer>{children}</SC.CappedContainer>
			</SC.Content>
			<SC.Footer>
				<SC.CappedContainer>Footer</SC.CappedContainer>
			</SC.Footer>
		</SC.Layout>
	)
}

export default MainLayout
