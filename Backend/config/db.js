/*
  config/db.js
  - set up a PostgreSQL connection pool
  - read database connection settings from environment variables
  - expose the shared pool for database queries
*/

const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});


pool.on("connect", () => {
    console.log("PostgreSQL Connected");
});


pool.on("error", (err) => {

    console.error("PostgreSQL error:", err);

});


module.exports = pool;