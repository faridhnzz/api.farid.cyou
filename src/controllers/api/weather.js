const fxparser = require('fast-xml-parser');
const axios = require('axios');
// const weather = require('msn-weather').default;
const etag = require('etag');
const { json } = require('../../utils/respone');
const textIDs = require('../../../data/textIDs');

module.exports = async (req, res, next) => {
  try {
    // const location = req.query.location;
    const degreeType = req.query.degree || 'C';
    // const language = req.query.lang;

    // if (!location) {
    //   location = 'Semarang';
    // }
    // if (degreeType != 'C' && degreeType != 'F') {
    //   degreeType = 'C';
    // }
    // if (!language) {
    //   language = 'en';
    // }

    // const URL = `https://weather.service.msn.com/find.aspx?src=msn&weadegreetype=${degreeType}&culture=${language}&weasearchstr=${encodeURIComponent(location)}`;
    const URL = `https://weather.service.msn.com/find.aspx?src=msn&weadegreetype=C&culture=en&weasearchstr=Semarang`;
    const response = await axios.get(URL, {
      method: 'get',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    const parser = new fxparser.XMLParser();
    const jsonData = parser.parse(response.data, {
      attributeNamePrefix: '',
      ignoreAttributes: false,
      ignoreNameSpace: true,
      trimValues: true,
    });

    if (!jsonData || !jsonData.weatherdata || !jsonData.weatherdata.weather) {
      throw new Error('Bad response: Failed to parse response body');
    }

    const data = jsonData.weatherdata.weather[0];

    if (!data) {
      throw new Error('Bad response: Failed to receive weather data');
    }

    const current = data.current;
    const forecasts = [];

    for (let i = 1; i < data.forecast.length; i++) {
      const forecast = data.forecast[i];

      //   forecasts.push({
      //     date: forecast.date[0],
      //     day: forecast.day[0],
      //     temperature: {
      //       low: forecast.low[0] + `°${degreeType}`,
      //       high: forecast.high[0] + `°${degreeType}`,
      //     },
      //     sky: {
      //       code: textIDs[forecast.skycodeday[0]],
      //       text: forecast.skytextday[0],
      //     },
      //     precip: forecast.precip[0] + '%',
      //   });
    }

    const weather = {
      current: {
        date: current.date,
        day: current.day,
        temperature: current.temperature + `°${degreeType}`,
        sky: {
          code: textIDs[current.skycode],
          text: current.skytext,
        },
        observation: {
          time: current.observationtime,
          point: current.observationpoint,
        },
        feelsLike: current.feelslike + `°${degreeType}`,
        humidity: current.humidity + '%',
        wind: {
          display: current.winddisplay,
          speed: current.windspeed,
        },
      },
      forecasts,
    };

    return json(res, weather);
  } catch (err) {
    console.log(err);
    next();
  }
};

// Otomatis
// module.exports = async (req, res, next) => {
//   try {
//     const loc = req.query.location;
//     const degreeType = req.query.degree;

//     let result = await weather.search({
//       location: loc,
//       language: 'en',
//       degreeType: degreeType.toUpperCase(),
//     });

//     console.log(result);
//     return json(res, result);
//   } catch {}
// };
