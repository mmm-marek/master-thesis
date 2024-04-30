import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { debounce } from 'lodash'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import Home from '../../assets/icons/home.svg'
import Users from '../../assets/icons/users.svg'
import Button from '@/atoms/Button/Button'
import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import useLogout from '@/hooks/auth/useLogout'
import useGetAuthUser from '@/hooks/user/useGetAuthUser'
import { getAuthUserId } from '@/utils/auth'
import { PAGE_IDS, PATHS, SCROLL_DEBOUNCE_TIME, USER_ROLE } from '@/utils/enums'
import { PAGE_TITLE, getUserName } from '@/utils/helpers'

import * as SC from './MainLayoutStyles'
import MobileMenu from './components/MobileMenu/MobileMenu'
import Navbar from './components/Navbar/Navbar'

type MainLayoutProps = {
	pageID: PAGE_IDS
} & PropsWithChildren

const MainLayout = ({ pageID, children }: MainLayoutProps) => {
	const t = useTranslations('layouts.mainLayout')
	const router = useRouter()
	const { mutate: logout } = useLogout()
	const [collapsed, setCollapsed] = useState(false)

	const { data, isLoading, isError } = useGetAuthUser(getAuthUserId())

	const [showHeader, setShowHeader] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)

	const controlMenu = () => {
		if (window.scrollY > lastScrollY && window.scrollY > 100) {
			setShowHeader(false)
		} else {
			setShowHeader(true)
		}
		setLastScrollY(window.scrollY)
	}

	const debouncedControlMenu = debounce(controlMenu, SCROLL_DEBOUNCE_TIME)

	useEffect(() => {
		window.addEventListener('scroll', debouncedControlMenu)

		return () => {
			window.removeEventListener('scroll', debouncedControlMenu)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastScrollY])

	const handleProfileButtonClick = () => {
		setCollapsed(true)
		router.push(PATHS.PROFILE)
	}

	const collapseAfterClick = (collapse: boolean) => {
		if (collapse) {
			setCollapsed(true)
		}
	}

	const getMenuItems = useCallback(
		(shouldCollapseAfterClick: boolean, userRole?: USER_ROLE) => {
			return [
				{
					// Both roles will have a different container displayed when navigating to this page
					permissions: [USER_ROLE.ADMINISTRATOR, USER_ROLE.USER],
					key: PAGE_IDS.DASHBOARD,
					label: t('dashboard'),
					icon: <Home />,
					onClick: () => {
						router.push('/')
						collapseAfterClick(shouldCollapseAfterClick)
					}
				},
				{
					permissions: [USER_ROLE.ADMINISTRATOR],
					key: PAGE_IDS.USERS,
					label: t('users'),
					icon: <Users />,
					onClick: () => {
						router.push(PATHS.USERS)
						collapseAfterClick(shouldCollapseAfterClick)
					}
				}
			].reduce((menuItems, item) => {
				// show only items that current user has permission to see
				// filter permissions attribute from menuItems, otherwise they are visible in DOM
				if (userRole && item.permissions.includes(userRole)) {
					const menuItem: MenuItemType = {
						key: item.key,
						label: item.label,
						icon: item.icon,
						onClick: item.onClick
					}
					return [...menuItems, menuItem]
				}
				return menuItems
			}, [] as MenuItemType[])
		},
		[router, t]
	)

	if (isLoading) {
		return <Loading height='100vh' />
	}

	if (isError) {
		return <Error height='100vh' />
	}

	return (
		<>
			<Head>
				<title>{PAGE_TITLE()}</title>
			</Head>
			<SC.Layout>
				<MobileMenu
					onTriggerButtonClick={() => setCollapsed((prev) => !prev)}
					visible={showHeader}
					collapsed={collapsed}
					items={getMenuItems(true, data?.user?.permission as USER_ROLE)}
					onLogoutButtonClick={logout}
					onProfileButtonClick={handleProfileButtonClick}
					pageID={pageID}
					userName={getUserName(data?.user)}
				/>
				<SC.Sider collapsible trigger={null} width={260} breakpoint='lg' collapsed={collapsed} onBreakpoint={(broken) => setCollapsed(broken)}>
					<Navbar
						menuItems={getMenuItems(false, data?.user?.permission as USER_ROLE)}
						pageID={pageID}
						collapsed={collapsed}
						onLogoutButtonClick={logout}
						userName={getUserName(data?.user)}
					/>
					<SC.CollapseButtonWrapper>
						<Button
							type='default'
							size='small'
							icon={<SC.ChevronIcon $collapsed={collapsed} />}
							onClick={() => setCollapsed((prev) => !prev)}
							shape='circle'
						/>
					</SC.CollapseButtonWrapper>
				</SC.Sider>
				<SC.Content $collapsed={collapsed}>{children}</SC.Content>
			</SC.Layout>
		</>
	)
}

export default MainLayout
