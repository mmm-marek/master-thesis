/* eslint-disable no-console */
import fs from 'fs'
import { template } from 'lodash'
import path from 'path'

import { EnvSchema } from '../envValidation/schema'
import { generateEnvTable } from './generateEnvTable'
import { generateScriptsTable } from './generateScriptsTable'
import { generateTodosTable } from './generateTodosTable'

function generateReadme() {
	// prepare data
	const serverEnvTable = generateEnvTable(EnvSchema)
	const scriptsTable = generateScriptsTable()
	const { todosTable, todosCount } = generateTodosTable()

	// read and compile template
	const tmpl = fs.readFileSync(path.join(__dirname, 'README.template.md'), 'utf8')
	const compiledTmpl = template(tmpl)
	const newContents = compiledTmpl({
		env_server_table: serverEnvTable,
		scripts_table: scriptsTable,
		todos_table: todosTable
	})

	// write files
	fs.writeFileSync('./README.md', newContents)
	console.log('\x1b[32m', `✅ README.md generated (with ${todosCount} todos)\n`)
}

generateReadme()
