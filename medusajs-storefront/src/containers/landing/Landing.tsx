import * as SC from './LandingStyles'
import Categories from './components/Categories/Categories'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import HeroBanner from './components/HeroBanner/HeroBanner'

const Landing = () => {
	return (
		<SC.Container>
			<HeroBanner />
			<FeaturedProducts />
			<Categories />
		</SC.Container>
	)
}

export default Landing
