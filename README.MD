This project requires multiple steps in order to be funcional:
1. - Postgres database that will be used to store the products (set up required env variables accordingly)
`docker run --name strapi-postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres`


Scripts:
- Strapi - `npm run develop` inside `medusa-strapi-repo/packages/medusa-strapi`
- Medusa Admin and Backend - `npm run dev` inside `medusajs-eshop`
- Medusa Storefront - `npm run dev` inside `medusajs-storefront`


Ports (localhost)
- Strapi: 1337
- Medusa Backend: 9000
- Medusa Admin: 7001
- Medusa Storefront: 3000