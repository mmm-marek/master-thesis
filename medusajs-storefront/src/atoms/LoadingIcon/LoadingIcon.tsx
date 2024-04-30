import * as SC from './LoadingIconStyles'

const LoadingIcon = () => {
	return (
		<SC.Svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect x='8.85417' y='0.833496' width='2.29167' height='4.58333' rx='1.14583' fill='currentColor' />
			<rect x='15.6721' y='2.70801' width='2.29167' height='4.58333' rx='1.14583' transform='rotate(45 15.6721 2.70801)' fill='currentColor' />
			<rect x='19.1667' y='8.85449' width='2.29167' height='4.58333' rx='1.14583' transform='rotate(90 19.1667 8.85449)' fill='currentColor' />
			<rect
				width='2.29167'
				height='4.58333'
				rx='1.14583'
				transform='matrix(0.707107 -0.707107 -0.707107 -0.707107 15.6721 17.2915)'
				fill='currentColor'
			/>
			<rect x='8.85417' y='14.5835' width='2.29167' height='4.58333' rx='1.14583' fill='currentColor' />
			<rect x='5.9493' y='12.4307' width='2.29167' height='4.58333' rx='1.14583' transform='rotate(45 5.9493 12.4307)' fill='currentColor' />
			<rect x='5.41667' y='8.85449' width='2.29167' height='4.58333' rx='1.14583' transform='rotate(90 5.41667 8.85449)' fill='currentColor' />
			<rect width='2.29167' height='4.58333' rx='1.14583' transform='matrix(0.707107 -0.707107 -0.707107 -0.707107 5.9493 7.56885)' fill='currentColor' />
		</SC.Svg>
	)
}

export default LoadingIcon
