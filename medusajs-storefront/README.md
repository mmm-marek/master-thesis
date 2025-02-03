# admin_next_web_app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

Frontend admin web application.

## Getting Started

### Installation

Before you start, please make sure you have installed:

- Node.js >=18.16.0
- npm >= 9.5.1

To install the project, run:

```npm install```

### Usage
After installation, following environment variables must be set in the ```.env``` file to successfully start the application:

### ENV variables
| Name | Description | Type | Rules |
| ---- | ----------- | ---- | -------------------- |
| NEXT_PUBLIC_RECAPTCHA_SITE_KEY | Variable represents the public site key for integrating the reCAPTCHA service into application. | String | `{"type":"min","value":1}` |
| NEXT_PUBLIC_MEDUSA_BACKEND_URL | Variable represents the Medusa backend URL of the API service that application communicates with. | String | `[{"type":"min","value":1},{"type":"url"},{"type":"regex"}]` |
| NEXT_PUBLIC_SENTRY_DSN | Unique identifier that connects app with sentry project. | String | `{"type":"min","value":1}` |
| NEXT_PUBLIC_SENTRY_ENV | Variable specify the environment or deployment stage of app for sentry. | String | `{"type":"min","value":1}` |
| ANALYZE | Used to control whether bundle analysis is enabled or disabled. | Optional | `[]` |
| NEXT_PUBLIC_APP_VERSION | Variable represents the version of the application. Automatically set to the current version in package.json. | Optional | `[]` |

First, run the development server:

```bash
npm run generate-tokens
```

then

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

To build the project, run:

```bash
npm run build
```

then for production start

```bash
npm run start
```

default port is 8000

## Technologies Used
* Next
* React
* TypeScript
* reCaptcha
* TanStack Query
* React hook form
* Styled Components (for styling)
* Sass (for styling)
* Zod (for validation)
* next-intl (for translations)
* Sentry (for error tracking)

## Commit messages
Commit messages should adhere to specific standards and conventions tailored for integration with **Jira**. This can be done by utilizing the **commitlint-plugin-jira-rules** ([read more](https://www.notion.so/goodrequest/Commitlint-fe286fe31cb945e587747935f02efcb5?pvs=4)). The resulting commit message should consist of these 2 parts:
1.  **Prefix**: Commit messages typically start with a Jira issue key, denoted by the Jira project acronym followed by a hyphen, the issue number and colon. For example, if the project key is "**PROJ**" and the issue number is **123**, the prefix would be "**PROJ-123:**".
2.  **Description**: The commit message should include a concise yet descriptive summary of the changes made. This description should be clear and informative, providing enough context for other developers to understand the purpose of the commit.

A properly formatted commit messages following the conventions of **commitlint-plugin-jira-rules** might look like this:
* `PROJ-123: Add user authentication functionality`
* `PROJ-234: Update README with installation instructions`
* `PROJ-567: Format code according to style guidelines`

## Scripts
| Name | Description | Command |
|------------|--------------------|---------|
| dev | Starts the development server, default port is 3000. | npm-run-all -p env-check dev:watch |
| dev:watch | Starts the development server with hot reloading enabled. | next dev |
| prebuild | Checks the environment before running the build script. | npm run env-check |
| build | Builds the application for production and upload source maps to sentry. | npm run generate-tokens && NODE_ENV=production SENTRY_RELEASE=$npm_package_version NEXT_PUBLIC_APP_VERSION=$npm_package_version next build |
| prestart | Checks the environment before running the start script. | npm run env-check |
| start | Starts the production server, default port is 8000. | next start -p 8000 |
| release | Builds the application for production. | npm run build |
| vault | Download process environment variable from vault. | node scripts/vaultSecrets.js |
| postinstall | Sets up Husky, a Git hook, to enable running pre-commit scripts. | husky install && shx rm -rf .git/hooks && shx ln -s ../.husky .git/hooks |
| lint | Lints the source code with eslint. | eslint src --color --ext .js --ext .jsx --ext .ts --ext .tsx |
| lint:fix | Perform linting on the source code files. | eslint src --color --ext .js --ext .jsx --ext .ts --ext .tsx --fix |
| env-check | Used to perform environment variable validation. | ts-node -r dotenv/config ./scripts/envValidation/envValidation.ts |
| style-dictionary | Script utilizes the Style Dictionary library to generate design tokens. | node scripts/styled-components-tokens/styleDictionary.js |
| make-tokens-files | Script generate tokens files for styled components. | node scripts/styled-components-tokens/makeTokensFiles.js |
| generate-tokens | Generation of design tokens. | npm run make-tokens-files && npm run style-dictionary |
| normalize-apidoc | Normalizes the apidoc JSON file. | node scripts/normalizeApidoc.js |
| generate-readme | Generates README file which contains basic information about the project, env variables, etc. | ts-node ./scripts/readmeGeneration/generateReadme.ts |
| fix-ref-parser-path | Fixes the path for the types generation. | node scripts/fixRefParserPath.js |
| typegen | Generates TypeScript type definitions from the normalized apidoc JSON file. | typegen apidoc/apidoc-normalize.json > src/types/api.d.ts |
| download:apidoc | Downloads the apidoc JSON file. | cross-env APIDOC=http://localhost:8000/api/doc/data.json node scripts/downloadApidoc.js |
| generate-ts-api | Downloads and generates TypeScript type definitions from the apidoc JSON file. | npm run download:apidoc && npm run normalize-apidoc && npm run fix-ref-parser-path && npm run typegen |
| pretype-check | Generates figma tokens before run type-check command. | npm run generate-tokens --if-present |
| type-check | Type-checks the TypeScript source code. | tsc --noEmit |
| plop | Generates boilerplate code. | plop |
| translations-csv-to-json | Convert CSV files containing translations into JSON format. | npx convert-csv-to-json GoodRequest/i18nextJsonToCsv |
| translations-json-to-csv | Convert JSON files containing translations into CSV format. | npx convert-json-to-csv GoodRequest/i18nextJsonToCsv |
| lint:styles | Lint all CSS errors. | stylelint 'src/**/*.{js,jsx,ts,tsx}' |
| fix:styles | Fix all CSS errors. | stylelint 'src/**/*.{js,jsx,ts,tsx}' --fix |

## Todos 
| File | Line | TODO |
| ---- | ---- | ---- |
| src/atoms/SelectField/SelectField.tsx | 47 | TODO: use Tooltip from atoms |
| src/atoms/SelectField/SelectFieldStyles.ts | 98 | TODO: dorobit size specific styly |
| src/components/Table/TableStyles.ts | 138 | TODO: (FR) vyriesit selected row - zatial sa nikde nepouziva |
| src/hooks/auth/useSignUp.ts | 8 | TODO: payload |
| src/hooks/auth/useSignUp.ts | 16 | TODO: zatial neexistujuca URL |
| src/pages/forgotten-password/index.tsx | 13 | TODO: use getLocales everywhere! |
| src/schemas/globalSchemas.ts | 7 | TODO: zrefactorovat na q.enum() ked sa implemntuje |
| src/utils/helpers.ts | 57 | TODO: implement modal notification |


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
