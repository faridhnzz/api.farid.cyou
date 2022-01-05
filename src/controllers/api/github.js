const axios = require('axios');
const etag = require('etag');
const { json } = require('../../utils/respone');

module.exports = async (req, res, next) => {
  try {
    const query = req.query.username;

    if (!query) {
      return res.status(404).json({ status: 'ERROR', message: 'Provide a using the ?username=' });
    }

    const URL = `https://luminabot.xyz/api/json/github?username=${encodeURIComponent(query)}`;
    let result = await axios.get(URL, {
      method: 'get',
      headers: {
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
