const express = require('express');
const app = express.Router();
const Router = require('express-group-router');
const route = new Router();

const controllers = require('../controllers');

/**
 * Routes
 */
route.get('/', controllers.home);

route.group('/api', (router) => {
  router.get('/unplash', controllers.unplash_api);
  router.get('/github', controllers.github);
  router.get('/urban', controllers.urban);
  router.get('/wikipedia', controllers.wikipedia);
  router.get('/instagram', controllers.instagram);
  router.get('/translate', controllers.translate);
  router.get('/weather', controllers.weather);
  router.get('/bmkg-gempa', controllers.bmkg_gempa);
  return;
});

route.get('/api', (req, res) => {
  return res.redirect(301, '/');
});

route.get('/200', (req, res) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  return res.status(200).send('OK');
});

/**
 * END
 */
let listRoutes = route.init();
app.use(listRoutes);

module.exports = app;
