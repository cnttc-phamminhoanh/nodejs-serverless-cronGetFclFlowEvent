const fcl = require ('@onflow/fcl');

async function getEvents(params) {
  try {
    const { eventName, fromBlockHeight, toBlockHeight } = params;

    if (!eventName || !fromBlockHeight || !toBlockHeight) {
      throw {
        code: 400,
        message: "Invalid params",
      }
    }

    const events = await fcl
    .send([
      fcl.getEventsAtBlockHeightRange(
        params.eventName,
        params.fromBlockHeight,
        params.toBlockHeight
      ),
    ])

    return fcl.decode(events);
  } catch (error) {
    console.log(`* Function getEvents error: ${error}`);
  }
}

module.exports = {
  getEvents,
};