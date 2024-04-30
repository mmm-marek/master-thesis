import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Menu from '../Menu/Menu'
import Logo from '@/assets/icons/logo.svg'
import LogoMark from '@/assets/icons/logomark.svg?url'
import Logout from '@/assets/icons/logout.svg'
import Avatar from '@/atoms/Avatar/Avatar'
import { PAGE_IDS, PATHS } from '@/utils/enums'

import * as SC from './NavbarStyles'

type NavbarProps = {
	menuItems: ItemType<MenuItemType>[]
	pageID: PAGE_IDS
	collapsed: boolean
	onLogoutButtonClick: () => void
	userName?: string
	userAvatar?: string
}

const Navbar = ({ menuItems, pageID, collapsed, userName, userAvatar, onLogoutButtonClick }: NavbarProps) => {
	const router = useRouter()
	const t = useTranslations('layouts.mainLayout.navbar')

	const handleProfileButtonClick = () => {
		router.push(PATHS.PROFILE)
	}

	return (
		<SC.NavbarWrapper>
			<SC.ContentWrapper>
				<SC.LogoWrapper>
					<SC.LogoImageContainer>
						<Image src={LogoMark} width={42} height={42} alt='GoodRequest logo' />
					</SC.LogoImageContainer>
					<SC.LogotypeContainer $display={collapsed ? 'none' : 'block'}>
						<Logo />
					</SC.LogotypeContainer>
				</SC.LogoWrapper>
				<SC.MenuWrapper $collapsed={collapsed}>
					<Menu mode='vertical' items={menuItems} selectedKeys={[pageID]} />
				</SC.MenuWrapper>
			</SC.ContentWrapper>
			<SC.ProfileWrapper $collapsed={collapsed}>
				<SC.ProfileButton
					icon={<Avatar width={36} height={36} alt={userName || t('avatar') || ''} src={userAvatar} />}
					noBackground
					size='middle'
					onClick={handleProfileButtonClick}
					$collapsed={collapsed}
					block
				>
					{userName}
				</SC.ProfileButton>
				<SC.LogoutButton icon={<Logout />} onClick={onLogoutButtonClick} noBackground size='large' />
			</SC.ProfileWrapper>
		</SC.NavbarWrapper>
	)
}

export default Navbar
