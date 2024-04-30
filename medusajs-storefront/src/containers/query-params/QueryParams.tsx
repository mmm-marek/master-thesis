import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import Error from '@/components/Error/Error'
import { useParseQuery } from '@/hooks/useQueryParser'
import { schema } from '@/schemas/pages/queryParams'

const QueryParams = () => {
	const t = useTranslations('containers.queryParams')
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const [query, setQueryParams, hasParseError] = useParseQuery(schema, false)

	if (hasParseError) {
		return <Error title={t('error.title')} description={t('error.description')} onTryAgain={() => setQueryParams({ ...query, score: 12345 })} />
	}

	return (
		<>
			<h1>{t('title')}</h1>
			<p>{t('note')}</p>
			<button
				type='button'
				style={{ cursor: 'pointer', marginBottom: '16px' }}
				onClick={() => setQueryParams(JSON.parse(inputRef.current?.value || '{}'))}
			>
				{t('buttonLabel')}
			</button>
			<textarea ref={inputRef} rows={20} style={{ width: '100%' }} defaultValue={JSON.stringify(query, null, 2)} />
		</>
	)
}

export default QueryParams
