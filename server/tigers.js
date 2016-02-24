var express = require('express');
var tigerRouter = express.Router();

var tigers = [];
var id = 0;

var updatedId = function(req, res, next) {
  if(!req.body.id) {
    id++;
    req.body.id = id+'';
  }
  next();
};

tigerRouter.param('id', function(req, res, next, id) {
  var tiger = _.find(tigers, {id: id});
  if(tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send();
  }
});

tigerRouter.get('/', function(req, res) {
  res.json(tigers);
});

tigerRouter.post('/', updatedId, function(req, res) {
  var tiger = req.body;
  tigers.push(tiger);
  res.json(tiger);
});

tigerRouter.get('/:id', function(req, res) {
  var tiger = req.tiger;
  res.json(tiger||{});
});

tigerRouter.put('/:id', function(req, res) {
  var update = req.body;
  if(update.id) {
    delete update.id;
  }
  var tiger = _.find(tigers, {id: req.params.id});
  if(!tigers[tiger]) {
    res.send();
  } else {
    var updatedTiger = _.assign(tigers[tiger], update);
    res.json(updatedTiger);
  }
});

tigerRouter.delete('/:id', function(req, res) {
  var tiger = _.findIndex(tigers, {id: req.tiger.id});
  if(!tigers[tiger]) {
    res.send();
  } else {
  var deletedtiger = tigers[tiger];
  tigers.splice(tiger, 1);
  res.json(deletedTiger);
  }
});

module.exports = tigerRouter;