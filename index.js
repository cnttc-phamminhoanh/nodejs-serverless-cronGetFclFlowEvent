const dotenv = require("dotenv");
dotenv.config();
const fcl = require("@onflow/fcl");
const { send: transportGRPC } = require("@onflow/transport-grpc");
const { getEvents } = require("./src/services/FCLFlowService");
const {
  createAFLEvent,
  updateAFLEvent,
} = require("./src/services/AFLEventService");
const { getLastSavedAFLEvent } = require("./src/services/AFLEventService");
const { connectDB } = require("./database");
const { events, blockHeightRange } = require("./constants/index");
const { sendData } = require("./src/services/webhookSenderService");


module.exports.runCronJobGetEventForSale = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  const aflEventInDB = await getLastSavedAFLEvent(events.forSale.eventName);

  let fetchEvents;

  if (!aflEventInDB) {
    const fromBlockHeight = events.forSale.blockHeightDefault;
    const toBlockHeight = fromBlockHeight + blockHeightRange;

    fetchEvents = await getEvents({
      eventName: events.forSale.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createAFLEvent({
      blockHeight: toBlockHeight,
      type: events.forSale.eventName,
    });

    if (!fetchEvents?.length) {
      return;
    }

    const promise = [];

    for (let i = 0; i < fetchEvents.length; i++) {
      promise.push(
        sendData({
          url: process.env.WEBHOOK_URL_LOCAL,
          data: {
            flowEventId: fetchEvents[i].type,
            blockEventData: fetchEvents[i].data,
          },
        })
      );
    }

    await Promise.all(promise);

    return;
  }

  const fromBlockHeight = aflEventInDB.blockHeight;
  const toBlockHeight = fromBlockHeight + blockHeightRange;

  fetchEvents = await getEvents({
    eventName: aflEventInDB.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateAFLEvent({
    blockHeight: toBlockHeight,
    type: aflEventInDB.type,
  });

  if (!fetchEvents?.length) {
    return;
  }

  const promise = [];

  for (let i = 0; i < fetchEvents.length; i++) {
    promise.push(
      sendData({
        url: process.env.WEBHOOK_URL_LOCAL,
        data: {
          flowEventId: fetchEvents[i].type,
          blockEventData: fetchEvents[i].data,
        },
      })
    );
  }

  await Promise.all(promise);

  return;
};

module.exports.runCronJobGetEventTokenPurchased = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  const aflEventInDB = await getLastSavedAFLEvent(events.tokenPurchased.eventName);

  let fetchEvents;

  if (!aflEventInDB) {
    const fromBlockHeight = events.tokenPurchased.blockHeightDefault;
    const toBlockHeight = fromBlockHeight + blockHeightRange;

    fetchEvents = await getEvents({
      eventName: events.tokenPurchased.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createAFLEvent({
      blockHeight: toBlockHeight,
      type: events.tokenPurchased.eventName,
    });

    if (!fetchEvents?.length) {
      return;
    }

    const promise = [];

    for (let i = 0; i < fetchEvents.length; i++) {
      promise.push(
        sendData({
          url: process.env.WEBHOOK_URL_LOCAL,
          data: {
            flowEventId: fetchEvents[i].type,
            blockEventData: fetchEvents[i].data,
          },
        })
      );
    }

    await Promise.all(promise);

    return;
  }

  const fromBlockHeight = aflEventInDB.blockHeight;
  const toBlockHeight = fromBlockHeight + blockHeightRange;

  fetchEvents = await getEvents({
    eventName: aflEventInDB.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateAFLEvent({
    blockHeight: toBlockHeight,
    type: aflEventInDB.type,
  });

  if (!fetchEvents?.length) {
    return;
  }

  const promise = [];

  for (let i = 0; i < fetchEvents.length; i++) {
    promise.push(
      sendData({
        url: process.env.WEBHOOK_URL_LOCAL,
        data: {
          flowEventId: fetchEvents[i].type,
          blockEventData: fetchEvents[i].data,
        },
      })
    );
  }

  await Promise.all(promise);

  return;
};

module.exports.runCronJobGetEventSaleCanceled = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  const aflEventInDB = await getLastSavedAFLEvent(events.saleCanceled.eventName);

  let fetchEvents;

  if (!aflEventInDB) {
    const fromBlockHeight = events.saleCanceled.blockHeightDefault;
    const toBlockHeight = fromBlockHeight + blockHeightRange;

    fetchEvents = await getEvents({
      eventName: events.saleCanceled.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createAFLEvent({
      blockHeight: toBlockHeight,
      type: events.saleCanceled.eventName,
    });

    if (!fetchEvents?.length) {
      return;
    }

    const promise = [];

    for (let i = 0; i < fetchEvents.length; i++) {
      promise.push(
        sendData({
          url: process.env.WEBHOOK_URL_LOCAL,
          data: {
            flowEventId: fetchEvents[i].type,
            blockEventData: fetchEvents[i].data,
          },
        })
      );
    }

    await Promise.all(promise);

    return;
  }

  const fromBlockHeight = aflEventInDB.blockHeight;
  const toBlockHeight = fromBlockHeight + blockHeightRange;

  fetchEvents = await getEvents({
    eventName: aflEventInDB.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateAFLEvent({
    blockHeight: toBlockHeight,
    type: aflEventInDB.type,
  });

  if (!fetchEvents?.length) {
    return;
  }

  const promise = [];

  for (let i = 0; i < fetchEvents.length; i++) {
    promise.push(
      sendData({
        url: process.env.WEBHOOK_URL_LOCAL,
        data: {
          flowEventId: fetchEvents[i].type,
          blockEventData: fetchEvents[i].data,
        },
      })
    );
  }

  await Promise.all(promise);

  return;
};

module.exports.runCronJobGetEventPriceChanged = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  const aflEventInDB = await getLastSavedAFLEvent(events.priceChanged.eventName);

  let fetchEvents;

  if (!aflEventInDB) {
    const fromBlockHeight = events.priceChanged.blockHeightDefault;
    const toBlockHeight = fromBlockHeight + blockHeightRange;

    fetchEvents = await getEvents({
      eventName: events.priceChanged.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createAFLEvent({
      blockHeight: toBlockHeight,
      type: events.priceChanged.eventName,
    });

    if (!fetchEvents?.length) {
      return;
    }

    const promise = [];

    for (let i = 0; i < fetchEvents.length; i++) {
      promise.push(
        sendData({
          url: process.env.WEBHOOK_URL_LOCAL,
          data: {
            flowEventId: fetchEvents[i].type,
            blockEventData: fetchEvents[i].data,
          },
        })
      );
    }

    await Promise.all(promise);

    return;
  }

  const fromBlockHeight = aflEventInDB.blockHeight;
  const toBlockHeight = fromBlockHeight + blockHeightRange;

  fetchEvents = await getEvents({
    eventName: aflEventInDB.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateAFLEvent({
    blockHeight: toBlockHeight,
    type: aflEventInDB.type,
  });

  if (!fetchEvents?.length) {
    return;
  }

  const promise = [];

  for (let i = 0; i < fetchEvents.length; i++) {
    promise.push(
      sendData({
        url: process.env.WEBHOOK_URL_LOCAL,
        data: {
          flowEventId: fetchEvents[i].type,
          blockEventData: fetchEvents[i].data,
        },
      })
    );
  }

  await Promise.all(promise);

  return;
};