var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');
var express = require('express');
var app = express();

var lionRouter = require('./lions');
var tigerRouter = require('./tigers');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

app.use(function(err, req, res, next) {
  if(err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

module.exports = app;