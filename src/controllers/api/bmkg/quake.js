const axios = require('axios');
const etag = require('etag');
const { json } = require('../../../utils/respone');

const autogempa = async (req, res, next) => {
  try {
    const URL = `https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`;
    let result = await axios.get(URL, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    const dataRaw = result.data;

    const data = {};

    for (const key in dataRaw.Infogempa.gempa) {
      if (key === 'Shakemap') {
        data[key.toLowerCase()] = `https://data.bmkg.go.id/DataMKG/TEWS/${dataRaw.Infogempa.gempa[key]}`;

        continue;
      }

      data[key.toLowerCase()] = dataRaw.Infogempa.gempa[key];
    }

    res.set('Etag', etag(data.datetime));
    return json(res, data);
  } catch (err) {
    next();
  }
};

/**
 * Gempa M 5.0+
 */

const gempaterkini = async (req, res, next) => {
  try {
    const URL = `https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json`;
    let result = await axios.get(URL, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    const data = result.data.Infogempa.gempa;
    // console.log(data);

    // res.set('Etag', etag(data.datetime));
    return json(res, data);
  } catch (err) {
    console.log(err);
    next();
  }
};

/**
 * Gempa Dirasakan
 */

const gempadirasakan = async (req, res, next) => {
  try {
    const URL = `https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json`;
    let result = await axios.get(URL, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    const data = result.data.Infogempa.gempa;

    // res.set('Etag', etag(data.datetime));
    return json(res, data);
  } catch (err) {
    next();
  }
};

/**
 * END
 */

module.exports = { autogempa, gempadirasakan, gempaterkini };
