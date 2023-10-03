const pg = require("pg");
const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
