const { pool, connectDB } = require("../../database");

connectDB();

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS afl_events (
      "id" serial PRIMARY KEY,
      "blockHeight" INTEGER,
      "type" VARCHAR(255),
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    );
  `;

pool.query(createTableQuery, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Table afl_events created successfully");
    process.exit();
  }
  pool.end();
});
