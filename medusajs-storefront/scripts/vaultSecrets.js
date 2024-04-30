// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const Vault = require('node-vault')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os')

const envFilePath = path.resolve(__dirname, '../.env')

async function getVaultSecrets() {
	const vault = Vault({
		endpoint: process.env.VAULT_URL
	})

	await vault.approleLogin({
		role_id: process.env.VAULT_ROLE_ID,
		secret_id: process.env.VAULT_SECRET_ID
	})

	const vaultSecrets = await vault.read(process.env.VAULT_SECRETS_PATH)
	const envVars = Object.keys(vaultSecrets.data).map((key) => `${key}=${vaultSecrets.data[key]}`)

	const exists = fs.existsSync(envFilePath)
	if (exists) {
		fs.unlinkSync(envFilePath)
	}
	fs.writeFileSync(envFilePath, envVars.join(os.EOL))
}

if (process.env.VAULT_URL && process.env.VAULT_ROLE_ID && process.env.VAULT_SECRET_ID && process.env.VAULT_SECRETS_PATH) {
	getVaultSecrets()
}
