import express from 'express';
const route = express.Router();

import { github, instagram, vlive, tiktok } from '../controllers/index.js';

/** GH */
route.get('/github', github.index);
route.get('/github/:username', github.github);
/** IG */
route.get('/instagram', instagram.index);
route.get('/instagram/:username', instagram.instagram);

export default route;
