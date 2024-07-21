import * as SC from './LandingStyles'
import Categories from './components/Categories/Categories'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Products from './components/Products/Products'

const Landing = () => {
	return (
		<SC.Container>
			<HeroBanner />
			<Products />
			<Categories />
		</SC.Container>
	)
}

export default Landing
