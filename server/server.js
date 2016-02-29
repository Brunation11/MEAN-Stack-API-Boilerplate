var express = require('express');
var app = express();
var apiRouter = require('./api/api');
var config = require('./config/config');
var err = require('./middleware/err');

require('mongoose').connect(config.db.url);

require('./middleware/appMiddleware')(app);

app.use('/api', apiRouter);

app.use(err());

module.exports = app;
