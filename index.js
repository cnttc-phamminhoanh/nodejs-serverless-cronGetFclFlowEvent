const dotenv = require("dotenv");
dotenv.config();
const fcl = require("@onflow/fcl");
const { send: transportGRPC } = require("@onflow/transport-grpc");
const {
  getEventsByRange,
  getLatestBlock,
} = require("./src/services/FCLFlowService");
const {
  createEventCursor,
  updateEventCursor,
  getEventCursor,
} = require("./src/services/eventCursorService");
const { connectDB } = require("./database");
const { events, stepSize } = require("./constants/index");
const { sendData } = require("./src/services/webhookSenderService");

module.exports.runCronJobGetEventForSale = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventCursor = await getEventCursor(events.forSale.eventName);

  if (!eventCursor) {
    fromBlockHeight = events.forSale.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventName: events.forSale.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventCursor({
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

  fromBlockHeight = eventCursor.blockHeight + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventName: eventCursor.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventCursor({
    blockHeight: toBlockHeight,
    type: eventCursor.type,
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

module.exports.runCronJobGetEventTokenPurchased = async function (
  event,
  context
) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventCursor = await getEventCursor(events.tokenPurchased.eventName);

  if (!eventCursor) {
    fromBlockHeight = events.tokenPurchased.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventName: events.tokenPurchased.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventCursor({
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

  fromBlockHeight = eventCursor.blockHeight + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventName: eventCursor.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventCursor({
    blockHeight: toBlockHeight,
    type: eventCursor.type,
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

module.exports.runCronJobGetEventSaleCanceled = async function (
  event,
  context
) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventCursor = await getEventCursor(events.saleCanceled.eventName);

  if (!eventCursor) {
    fromBlockHeight = events.saleCanceled.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventName: events.saleCanceled.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventCursor({
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

  fromBlockHeight = eventCursor.blockHeight + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventName: eventCursor.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventCursor({
    blockHeight: toBlockHeight,
    type: eventCursor.type,
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

module.exports.runCronJobGetEventPriceChanged = async function (
  event,
  context
) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventCursor = await getEventCursor(events.priceChanged.eventName);

  if (!eventCursor) {
    fromBlockHeight = events.priceChanged.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventName: events.priceChanged.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventCursor({
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

  fromBlockHeight = eventCursor.blockHeight + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventName: eventCursor.type,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventCursor({
    blockHeight: toBlockHeight,
    type: eventCursor.type,
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
