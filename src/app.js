const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const Routes = require('./routes');
const httpHeader = require('./middleware/httpHeader');
const middlewares = require('./middleware/handler');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http header
app.disable('x-powered-by');
app.use(httpHeader.header);

// routes
app.use(Routes);

// error handler
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

/**
 * END
 */
module.exports = app;
