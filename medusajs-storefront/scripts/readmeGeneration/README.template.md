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
<%= env_server_table %>

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
* Antd design (for UI)
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
<%= scripts_table %>

## Todos 
<%= todos_table %>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
