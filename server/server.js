var express = require('express');
var app = express();
var apiRouter = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
var authRouter = require('./auth/routes');


require('mongoose').connect(config.db.url);

require('./middleware/appMiddleware')(app);

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use(function(err, req, res, next) {
  if(err.name === 'UnauthorizedError')  {
    res.status(400).send('Invalid token');
  } else {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  }
});


module.exports = app;
