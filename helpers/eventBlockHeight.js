const { pool } = require("../database");

async function createEventBlockHeight(params) {
  try {
    const { blockHeight, eventId } = params;

    if (!blockHeight || !eventId) {
      throw {
        code: 400,
        message: "Invalid params",
      };
    }

    const result = await pool.query(
      `INSERT INTO event_block_heights( "block_height", "event_id" ) VALUES ($1, $2)`,
      [blockHeight, eventId]
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function createEventBlockHeight error: ${JSON.stringify(error)}`);
  }
}

async function updateEventBlockHeight(params) {
  try {
    const { blockHeight, eventId } = params;

    if (!blockHeight || !eventId) {
      throw {
        code: 400,
        message: "Invalid params",
      };
    }

    const result = await pool.query(
      `UPDATE event_block_heights SET "block_height" = $1, "updated_at" = $2 WHERE "event_id" = $3
      `,
      [blockHeight, new Date(Date.now()), eventId]
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function updateEventBlockHeight error: ${JSON.stringify(error)}`);
  }
}

async function getEventBlockHeight(eventId) {
  try {
    if (!eventId) {
      throw {
        code: 400,
        message: "eventId is required",
      };
    }

    const result = await pool.query(
      `SELECT * FROM event_block_heights WHERE "event_id" = $1
      `,
      [eventId]
    );

    return result.rows[0];
  } catch (error) {
    console.log(`* Function getEventBlockHeight error: ${JSON.stringify(error)}`);
  }
}

module.exports = {
  createEventBlockHeight,
  updateEventBlockHeight,
  getEventBlockHeight,
};
