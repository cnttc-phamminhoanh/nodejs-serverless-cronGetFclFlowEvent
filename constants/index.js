const dotenv = require("dotenv");
dotenv.config();

const blockHeightRange = 249;

const events = {
  forSale: {
    eventName: process.env.FOR_SALE_EVENT_NAME,
    blockHeightDefault: Number(process.env.FOR_SALE_BLOCK_HEIGHT_DEFAULT)
  },
  saleCanceled: {
    eventName: process.env.SALE_CANCELED_EVENT_NAME,
    blockHeightDefault: Number(process.env.SALE_CANCELED_BLOCK_HEIGHT_DEFAULT)
  },
  tokenPurchased: {
    eventName: process.env.TOKEN_PURCHASED_EVENT_NAME,
    blockHeightDefault: Number(process.env.TOKEN_PURCHASED_BLOCK_HEIGHT_DEFAULT)
  },
  priceChanged: {
    eventName: process.env.PRICE_CHANGED_EVENT_NAME,
    blockHeightDefault: Number(process.env.PRICE_CHANGED_BLOCK_HEIGHT_DEFAULT)
  },
}

module.exports = {
  events,
  blockHeightRange
};