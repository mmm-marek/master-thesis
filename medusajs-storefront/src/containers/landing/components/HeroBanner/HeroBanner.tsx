import Button from '@/atoms/Button/Button'

import * as SC from './HeroBannerStyles'

const HeroBanner = () => {
	return (
		<SC.Container>
			<SC.TextWrapper>
				<SC.Title>SHOP COMPANY MERCH</SC.Title>
				<SC.Description>
					Wear your pride! Discover our collection of branded apparel and accessories, perfect for showing your support and spirit.
				</SC.Description>
				<Button size='extra-large' shape='round' type='primary'>
					Shop now
				</Button>
			</SC.TextWrapper>
			<SC.ImageStyled src='/images/landing-illustration.png' alt='landing' width={1180} height={904} />
		</SC.Container>
	)
}

export default HeroBanner
