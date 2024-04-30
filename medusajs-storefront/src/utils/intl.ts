import { TranslationValues, createTranslator } from 'next-intl'

type Translator = ReturnType<typeof createTranslator<never>> // NOTE: never is important for getting proper type for MessageKey
export type MessageKey = Parameters<Translator>[0]

/**
 * `IntlTranslator` is a wrapper around next-intl's `createTranslator` function.
 * It is used when we need to use translations outside of React
 * components, for example `helpers.ts`, `getServerSideProps` function, etc.
 *
 * However, there is one important distinction between using it on the client
 * and server side. On the client side, the `IntlTranslator` is initialized in
 * the `AppInit.tsx` file in the `useEffect` hook. This means that the translations
 * can be used via the `IntlTranslator.t` function after the `AppInit` component
 * is mounted.
 *
 * On the server side, however, we need to initialize the `IntlTranslator` before
 * we can use it. For example, in the API route handler:
 *
 * ```ts
 *  // pages/api/hello.ts
 *  import { IntlTranslator, t } from '@/utils/intl'
 *  import type { NextApiRequest, NextApiResponse } from 'next'
 *
 *  export default async function handler(req: NextApiRequest, res: NextApiResponse<{ name: string }>) {
 *      await IntlTranslator.initAsync('en') // init the translator!
 *      res.status(200).json({ name: t('pages.api.hello.name') }) // now you can use t function
 *  }
 * ```
 *
 * Similarly, in `getServerSideProps`:
 *
 * ```ts
 *  // pages/home/index.tsx
 *  import { IntlTranslator, t } from '@/utils/intl'
 *
 *  export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
 *      await IntlTranslator.initAsync(locale!) // init the translator!
 *
 *      const pageTitle = t('pages.home.title') // now you can use t function
 *      console.log(pageTitle)
 *
 *      return {...}
 *  }
 * ```
 */
export class IntlTranslator {
	private static translator: Translator

	private static locale: string

	public static async initAsync(locale: Parameters<typeof createTranslator>[0]['locale']): Promise<void> {
		const messages = (await import(`../locales/${locale}.json`)).default
		IntlTranslator.translator = createTranslator({ locale, messages })
		IntlTranslator.locale = locale
	}

	public static getLocale() {
		return IntlTranslator.locale
	}

	public static t(key: MessageKey, values?: TranslationValues | undefined): string {
		if (IntlTranslator.translator) {
			return IntlTranslator.translator(key, values)
		}

		return `${key} can't be resolved, Intl is not yet initialized`
	}
}

export const { t } = IntlTranslator
