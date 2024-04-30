/* eslint-disable prefer-destructuring */
import * as fs from 'fs'
import * as glob from 'glob'

const getTodosMarkdownTable = (todos: { file: string; line: number; text: string }[]): string => {
	let markdownTable = `| File | Line | TODO |\n| ---- | ---- | ---- |\n`

	todos.forEach((todo) => {
		markdownTable += `| ${todo.file} | ${todo.line} | ${todo.text} |\n`
	})

	return markdownTable
}

const findTodosInFile = (filePath: string): { file: string; line: number; text: string }[] => {
	const content = fs.readFileSync(filePath, 'utf-8')
	const lines = content.split('\n')

	const todos: { file: string; line: number; text: string }[] = []
	let insideMultilineComment = false
	let multilineCommentText = ''

	lines.forEach((line, lineNumber) => {
		const singleLineMatch = line.match(/\/\/\s*(TODO.*)/i)
		const multiLineStartMatch = line.includes('/*')
		const multiLineEndMatch = line.includes('*/')

		const handleMultilineEnd = () => {
			insideMultilineComment = false

			const todoMatch = multilineCommentText.match(/(TODO\s*(.*?))(?=\*\/)/i)
			if (todoMatch) {
				const todoText = todoMatch[1]
				todos.push({ file: filePath, line: lineNumber + 1, text: todoText?.trim() || '' })
			}
		}

		if (singleLineMatch) {
			const todoText = singleLineMatch[1]
			todos.push({ file: filePath, line: lineNumber + 1, text: todoText?.trim() || '' })
		} else if (multiLineStartMatch) {
			insideMultilineComment = true
			multilineCommentText = line.split('/*')[1] || ''

			if (multiLineEndMatch) {
				handleMultilineEnd()
			}
		} else if (insideMultilineComment) {
			multilineCommentText += ` ${line.trim()}`

			if (multiLineEndMatch) {
				handleMultilineEnd()
			}
		}
	})

	return todos
}

const scanProjectForTodos = (): { file: string; line: number; text: string }[] => {
	const projectFiles = glob.sync('**/*.{js,jsx,ts,tsx}', { ignore: ['node_modules/**', 'scripts/**'] })
	const allTodos: { file: string; line: number; text: string }[] = []

	projectFiles.forEach((file) => {
		const todosInFile = findTodosInFile(file)
		allTodos.push(...todosInFile)
	})

	return allTodos
}

export const generateTodosTable = () => {
	const todos = scanProjectForTodos()
	const todosTable = getTodosMarkdownTable(todos)
	return { todosTable, todosCount: todos.length }
}
