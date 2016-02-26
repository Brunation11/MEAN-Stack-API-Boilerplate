var express = require('express');
var router = express.Router();
var logger = require('../../util/logger');
var controller = require('./userController');

router.param('id', function(req, res, next, id) {
  controller.params(req, res, next, id);
});

router.route('/')
  .get(function(req, res, next) {
    controller.get(req, res, next);
  })
  .post(function(req, res, next) {
    controller.post(req, res, next);
  });

router.route('/:id')
  .get(function(req, res, next) {
    controller.getOne(req, res, next);
  })
  .put(function(req, res, next) {
    controller.put(req, res, next);
  })
  .delete(function(req, res, next) {
    controller.delete(req, res, next);
  });

  module.exports = router;