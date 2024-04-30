import Head from 'next/head'
import { PropsWithChildren } from 'react'

import { PAGE_TITLE } from '@/utils/helpers'

import * as SC from './LoginLayoutStyles'

const LoginLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Head>
				<title>{PAGE_TITLE()}</title>
			</Head>
			<SC.LoginLayoutWrapper>
				<SC.LoginLayoutPage>
					<SC.LoginLayoutPageWrapper>
						<SC.LoginLayoutPageContent>{children}</SC.LoginLayoutPageContent>
						<SC.LoginFooter>
							<SC.LoginCopy>©GoodRequest</SC.LoginCopy>
							<SC.LoginMail href='mailto:help@goodrequest.com'>help@goodrequest.com</SC.LoginMail>
						</SC.LoginFooter>
					</SC.LoginLayoutPageWrapper>
				</SC.LoginLayoutPage>
				<SC.LoginLayoutPlaceholder />
			</SC.LoginLayoutWrapper>
		</>
	)
}

export default LoginLayout
