import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import Image from 'next/image'

import Menu from '../Menu/Menu'
import Close from '@/assets/icons/close.svg'
import Hamburger from '@/assets/icons/hamburger.svg'
import LogoMark from '@/assets/icons/logomark.svg?url'
import Logout from '@/assets/icons/logout.svg'
import Avatar from '@/atoms/Avatar/Avatar'
import { PAGE_IDS } from '@/utils/enums'

import * as SC from './MobileMenuStyles'

type MobileMenuProps = {
	pageID: PAGE_IDS
	userName?: string | null
	items: ItemType<MenuItemType>[]
	visible: boolean
	collapsed: boolean
	onLogoutButtonClick: () => void
	onProfileButtonClick: () => void
	onTriggerButtonClick: () => void
}

const MobileMenu = ({ pageID, userName, items, onLogoutButtonClick, collapsed, visible, onProfileButtonClick, onTriggerButtonClick }: MobileMenuProps) => {
	return (
		<SC.Header $isVisible={visible} $collapsed={collapsed}>
			<SC.TriggerContainer $collapsed={collapsed}>
				<SC.LogoContainer>
					<SC.ImageContainer>
						<Image src={LogoMark} width={32} height={32} alt='GoodRequest logo' />
					</SC.ImageContainer>
					<SC.Logotype />
				</SC.LogoContainer>
				<SC.TriggerButton icon={collapsed ? <Hamburger /> : <Close />} onClick={onTriggerButtonClick} noBackground />
			</SC.TriggerContainer>

			{!collapsed && (
				<SC.MenuContainer>
					<SC.MenuWrapper>
						<Menu mode='vertical' items={items} selectedKeys={[pageID]} />
					</SC.MenuWrapper>
					<SC.ProfileWrapper>
						<SC.ProfileButton
							icon={<Avatar width={36} height={36} alt={userName || 'avatar'} src={null} />}
							noBackground
							size='large'
							onClick={onProfileButtonClick}
						>
							{userName}
						</SC.ProfileButton>
						<SC.LogoutButton icon={<Logout />} onClick={onLogoutButtonClick} noBackground size='large' />
					</SC.ProfileWrapper>
				</SC.MenuContainer>
			)}
		</SC.Header>
	)
}

export default MobileMenu
