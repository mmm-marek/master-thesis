import { forEach, groupBy, map, omit } from 'lodash'

interface EnvRule {
	envName?: string
	type?: string
	ruleName?: string
	value?: null | string | number | boolean
}

export const generateEnvTable = (schema: any) => {
	const rules: EnvRule[][] = []

	const dataToInsert = map(Object.keys(schema.shape), (envObject) => {
		// eslint-disable-next-line no-underscore-dangle
		if (schema.shape?.[envObject] && schema.shape[envObject]?._def?.checks) {
			const ruleObjects: EnvRule[] = []

			// iterate over rules of env variable
			// eslint-disable-next-line no-underscore-dangle
			forEach(schema.shape[envObject]._def.checks, (rule: any) => {
				ruleObjects.push({
					envName: envObject,
					type: rule?.kind,
					value: rule?.value
				})
			})

			rules.push(ruleObjects)
		}

		// get other properties that are not rules
		let description = ''

		if (schema.shape?.[envObject]) {
			if (schema.shape[envObject].description) {
				description = schema.shape[envObject].description
			}
		}

		let type = ''
		// eslint-disable-next-line no-underscore-dangle
		if (schema.shape[envObject] && schema.shape[envObject]?._def?.typeName) {
			// eslint-disable-next-line no-underscore-dangle
			type = schema.shape[envObject]._def.typeName.replace('Zod', '')
		}

		return {
			name: envObject,
			description,
			type
		}
	})

	// create objects with envName as key and rules as value
	const keyedRules = groupBy(rules.flat(), 'envName')

	// create table rows for markdown
	const tableRows = dataToInsert.map((envVariable) => {
		// remove envName from rules
		const omitedRule = map(keyedRules[envVariable.name], (rule) => {
			return omit(rule, 'envName')
		})

		// determine if rule is array or object, so in markdown it can be displayed properly
		let resultEnvRule = ''
		if (omitedRule.length === 1) {
			resultEnvRule = JSON.stringify(omitedRule[0])
		} else {
			resultEnvRule = JSON.stringify(omitedRule)
		}

		// get rule for env variable
		const envRule = resultEnvRule

		return `| ${envVariable.name} | ${envVariable.description || '-'} | ${envVariable.type} | \`${envRule}\` |`
	})

	const tableContent = `| Name | Description | Type | Rules |\n| ---- | ----------- | ---- | -------------------- |\n${tableRows.join('\n')}`

	return tableContent
}
