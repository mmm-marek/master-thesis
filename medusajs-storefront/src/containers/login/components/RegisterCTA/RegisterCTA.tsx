import Button from '@/atoms/Button/Button'

import * as SC from './RegisterCTAStyles'

const RegisterCTA = () => {
	return (
		<SC.RegisterCTAWrapper>
			<SC.HeaderWrapper>
				<SC.RegisterCTAHeader>Don`t have an account?</SC.RegisterCTAHeader>
				<SC.RegisterCTAParagraph>Registration will give you access to:</SC.RegisterCTAParagraph>
			</SC.HeaderWrapper>
			<SC.RegisterList>
				<SC.RegisterListItem>
					<SC.Bullet />
					<div>Access the history of your orders</div>
				</SC.RegisterListItem>
				<SC.RegisterListItem>
					<SC.Bullet />
					<div>Obtain a discount on your next purchase</div>
				</SC.RegisterListItem>
				<SC.RegisterListItem>
					<SC.Bullet />
					<div>Quick process of your order</div>
				</SC.RegisterListItem>
			</SC.RegisterList>
			<Button type='primary' size='large'>
				Register
			</Button>
		</SC.RegisterCTAWrapper>
	)
}

export default RegisterCTA
