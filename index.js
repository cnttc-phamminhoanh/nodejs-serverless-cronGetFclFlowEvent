const dotenv = require("dotenv");
dotenv.config();
const fcl = require("@onflow/fcl");
const { send: transportGRPC } = require("@onflow/transport-grpc");
const { getEventsByRange, getLatestBlock } = require("./helpers/blockchain");
const {
  createEventBlockHeight,
  updateEventBlockHeight,
  getEventBlockHeight,
} = require("./helpers/eventBlockHeight");
const { connectDB } = require("./database");
const { events, stepSize } = require("./constants/index");
const { sendData } = require("./helpers/webhook");

module.exports.getForSaleEventHandler = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventBlockHeight = await getEventBlockHeight(events.forSale.eventName);

  if (!eventBlockHeight) {
    fromBlockHeight = events.forSale.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventId: events.forSale.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventBlockHeight({
      blockHeight: toBlockHeight,
      eventId: events.forSale.eventName,
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

  fromBlockHeight = eventBlockHeight.block_height + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventId:  eventBlockHeight.event_id,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventBlockHeight({
    blockHeight: toBlockHeight,
    eventId: eventBlockHeight.event_id,
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

module.exports.getTokenPurchasedEventHandler = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventBlockHeight = await getEventBlockHeight(
    events.tokenPurchased.eventName
  );

  if (!eventBlockHeight) {
    fromBlockHeight = events.tokenPurchased.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventId: events.tokenPurchased.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventBlockHeight({
      blockHeight: toBlockHeight,
      eventId: events.tokenPurchased.eventName,
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

  fromBlockHeight = eventBlockHeight.block_height + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventId:  eventBlockHeight.event_id,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventBlockHeight({
    blockHeight: toBlockHeight,
    eventId: eventBlockHeight.event_id,
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

module.exports.getSaleCanceledEventHandler = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventBlockHeight = await getEventBlockHeight(events.saleCanceled.eventName);

  if (!eventBlockHeight) {
    fromBlockHeight = events.saleCanceled.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventId: events.saleCanceled.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventBlockHeight({
      blockHeight: toBlockHeight,
      eventId: events.saleCanceled.eventName,
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

  fromBlockHeight = eventBlockHeight.block_height + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventId:  eventBlockHeight.event_id,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventBlockHeight({
    blockHeight: toBlockHeight,
    eventId: eventBlockHeight.event_id,
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

module.exports.getPriceChangedEventHandler = async function (event, context) {
  await connectDB();

  fcl.config({
    "accessNode.api": process.env.NODE_API,
    "sdk.transport": transportGRPC,
  });

  let fetchEvents, fromBlockHeight, toBlockHeight;

  const latestBlock = await getLatestBlock();

  const latestBlockHeight = latestBlock?.height;

  const eventBlockHeight = await getEventBlockHeight(events.priceChanged.eventName);

  if (!eventBlockHeight) {
    fromBlockHeight = events.priceChanged.blockHeightDefault;
    toBlockHeight =
      fromBlockHeight + stepSize < latestBlockHeight
        ? fromBlockHeight + stepSize
        : latestBlockHeight;

    fetchEvents = await getEventsByRange({
      eventId: events.priceChanged.eventName,
      fromBlockHeight,
      toBlockHeight,
    });

    await createEventBlockHeight({
      blockHeight: toBlockHeight,
      eventId: events.priceChanged.eventName,
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

  fromBlockHeight = eventBlockHeight.block_height + 1;
  toBlockHeight =
    fromBlockHeight + stepSize < latestBlockHeight
      ? fromBlockHeight + stepSize
      : latestBlockHeight;

  fetchEvents = await getEventsByRange({
    eventId:  eventBlockHeight.event_id,
    fromBlockHeight,
    toBlockHeight,
  });

  await updateEventBlockHeight({
    blockHeight: toBlockHeight,
    eventId: eventBlockHeight.event_id,
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
