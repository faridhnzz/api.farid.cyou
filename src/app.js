import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import responseTime from 'response-time';
import requestIp from 'request-ip';
const app = express();

import requestID from './middleware/request-id.js';
import { notFound, errorHandler } from './middleware/handler.js';

import IndexRoute from './routes/index.js';
import PublicRoute from './routes/public.js';
import PrivateRoute from './routes/private.js';
import ServiceRoute from './routes/service.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestIp.mw());

/** Headers */
app.use(cors());
app.set('etag', 'strong');
app.disable('x-powered-by');
app.use(responseTime());
app.use(requestID());

/** Routes */
app.use(IndexRoute);
app.use('/v1', PublicRoute);
app.use('/pvt', PrivateRoute);
app.use('/svc', ServiceRoute);

/** Handler */
app.use(notFound);
app.use(errorHandler);

/**
 * END
 */
export default app;
