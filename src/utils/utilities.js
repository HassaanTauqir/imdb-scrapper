const axios = require('axios');

const searchPage = async url => {
    try {
      return axios.get(url);
    } catch (error) {
      console.log(error);
    }
  };

const prettify = (data) => JSON.stringify(data, null, 2);

async function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

module.exports = {
    prettify,
    searchPage,
    sleep,
}