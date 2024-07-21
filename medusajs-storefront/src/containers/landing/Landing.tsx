import Categories from './components/Categories/Categories'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Products from './components/Products/Products'

const Landing = () => {
	return (
		<div>
			<HeroBanner />
			<Products />
			<Categories />
		</div>
	)
}

export default Landing
