const validateInputEntityName = (name) => {
	if (name.length < 3) {
		throw new Error('Name must be at least 3 characters long.')
	}
	return true
}
// eslint-disable-next-line func-names
module.exports = function (plop) {
	// NOTE: for conditions in template files (not used yet)
	plop.setHelper('contains', (arr, val) => arr?.includes(val))
	// for console logging in template files
	plop.setHelper('log', (data) => {
		// Use console.log to log the data to the console
		// eslint-disable-next-line no-console
		console.log(data)
		// Return an empty string so that nothing is printed to the template
		return ''
	})

	plop.setHelper('singular', (str) => {
		if (str.endsWith('ies')) {
			return `${str.slice(0, -3)}y`
		}
		if (str.endsWith('s')) {
			return str.slice(0, -1)
		}
		return str
	})
	// Component
	plop.setGenerator('Component', {
		description: 'Create a new component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your component name in singular?',
				validate: validateInputEntityName
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}/{{pascalCase name}}.tsx',
				templateFile: 'src/templates/Component/Component.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}/{{ pascalCase name }}Styles.ts',
				templateFile: 'src/templates/Component/ComponentStyles.tsx.hbs'
			}
		]
	})

	// Form
	plop.setGenerator('Form', {
		description: 'Create a new Form',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your form name in singular?',
				validate: validateInputEntityName
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}Form/{{ pascalCase name }}Form.tsx',
				templateFile: 'src/templates/Form/Form.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}Form/{{ pascalCase name }}FormStyles.ts',
				templateFile: 'src/templates/Form/FormStyles.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}Form/{{ pascalCase name }}FormTypes.ts',
				templateFile: 'src/templates/Form/FormTypes.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/schemas/{{ camelCase name }}Schemas.ts',
				templateFile: 'src/templates/Schema/Schema.tsx.hbs'
			}
		]
	})

	// Filter
	plop.setGenerator('Filter', {
		description: 'Create a new Filter',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your filter form name in singular?',
				validate: validateInputEntityName
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}FilterForm/{{ pascalCase name }}FilterForm.tsx',
				templateFile: 'src/templates/Filter/Filter.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}FilterForm/{{ pascalCase name }}FilterFormStyles.ts',
				templateFile: 'src/templates/Filter/FilterStyles.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}FilterForm/{{ pascalCase name }}FilterFormTypes.ts',
				templateFile: 'src/templates/Filter/FilterTypes.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/schemas/{{ camelCase name }}Schemas.ts',
				templateFile: 'src/templates/Schema/FilterSchema.tsx.hbs'
			}
		]
	})

	// Hooks
	plop.setGenerator('Hooks', {
		description: 'Create a new hooks',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your entity name in plural?',
				validate: validateInputEntityName
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/hooks/{{ camelCase name }}/useDelete{{ pascalCase (singular name) }}.ts',
				templateFile: 'src/templates/Queries/DeleteQuery.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/hooks/{{ camelCase name }}/useGet{{ pascalCase (singular name) }}.ts',
				templateFile: 'src/templates/Queries/GetQuery.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/hooks/{{ camelCase name }}/useGet{{ pascalCase (singular name) }}List.ts',
				templateFile: 'src/templates/Queries/GetListQuery.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/hooks/{{camelCase name}}/usePatch{{ pascalCase name }}.ts',
				templateFile: 'src/templates/Queries/PatchMutation.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/hooks/{{camelCase name}}/usePost{{ pascalCase name }}.ts',
				templateFile: 'src/templates/Queries/PostMutation.tsx.hbs'
			}
		]
	})

	// Page
	plop.setGenerator('Page', {
		description: 'Create a new page',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your page name?',
				validate: validateInputEntityName
			},
			{
				type: 'list',
				name: 'type',
				message: 'Select the page type:',
				choices: [
					{ name: 'SSG (Static Site Generation)', value: 'ssg' },
					{ name: 'SSR (Server-Side Rendering)', value: 'ssr' }
				],
				default: 'ssg' // Set default to SSG
			}
		],
		actions(data) {
			let templateFilePath
			if (data.type === 'ssg') {
				templateFilePath = 'src/templates/Page/SSGPage.tsx.hbs'
			} else {
				templateFilePath = 'src/templates/Page/SSRPage.tsx.hbs'
			}

			return [
				{
					type: 'add',
					path: `src/pages/{{dashCase name}}/index.tsx`,
					templateFile: templateFilePath
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/{{ pascalCase name }}.tsx',
					templateFile: 'src/templates/Component/Component.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/{{ pascalCase name }}Styles.ts',
					templateFile: 'src/templates/Component/ComponentStyles.tsx.hbs'
				}
			]
		}
	})

	// CRUD
	plop.setGenerator('CRUD', {
		description: 'Create a new CRUD',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your entity name in plural?',
				validate: validateInputEntityName
			},
			{
				type: 'list',
				name: 'type',
				message: 'Select the page type:',
				choices: [
					{ name: 'SSG (Static Site Generation)', value: 'ssg' },
					{ name: 'SSR (Server-Side Rendering)', value: 'ssr' }
				],
				default: 'ssg' // Set default to SSG
			}
		],
		actions(data) {
			let templateFilePath
			if (data.type === 'ssg') {
				templateFilePath = 'src/templates/Page/SSGPage.tsx.hbs'
			} else {
				templateFilePath = 'src/templates/Page/SSRPage.tsx.hbs'
			}

			return [
				// pages
				{
					type: 'add',
					path: `src/pages/{{dashCase name}}/index.tsx`,
					templateFile: templateFilePath
				},
				{
					type: 'add',
					path: `src/pages/{{dashCase name}}/create/index.tsx`,
					templateFile: 'src/templates/Page/CreatePage.tsx.hbs'
				},
				// schema
				{
					type: 'add',
					path: 'src/schemas/{{ camelCase name }}Schemas.ts',
					templateFile: 'src/templates/Schema/CrudSchema.tsx.hbs'
				},
				// containers
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/{{ pascalCase name }}List.tsx',
					templateFile: 'src/templates/Containers/ListContainer.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/{{ pascalCase (singular name) }}.tsx',
					templateFile: 'src/templates/Containers/AddContainer.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/{{ pascalCase (singular name) }}Edit.tsx',
					templateFile: 'src/templates/Containers/EditContainer.tsx.hbs'
				},
				// Edit form
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/components/Edit{{ pascalCase (singular name) }}Form/Edit{{ pascalCase (singular name) }}Form.tsx',
					templateFile: 'src/templates/Containers/EditForm.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/components/Edit{{ pascalCase (singular name) }}Form/Edit{{ pascalCase (singular name) }}FormStyles.ts',
					templateFile: 'src/templates/Containers/EditFormStyles.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/components/Edit{{ pascalCase (singular name) }}Form/Edit{{ pascalCase (singular name) }}FormTypes.ts',
					templateFile: 'src/templates/Containers/EditFormTypes.tsx.hbs'
				},
				// Create form
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/components/Add{{ pascalCase (singular name) }}Form/Add{{ pascalCase (singular name) }}Form.tsx',
					templateFile: 'src/templates/Containers/AddForm.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/components/Add{{ pascalCase (singular name) }}Form/Add{{ pascalCase (singular name) }}FormStyles.ts',
					templateFile: 'src/templates/Containers/AddFormStyles.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/containers/{{ camelCase name }}/components/Add{{ pascalCase (singular name) }}Form/Add{{ pascalCase (singular name) }}FormTypes.ts',
					templateFile: 'src/templates/Containers/AddFormTypes.tsx.hbs'
				},
				// hooks
				{
					type: 'add',
					path: 'src/hooks/{{camelCase name}}/useDelete{{ pascalCase (singular name) }}.ts',
					templateFile: 'src/templates/Queries/DeleteQuery.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/hooks/{{camelCase name}}/useGet{{ pascalCase (singular name) }}.ts',
					templateFile: 'src/templates/Queries/GetQuery.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/hooks/{{camelCase name}}/useGet{{ pascalCase name }}.ts',
					templateFile: 'src/templates/Queries/GetListQuery.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/hooks/{{camelCase name}}/usePatch{{ pascalCase (singular name) }}.ts',
					templateFile: 'src/templates/Queries/PatchMutation.tsx.hbs'
				},
				{
					type: 'add',
					path: 'src/hooks/{{camelCase name}}/usePost{{ pascalCase (singular name) }}.ts',
					templateFile: 'src/templates/Queries/PostMutation.tsx.hbs'
				}
			]
		}
	})
}
