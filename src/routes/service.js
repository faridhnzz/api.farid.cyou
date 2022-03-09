import express from 'express';
const route = express.Router();
import * as redis from '../service/redis.js';

route.get('/redis/flushall', (req, res) => {
  try {
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    redis.flushall_manual();
    return res.status(200).send('Redis Flush-All Done');
  } catch (err) {
    console.log(err);
  }
});

export default route;
