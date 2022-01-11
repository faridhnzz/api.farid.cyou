const axios = require('axios');
const xmlJs = require('xml-js');
const etag = require('etag');
const { json, errorJson } = require('../../../utils/respone');
const toUpperFirstLetterWords = require('./utils/toUpperFirstLetterWords');
const jsonWeather = require('./utils/jsonWeather');

const getByProvince = async (req, res, next) => {
  const { province } = req.params;

  try {
    const URL = `https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-${toUpperFirstLetterWords(province)}.xml`;
    let result = await axios.get(URL, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    const weathers = xmlJs.xml2js(result.data, { compact: true, spaces: 2 });
    const dataWeathers = jsonWeather(weathers);

    res.set('Etag', result.headers['etag'] || etag(URL));
    return json(res, dataWeathers);
  } catch (err) {
    console.log(err);
    next();
  }
};

/**
 * get by city
 */

const getByCity = async (req, res, next) => {
  const { province, city } = req.params;

  try {
    const URL = `https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-${toUpperFirstLetterWords(province)}.xml`;
    let result = await axios.get(URL, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    const weathers = xmlJs.xml2js(result.data, { compact: true, spaces: 2 });
    const dataWeathers = jsonWeather(weathers);

    const weatherByCity = dataWeathers.areas.find((area) => area.description == toUpperFirstLetterWords(city, '-', ' '));

    if (!weatherByCity) {
      return errorJson(res, 'Not Found');
    }

    res.set('Etag', result.headers['etag'] || etag(URL));
    return json(res, weatherByCity);
  } catch (err) {
    console.log(err);
    next();
  }
};

/**
 * END
 */
module.exports = { getByProvince, getByCity };
