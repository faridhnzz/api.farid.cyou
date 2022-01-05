require('dotenv').config();
const axios = require('axios');
const url = require('url');
const { json } = require('../../utils/respone');

module.exports = async (req, res, next) => {
  try {
    const params = new URLSearchParams(url.parse(req.url, true).query);

    const URL = `https://api.unsplash.com/photos/random?${params}`;
    let result = await axios.get(URL, {
      method: 'get',
      headers: {
        Authorization: `Client-ID ${process.env.API_UNSPLASH_KEY}`,
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    res.set('Etag', result.headers['etag'] || etag(URL));
    return json(res, result.data);
  } catch (err) {
    console.log(err);
    next();
  }
};
