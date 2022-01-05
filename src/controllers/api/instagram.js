const Insta = require('scraper-instagram');
const etag = require('etag');
const { json } = require('../../utils/respone');

module.exports = async (req, res, next) => {
  try {
    const sessionid = encodeURIComponent(req.query.sessionid);
    const username = encodeURIComponent(req.query.username);

    if (!sessionid) {
      return res.status(404).json({ status: 'ERROR - {?sessionid=}', message: 'Please specify a Session-Id for authentication to allow you to access your private profile as long as you follow it.' });
    }
    if (!username) {
      return res.status(404).json({ status: 'ERROR - {?username=}', message: 'Please specify a Instagram username to search!' });
    }

    // Authentication
    const InstaClient = new Insta();
    InstaClient.authBySessionId(`${sessionid}`).catch((err) => console.error(err));

    // Get Profile
    let result = await InstaClient.getProfile(`${username}`);

    res.set('Etag', etag(result.id));
    return json(res, result);
  } catch (error) {
    console.log(error);
    next();
  }
};
