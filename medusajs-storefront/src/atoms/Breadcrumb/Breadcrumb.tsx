import { ChevronRight } from 'lucide-react'

import * as SC from './BreadcrumbStyles'
import { BreadcrumbProps } from './types'

const Breadcrumb = ({ items }: BreadcrumbProps) => {
	return (
		<SC.Breadcrumbs items={items}>
			{items.map((item, index) => (
				<SC.Breadcrumb key={item.title}>
					<SC.Link href={item.href}>{item.title}</SC.Link>
					{index < items.length - 1 && <ChevronRight size={16} />}
				</SC.Breadcrumb>
			))}
		</SC.Breadcrumbs>
	)
}

export default Breadcrumb
