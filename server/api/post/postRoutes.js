var express = require('express');
var router = express.Router();
var logger = require('../../util/logger');

router.route('/')
  .get(function(req, res, next) {
    logger.log('Hey from post!!');
    return next(new Error('test error'));
    res.send({ok: true});
  })
  .post(function(req, res) {

  });

router.route('/:id')
  .get(function(req, res) {

  })
  .put(function(req, res) {

  })
  .delete(function(req, res) {

  });

  module.exports = router;