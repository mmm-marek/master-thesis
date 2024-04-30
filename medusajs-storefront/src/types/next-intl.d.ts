type MessagesEn = typeof import('../locales/en.json')
type MessagesSk = typeof import('../locales/sk.json')

type CommonMessages<T, U> = {
	[K in keyof T & keyof U]: T[K] extends object ? CommonMessages<T[K], U[K]> : T[K]
}

type Messages = CommonMessages<MessagesEn, MessagesSk>

/* NOTE: 
If you have only one locale, remove CommonMessages 
helper and use messages for locale directly, e.g.: 
declare interface IntlMessages extends MessagesEn {}
*/
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}
