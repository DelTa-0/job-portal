require("ts-node/register");
module.exports={
  development: {
    username: "postgres",
    password: "admin",
    database: "jobportal",
    host: "127.0.0.1",
    dialect: "postgres",
    migrationStorageTableName: "migrations",
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
