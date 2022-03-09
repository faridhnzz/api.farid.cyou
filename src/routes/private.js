import express from 'express';
const route = express.Router();

import { vlive, tiktok } from '../controllers/index.js';

/** Vlive */
route.get('/vlive', vlive.vlive);
/** TikTok */
route.get('/tiktok', tiktok.tiktok);

export default route;
