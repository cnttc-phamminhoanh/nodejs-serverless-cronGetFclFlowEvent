const { Pool } = require('pg');

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'afl-DB',
  password: '123456',
  port: 5432
}

const pool = new Pool(config);

async function connectDB() {
  try {
    await pool.connect();
    console.log(`Connected to database: ${config.database}`);
  } catch (error) {
    console.error('Error connecting to Postgres', err);
  }
}

module.exports = {
  connectDB,
  pool,
}