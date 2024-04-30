/* eslint-disable */
const StyleDictionaryPackage = require('style-dictionary')

const TOKENS_FOLDER_NAME = 'tokens'

function getStyleDictionaryConfig(theme) {
	return {
		source: [`scripts/styled-components-tokens/${TOKENS_FOLDER_NAME}/${theme}.json`],
		platforms: {
			flatten: {
				transformGroup: 'web',
				buildPath: `scripts/styled-components-tokens/${TOKENS_FOLDER_NAME}/`,
				files: [
					{
						destination: `${theme}.json`,
						format: 'json/flat'
					}
				]
			},
			js: {
				transformGroup: 'js',
				buildPath: 'src/styles/',
				files: [
					{
						destination: `${theme}.js`,
						format: 'javascript/module'
					}
				]
			}
		}
	}
}

;['flatten', 'js'].map(function (platform) {
	;['darkTokens', 'lightTokens'].map(function (theme) {
		console.log('\n==============================================')
		console.log(`\nProcessing: [${theme}, ${platform}]`)

		const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme))

		StyleDictionary.buildPlatform(platform)

		console.log('\nEnd processing')
	})
})
