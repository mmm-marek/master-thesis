const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
    case "production":
        ENV_FILE_NAME = ".env.production";
        break;
    case "staging":
        ENV_FILE_NAME = ".env.staging";
        break;
    case "test":
        ENV_FILE_NAME = ".env.test";
        break;
    case "development":
    default:
        ENV_FILE_NAME = ".env";
        break;
}

try {
    dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
    process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
    process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const EVENTS_REDIS_URL =
    process.env.EVENTS_REDIS_URL || "redis://localhost:6379";

const BACKEND_URL = process.env.BACKEND_URL || "localhost:9000";
const ADMIN_URL = process.env.ADMIN_URL || "localhost:7001";
const STORE_URL = process.env.STORE_URL || "localhost:3000";

const GoogleClientId = process.env.GOOGLE_CLIENT_ID || "";
const GoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const FacebookClientId = process.env.FACEBOOK_CLIENT_ID || "";
const FacebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET || "";

const plugins = [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
    {
        resolve: `@medusajs/file-local`,
        options: {
            upload_dir: "uploads",
        },
    },
    {
        resolve: "@medusajs/admin",
        /** @type {import('@medusajs/admin').PluginOptions} */
        options: {
            autoRebuild: true,
            develop: {
                open: process.env.OPEN_BROWSER !== "false",
            },
        },
    },
    {
        resolve: "medusa-plugin-strapi-ts",
        options: {
            strapi_protocol: process.env.STRAPI_PROTOCOL,
            strapi_host: process.env.STRAPI_SERVER_HOSTNAME,
            strapi_port: process.env.STRAPI_PORT,
            strapi_secret: process.env.STRAPI_SECRET,
            strapi_default_user: {
                username: process.env.STRAPI_MEDUSA_USER,
                password: process.env.STRAPI_MEDUSA_PASSWORD,
                email: process.env.STRAPI_MEDUSA_EMAIL,
                confirmed: true,
                blocked: false,
                provider: "local",
            },
            strapi_admin: {
                username: process.env.STRAPI_SUPER_USERNAME,
                password: process.env.STRAPI_SUPER_PASSWORD,
                email: process.env.STRAPI_SUPER_USER_EMAIL,
            },
            auto_start: true,
        },
    },
    {
        resolve: "medusa-plugin-auth",
        /** @type {import('medusa-plugin-auth').AuthOptions} */
        options: [
            {
                type: "google",
                // strict: "all", // or "none" or "store" or "admin"
                strict: "none",
                identifier: "google",
                clientID: GoogleClientId,
                clientSecret: GoogleClientSecret,
                admin: {
                    callbackUrl: `${BACKEND_URL}/admin/auth/google/cb`,
                    failureRedirect: `${ADMIN_URL}/login`,
                    // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
                    // This query param will have the priority over this configuration
                    successRedirect: `${ADMIN_URL}/`,
                    // authPath: '/admin/auth/google',
                    // authCallbackPath: '/admin/auth/google/cb',
                    // expiresIn: 24 * 60 * 60 * 1000,
                    // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
                    //    // implement your custom verify callback here if you need it
                    // },
                },
                store: {
                    callbackUrl: `${BACKEND_URL}/store/auth/google/cb`,
                    failureRedirect: `${STORE_URL}/login`,
                    // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
                    // This query param will have the priority over this configuration
                    successRedirect: `${STORE_URL}/`,
                    // authPath: '/store/auth/google',
                    // authCallbackPath: '/store/auth/google/cb',
                    // expiresIn: 24 * 60 * 60 * 1000,
                    // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
                    //    // implement your custom verify callback here if you need it
                    // },
                },
            },
        ],
    },
    {
        resolve: "medusa-plugin-auth",
        /** @type {import('medusa-plugin-auth').AuthOptions} */
        options: [
            {
                type: "facebook",
                // strict: "all", // or "none" or "store" or "admin"
                strict: "none",
                identifier: "facebook",
                clientID: FacebookClientId,
                clientSecret: FacebookClientSecret,
                admin: {
                    callbackUrl: `${BACKEND_URL}/admin/auth/facebook/cb`,
                    failureRedirect: `${ADMIN_URL}/login`,
                    // The success redirect can be overridden from the client by adding a query param `?redirectTo=your_url` to the auth url
                    // This query param will have the priority over this configuration
                    successRedirect: `${ADMIN_URL}/`,
                    // authPath: '/admin/auth/facebook',
                    // authCallbackPath: '/admin/auth/facebook/cb',
                    // expiresIn: 24 * 60 * 60 * 1000,
                    // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
                    //    // implement your custom verify callback here if you need it
                    // }
                },
                store: {
                    callbackUrl: `${BACKEND_URL}/store/auth/facebook/cb`,
                    failureRedirect: `${STORE_URL}/login`,
                    // The success redirect can be overridden from the client by adding a query param `?redirectTo=your_url` to the auth url
                    // This query param will have the priority over this configuration
                    successRedirect: `${STORE_URL}/`,
                    // authPath: '/store/auth/facebook',
                    // authCallbackPath: '/store/auth/facebook/cb',
                    // expiresIn: 24 * 60 * 60 * 1000,
                    // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
                    //    // implement your custom verify callback here if you need it
                    // }
                },
            },
        ],
    },
];

const modules = {
    eventBus: {
        resolve: "@medusajs/event-bus-redis",
        options: {
            redisUrl: EVENTS_REDIS_URL,
        },
    },
    /*cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
    store_cors: STORE_CORS,
    database_url: DATABASE_URL,
    admin_cors: ADMIN_CORS,
    // Uncomment the following lines to enable REDIS
    // redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
    projectConfig,
    plugins,
    modules,
    featureFlags: {
        product_categories: true,
    },
};
