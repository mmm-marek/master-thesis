// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require('https')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const apidocPath = path.join(process.cwd(), 'apidoc')
const dataPath = path.join(apidocPath, 'data.json')

if (!fs.existsSync(apidocPath)) {
	fs.mkdirSync(apidocPath)
}

const download = (url, dest, cb) => {
	const file = fs.createWriteStream(dest)
	const protocol = url.startsWith('https') ? https : http
	protocol
		.get(url, (response) => {
			response.pipe(file)
			file.on('finish', () => {
				file.close(cb) // close() is async, call cb after close completes.
			})
		})
		.on('error', (err) => {
			// Handle errors
			fs.unlinkSync(dest) // Delete the file async. (But we don't check the result)
			if (cb) cb(err.message)
		})
}

download(process.env.APIDOC, dataPath, console.log)
