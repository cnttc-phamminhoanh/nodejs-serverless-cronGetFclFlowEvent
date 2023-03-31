const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require('pg');

const config = {
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database:process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
}

let client;

const pool = new Pool(config);

async function connectDB() {
  try {
    client = await pool.connect();
    console.log(`Connected to database: ${config.database}`);
  } catch (error) {
    console.error('Error connecting to Postgres', err);
  } finally {
    client.release();
  }
}

module.exports = {
  connectDB,
  pool,
}