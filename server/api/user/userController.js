var UserModel = require('./userModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  UserModel.findById(id)
    .populate('posts')
    .exec(function(err, user) {
      if (err) {
        next(err);
      } else if (!user) {
        next(new Error('User not found'));
      } else {
        req.user = user;
        next();
      }
    })
};

exports.get = function(req, res, next) {
  UserModel.find({})
    .populate('posts')
    .exec(function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json(users);
      }
    })
};

exports.getOne = function(req, res, next) {
  var user = req.user;
  res.json(user);
};

exports.put = function(req, res, next) {
  var user = req.user;
  var update = req.body;
  _.merge(user, update);
  user.save(function(err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  })
};

exports.post = function(req, res, next) {
  var user = new PostModel(req.body);
  user.save(function(err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  })
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  })
};