import express from 'express';
const route = express.Router();

import { home } from '../controllers/index.js';

route.get('/', home);

route.get('/200', (req, res) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  return res.status(200).send('OK '.repeat(1813));
});

export default route;
