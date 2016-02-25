var express = require('express');
var app = express();
var apiRouter = require('./api/api');
var err = require('./middleware/err');

require('./middleware/appMiddleware')(app);

app.use('/api', apiRouter);

app.use(err());

module.exports = app;
