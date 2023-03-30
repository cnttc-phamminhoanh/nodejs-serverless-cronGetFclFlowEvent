const { pool } = require("../../database");

async function createEventCursor(params) {
  try {
    const { blockHeight, type } = params;

    if (!blockHeight || !type) {
      throw {
        code: 400,
        message: "Invalid params",
      }
    }

    const result = await pool.query(
      `INSERT INTO event_cursor (
                    "blockHeight",
                    "type"
                  ) 
                  VALUES ($1, $2)`,
      Object.values(params)
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function createEventCursor error: ${error}`);
  }
}

async function updateEventCursor(params) {
  try {
    const { blockHeight, type } = params;

    if (!blockHeight || !type) {
      throw {
        code: 400,
        message: "Invalid params",
      }
    }

    const result = await pool.query(
      `UPDATE event_cursor SET "blockHeight" = $1, "updatedAt" = $2 WHERE "type" = $3
      `,
      [params.blockHeight,new Date(Date.now()), params.type]
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function updateEventCursor error: ${error}`);
  }
}

async function getEventCursor(eventName) {
  try {
    if (!eventName) {
      throw {
        code: 400,
        message: "eventName is required",
      }
    }

    const result = await pool.query(
      `SELECT * FROM event_cursor WHERE "type" = $1
      `,
      [eventName]
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function getEventCursor error: ${error}`);
  }
}

module.exports = {
  createEventCursor,
  updateEventCursor,
  getEventCursor,
};
