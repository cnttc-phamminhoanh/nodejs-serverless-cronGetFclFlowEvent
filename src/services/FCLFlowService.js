const fcl = require("@onflow/fcl");

async function getEventsByRange(params) {
  try {
    const { eventName, fromBlockHeight, toBlockHeight } = params;

    if (!eventName || !fromBlockHeight || !toBlockHeight) {
      throw {
        code: 400,
        message: "Invalid params",
      };
    }

    const events = await fcl.send([
      fcl.getEventsAtBlockHeightRange(
        eventName,
        fromBlockHeight,
        toBlockHeight
      ),
    ]);

    const decoded = await fcl.decode(events);

    return decoded;
  } catch (error) {
    console.log(`* Function getEventsByRange error: ${error}`);
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
    console.log(`* Function getBlockAtBlockId error: ${error}`);
  }
}

async function getLatestBlock() {
  try {
    const block = await fcl.send([fcl.getBlock(true)]).then(fcl.decode);

    return block;
  } catch (error) {
    console.log(`* Function getLatestBlock error: ${error}`);
  }
}

async function getEventsAtBlockIds(params) {
  try {
    const { eventName, blockIds } = params;

    if (!eventName || !blockIds) {
      throw {
        code: 400,
        message: "Invalid params",
      };
    }

    const events = await fcl.send([
      fcl.getEventsAtBlockIds(eventName, blockIds),
    ]);

    const decoded = await fcl.decode(events);

    return decoded;
  } catch (error) {
    console.log(`* Function getEventsAtBlockIds error: ${error}`);
  }
}

module.exports = {
  getEventsByRange,
  getLatestBlock,
  getEventsAtBlockIds,
  getBlockAtBlockId,
};
