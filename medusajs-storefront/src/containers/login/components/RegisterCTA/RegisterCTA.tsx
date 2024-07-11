import { useRouter } from 'next/router'

import Button from '@/atoms/Button/Button'
import { PATHS } from '@/utils/enums'

import * as SC from './RegisterCTAStyles'

const RegisterCTA = () => {
	const router = useRouter()

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
			<Button type='primary' size='large' onClick={() => router.push(PATHS.SIGN_UP)}>
				Register
			</Button>
		</SC.RegisterCTAWrapper>
	)
}

export default RegisterCTA
