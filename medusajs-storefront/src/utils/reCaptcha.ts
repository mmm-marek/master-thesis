import envConfig from '@/config'

// utils
import { GRECAPTCHA_ACTIONS } from './enums'

/**
 * Function that returns reCAPTCHA v3 token that you should send to backend for validation.
 *
 * @param {GRECAPTCHA_ACTIONS} action - The action for your reCAPTCHA. Actions might contain only alphanumeric characters, slashes, and underscores.
 * @returns {Promise<string>} The reCAPTCHA token.
 * @throws {Error} If an error occurs while generating the reCAPTCHA token.
 */
const recaptchaVerify = async (action: GRECAPTCHA_ACTIONS): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		try {
			window.grecaptcha.ready(() => {
				if (!envConfig.recaptcha.siteKey) {
					throw new Error('RECAPTCHA_SITE_KEY not provided')
				}

				window.grecaptcha.execute(envConfig.recaptcha.siteKey, { action }).then((token: string) => {
					resolve(token)
				})
			})
		} catch (error) {
			reject(error)
		}
	})
}

export default recaptchaVerify
