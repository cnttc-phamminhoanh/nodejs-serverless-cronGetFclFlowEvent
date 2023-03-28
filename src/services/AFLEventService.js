const { pool } = require("../../database");

async function createAFLEvent(params) {
  try {
    const { blockHeight, type } = params;

    if (!blockHeight || !type) {
      throw {
        code: 400,
        message: "Invalid params",
      }
    }

    const result = await pool.query(
      `INSERT INTO afl_events (
                    "blockHeight",
                    "type"
                  ) 
                  VALUES ($1, $2)`,
      Object.values(params)
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function createAFLEvent error: ${error}`);
  }
}

async function updateAFLEvent(params) {
  try {
    const { blockHeight, type } = params;

    if (!blockHeight || !type) {
      throw {
        code: 400,
        message: "Invalid params",
      }
    }

    const result = await pool.query(
      `UPDATE afl_events SET "blockHeight" = $1, "updatedAt" = $2 WHERE "type" = $3
      `,
      [params.blockHeight,new Date(Date.now()), params.type]
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function updateAFLEvent error: ${error}`);
  }
}

async function getLastSavedAFLEvent(eventName) {
  try {
    if (!eventName) {
      throw {
        code: 400,
        message: "eventName is required",
      }
    }

    const result = await pool.query(
      `SELECT * FROM afl_events WHERE "type" = $1
      `,
      [eventName]
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function getLastSavedAFLEvent error: ${error}`);
  }
}

module.exports = {
  createAFLEvent,
  updateAFLEvent,
  getLastSavedAFLEvent,
};
