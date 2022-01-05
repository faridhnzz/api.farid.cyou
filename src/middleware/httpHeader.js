let addHeaders = {
  'X-powered-by': 'api.farid.cyou',
};

let removeHeader = ('apicache-store', 'apicache-version');

let xPowered = 'x-powered-by';

function header(req, res, next) {
  res.header(addHeaders);
  res.removeHeader(removeHeader);
  next();
}

module.exports = {
  xPowered,
  header,
};
