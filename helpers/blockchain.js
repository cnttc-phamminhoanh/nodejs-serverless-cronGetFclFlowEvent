const fcl = require("@onflow/fcl");

async function getEventsByRange(params) {
  try {
    const { eventId, fromBlockHeight, toBlockHeight } = params;

    if (!eventId || !fromBlockHeight || !toBlockHeight) {
      throw {
        code: 400,
        message: "Invalid params",
      };
    }

    const events = await fcl.send([
      fcl.getEventsAtBlockHeightRange(eventId, fromBlockHeight, toBlockHeight),
    ]);

    const decoded = await fcl.decode(events);

    return decoded;
  } catch (error) {
    console.log(`* Function getEventsByRange error: ${JSON.stringify(error)}`);
  }
}

async function getBlockAtBlockId(blockId) {
  try {
    if (!blockId) {
      throw {
        code: 400,
        message: "blockId is required",
      };
    }

    const block = await fcl.send([fcl.getBlock(), fcl.atBlockId(blockId)]);

    const decoded = await fcl.decode(block);

    return decoded;
  } catch (error) {
    console.log(`* Function getBlockAtBlockId error: ${JSON.stringify(error)}`);
  }
}

async function getLatestBlock() {
  try {
    const block = await fcl.send([fcl.getBlock(true)]).then(fcl.decode);

    return block;
  } catch (error) {
    console.log(`* Function getLatestBlock error: ${JSON.stringify(error)}`);
  }
}

async function getEventsAtBlockIds(params) {
  try {
    const { eventId, blockIds } = params;

    if (!eventId || !blockIds) {
      throw {
        code: 400,
        message: "Invalid params",
      };
    }

    const events = await fcl.send([fcl.getEventsAtBlockIds(eventId, blockIds)]);

    const decoded = await fcl.decode(events);

    return decoded;
  } catch (error) {
    console.log(`* Function getEventsAtBlockIds error: ${JSON.stringify(error)}`);
  }
}

module.exports = {
  getEventsByRange,
  getLatestBlock,
  getEventsAtBlockIds,
  getBlockAtBlockId,
};
