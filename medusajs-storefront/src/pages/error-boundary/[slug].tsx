import { GetStaticPropsContext } from 'next/types'
import { ReactElement } from 'react'

const throwErr = (code: number) => {
	throw new Error(`code ${code}`)
}

// Use this slug to trigger error
// - test404: fetch 404 error
// - test404r: fetch 404 error with redirect
// - test500: internal server error
// - test503: server render error

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	if (params?.slug === 'test500') {
		// XXX: Trigger internal server error
		throwErr(500)
	}
	try {
		if (params?.slug === 'test404') {
			// XXX: Trigger fetch 404 error
			throw new Error('404')
		}
		if (params?.slug === 'test404r') {
			// XXX: Trigger fetch 404 error with redirect
			return {
				redirect: {
					destination: '/404'
				}
			}
		}
		return {
			props: {
				slug: params?.slug as string
			},
			revalidate: 1800
		}
	} catch (e) {
		return {
			notFound: true
		}
	}
}

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

const SlugPage = ({ slug }: { slug: string }) => {
	if (slug === 'test503') {
		// XXX: Trigger server render error
		return (
			<div>
				<h1>{slug}</h1>
				{throwErr(503)}
			</div>
		)
	}
	return <h1>{slug}</h1>
}

SlugPage.getLayout = function getLayout(page: ReactElement) {
	return page
}

export default SlugPage
