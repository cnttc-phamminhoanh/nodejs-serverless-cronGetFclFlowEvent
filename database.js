const { Pool } = require('pg');

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'afl-DB',
  password: '123456',
  port: 5432
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