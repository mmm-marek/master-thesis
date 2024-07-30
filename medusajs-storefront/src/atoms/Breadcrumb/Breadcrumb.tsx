import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps } from 'antd'

import * as SC from './BreadcrumbStyles'

const Breadcrumb = (props: BreadcrumbProps) => {
	return (
		<SC.Wrapper>
			<AntdBreadcrumb {...props} />
		</SC.Wrapper>
	)
}

export default Breadcrumb
