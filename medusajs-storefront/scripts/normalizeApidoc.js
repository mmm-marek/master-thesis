// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const flatten = require('obj-flatten')
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const { forEach, set } = require('lodash')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../apidoc/data.json')

const res = flatten(data)

let i = 0

forEach(res, (value, key) => {
	if (/oneOf/.test(key)) {
		i += 1
		if (value.length <= 1) {
			console.log(i, key, value)
			set(data, key, undefined)
		}
	}
})

fs.writeFileSync(path.join(process.cwd(), 'apidoc', 'apidoc-normalize.json'), JSON.stringify(data))
