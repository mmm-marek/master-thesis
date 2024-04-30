export {}

declare global {
	interface Window {
		grecaptcha: {
			ready(callback: () => void): void
			execute(siteKey: string, options: { action: string }): Promise<string>
		}
	}

	module '*.svg?url' {
		const content: any
		export default content
	}

	module '*.svg' {
		const content: any
		export default content
	}

	type Nullish<T> = T | null | undefined
}
