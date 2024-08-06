const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "medusa-iQMH",
    entities: ["dist/models/*.js"],
    migrations: ["dist/migrations/*.js"],
});

module.exports = {
    datasource: AppDataSource,
};
