const qs = require("qs");
const axios = require('axios')

async function sendData(params) {
  try {
    const { url, data } = params;

    const { flowEventId, blockEventData } = params.data;

    if (!url || !data) {
      throw {
        code: 400,
        message: "Invalid params",
      };
    }

    if (!flowEventId || !flowEventId) {
      throw {
        code: 400,
        message: "Invalid data",
      };
    }

    if (!blockEventData.owner || !blockEventData.id) {
      throw {
        code: 400,
        message: "invalid blockEventData",
      };
    }

    const payload = qs.stringify(data);

    const response = await axios.post(url, payload, {
      "Content-Type": "application/json",
    });

    return response.data;
  } catch (error) {
    console.log(`* Function sendData error: ${JSON.stringify(error)}`);
  }
}

module.exports = {
  sendData,
};
