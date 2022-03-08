import express from 'express';
const route = express.Router();

import { github, instagram, vlive } from '../controllers/index.js';

/** GH */
route.get('/github', github.index);
route.get('/github/:username', github.github);
/** IG */
route.get('/instagram', instagram.index);
route.get('/instagram/:username', instagram.instagram);
/** Vlive */
route.get('/vlive', vlive.vlive);

export default route;
