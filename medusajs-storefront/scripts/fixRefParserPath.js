/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

/**
 * Fix for issue @link https://github.com/openapistack/openapi-client-axios/issues/167
 */

// Define the source and destination file paths
const rootLevel = path.join(__dirname, '..')
const sourcePath = path.join(rootLevel, 'apidoc', 'apidoc-normalize.json')
const destinationPath = path.join(rootLevel, 'node_modules', '@apidevtools', 'json-schema-ref-parser', 'dist', 'apidoc', 'apidoc-normalize.json')

// Check if the source file exists
if (fs.existsSync(sourcePath)) {
	// Ensure the destination directory exists
	const destinationDir = path.dirname(destinationPath)
	if (!fs.existsSync(destinationDir)) {
		fs.mkdirSync(destinationDir, { recursive: true })
	}

	// Copy the file
	fs.copyFile(sourcePath, destinationPath, (err) => {
		if (err) {
			console.error('Error copying file:', err)
		} else {
			console.log('File copied successfully.')
		}
	})
} else {
	console.error('Source file does not exist:', sourcePath)
}
