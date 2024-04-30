import fs from 'fs'

export const generateScriptsTable = () => {
	// Read package.json file
	const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

	// Get the scripts section
	const { scripts, scriptsDescriptions } = packageJson

	// Create the table header
	const tableHeader = '| Name | Description | Command |\n|------------|--------------------|---------|'

	// Create the table rows
	const tableRows = Object.keys(scripts).map((scriptName) => {
		const scriptDescription = scriptsDescriptions[scriptName]
		if (!scriptDescription) {
			console.log(`\x1B[33mWarning! Description for script \x1B[36m'${scriptName}' \x1B[33mis missing.\x1B[0m`)
		}
		const scriptCommand = scripts[scriptName]
		return `| ${scriptName} | ${scriptDescription} | ${scriptCommand} |`
	})

	// Join the header and rows into a Markdown table and return it
	return `${tableHeader}\n${tableRows.join('\n')}`
}
