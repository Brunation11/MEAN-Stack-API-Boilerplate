var UserModel = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;

exports.params = function(req, res, next, id) {
  UserModel.findById(id)
    .select('-password')
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
    });
};

exports.get = function(req, res, next) {
  UserModel.find({})
    .select('-password')
    .populate('posts')
    .exec(function(err, users) {
      if (err) {
        next(err);
      } else {
        users = users.map(function(user) {
          return user.toJson();
        });
        res.json(users);
      }
    });
};

exports.getOne = function(req, res) {
  res.json(req.user.toJson());
};

exports.put = function(req, res, next) {
  var user = req.user;
  var update = req.body;
  _.merge(user, update);
  user.save(function(err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user.toJson());
    }
  });
};

exports.post = function(req, res, next) {
  var user = new UserModel(req.body);
  user.save(function(err, user) {
    if (err) {
      next(err);
    } else {
      var token = signToken(user._id);
      res.json({token: token});
    }
  });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user.toJson());
    }
  });
};

exports.me = function(req, res) {
  res.json(req.user.toJson());
};