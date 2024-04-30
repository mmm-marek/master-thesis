/* eslint-disable */
const fs = require('fs')

const TOKENS_FOLDER_NAME = 'tokens'

/* 
Deleting old files (lightTokens.json, darkTokens.json)
*/

try {
	fs.unlinkSync(__dirname + `/${TOKENS_FOLDER_NAME}/lightTokens.json`)
} catch {
	console.log('no tokens to delete')
}

try {
	fs.unlinkSync(__dirname + `/${TOKENS_FOLDER_NAME}/darkTokens.json`)
} catch {
	console.log('no tokens to delete')
}

/* 
Assigning colors from global.json to light.json and save it as lightTokens.json
*/

const lightGlobalFile = require(__dirname + `/${TOKENS_FOLDER_NAME}/global.json`)
const lightThemeFile = require(__dirname + `/${TOKENS_FOLDER_NAME}/light.json`)

for (const [key, value] of Object.entries(lightGlobalFile.color)) {
	lightThemeFile.color[key] = value
}

fs.writeFileSync(__dirname + `/${TOKENS_FOLDER_NAME}/lightTokens.json`, JSON.stringify(lightThemeFile, null, 2), function writeJSON(err) {
	if (err) console.log(err)
	else console.log('file written succesfully')
})

/* 
Assigning colors from global.json to dark.json and save it as darkTokens.json
*/

const darkGlobalFile = require(__dirname + `/${TOKENS_FOLDER_NAME}/global.json`)
const darkThemeFile = require(__dirname + `/${TOKENS_FOLDER_NAME}/dark.json`)

for (const [key, value] of Object.entries(darkGlobalFile.color)) {
	darkThemeFile.color[key] = value
}

fs.writeFileSync(__dirname + `/${TOKENS_FOLDER_NAME}/darkTokens.json`, JSON.stringify(darkThemeFile, null, 2), function writeJSON(err) {
	if (err) console.log(err)
	else console.log('file written succesfully')
})

/* 
Fixing colors, shadows and rings in lightTokens.json and darkTokens.json so they are usable in style-dictionary library
*/

function hexToRgb(hex) {
	const bigint = parseInt(hex.substring(1), 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return [r, g, b].join()
}

function searchColorValue(colorstr, theme) {
	const colorRef = colorstr.substring(colorstr.indexOf('{') + 1, colorstr.indexOf('}')).split('.')

	if (theme === 'light') {
		let lightFileColor = lightFile.color
		for (let i = 1; i < colorRef.length; i++) {
			lightFileColor = lightFileColor[colorRef[i]]
		}
		return lightFileColor.value
	} else {
		let darkFileColor = darkFile.color
		for (let i = 1; i < colorRef.length; i++) {
			darkFileColor = darkFileColor[colorRef[i]]
		}
		return darkFileColor.value
	}
}

function parseColor(colorstr, theme) {
	if (colorstr.includes('rgba')) {
		let newColorstr = colorstr
		while (!newColorstr.includes('#')) {
			newColorstr = searchColorValue(newColorstr, theme)
		}
		const rgb = hexToRgb(newColorstr)
		const opacity = colorstr.substring(colorstr.indexOf(',') + 1, colorstr.indexOf(')'))
		return `rgba(${rgb}, ${opacity})`
	} else {
		return colorstr
	}
}

function objLookup(obj, path) {
	const parts = path.split('.')
	if (parts.length === 1) {
		return obj[parts[0]]
	}
	if (obj[parts[0]]) {
		return objLookup(obj[parts[0]], parts.slice(1).join('.'))
	}
	return undefined
}

const fixColor = (colorObj, path, theme, themeFile) => {
	for (const [key, value] of Object.entries(colorObj)) {
		if (value.value) {
			if (objLookup(themeFile, path)) {
				objLookup(themeFile, path)[key].value = parseColor(value.value, theme)
			}
		} else {
			fixColor(value, path.concat('.').concat(key), theme, themeFile)
		}
	}
}

function fixColors() {
	fixColor(lightFile.color, 'color', 'light', lightFile)
	fixColor(darkFile.color, 'color', 'dark', darkFile)
}

function parseShadow(obj, theme) {
	if (Array.isArray(obj)) {
		const x1 = obj.at(0).x
		const y1 = obj.at(0).y
		const blur1 = obj.at(0).blur
		const spread1 = obj.at(0).spread
		const color1 = parseColor(obj.at(0).color, theme)
		const x2 = obj.at(1).x
		const y2 = obj.at(1).y
		const blur2 = obj.at(1).blur
		const spread2 = obj.at(1).spread
		const color2 = parseColor(obj.at(1).color, theme)
		return `${x1}px ${y1}px ${blur1}px ${spread1}px ${color1}, ${x2}px ${y2}px ${blur2}px ${spread2}px ${color2}`
	} else {
		const x = obj.x
		const y = obj.y
		const blur = obj.blur
		const spread = obj.spread
		const color = parseColor(obj.color, theme)
		return `${x}px ${y}px ${blur}px ${spread}px ${color}`
	}
}

function fixShadows() {
	for (const [key] of Object.entries(lightFile.dropShadow)) {
		lightFile.dropShadow[key].value = parseShadow(lightFile.dropShadow[key].value)
	}
	for (const [key] of Object.entries(lightFile.innerShadow)) {
		lightFile.innerShadow[key].value = parseShadow(lightFile.innerShadow[key].value)
	}
	for (const [key] of Object.entries(darkFile.dropShadow)) {
		darkFile.dropShadow[key].value = parseShadow(darkFile.dropShadow[key].value)
	}
	for (const [key] of Object.entries(darkFile.innerShadow)) {
		darkFile.innerShadow[key].value = parseShadow(darkFile.innerShadow[key].value)
	}
}

function fixRings() {
	for (const [key] of Object.entries(lightFile.ring)) {
		for (const [innerKey] of Object.entries(lightFile.ring[key])) {
			lightFile.ring[key][innerKey].value = parseShadow(lightFile.ring[key][innerKey].value, 'light')
		}
	}
	for (const [key] of Object.entries(darkFile.ring)) {
		for (const [innerKey] of Object.entries(darkFile.ring[key])) {
			darkFile.ring[key][innerKey].value = parseShadow(darkFile.ring[key][innerKey].value, 'dark')
		}
	}
}

const lightFileName = __dirname + `/${TOKENS_FOLDER_NAME}/lightTokens.json`
const darkFileName = __dirname + `/${TOKENS_FOLDER_NAME}/darkTokens.json`

const lightFile = require(lightFileName)
const darkFile = require(darkFileName)

fixColors()
fixShadows()
fixRings()

try {
	fs.writeFileSync(lightFileName, JSON.stringify(lightFile, null, 2))
	console.log(`File ${lightFileName} written succesfully ✅`)
} catch (error) {
	console.log(error)
}

try {
	fs.writeFileSync(darkFileName, JSON.stringify(darkFile, null, 2))
	console.log(`File ${darkFileName} written succesfully ✅`)
} catch (error) {
	console.log(error)
}
