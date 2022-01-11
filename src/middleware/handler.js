function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    'What!': err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞Pancakes and 🍑Peach' : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
