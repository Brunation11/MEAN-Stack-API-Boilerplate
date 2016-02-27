var PostModel = require('./postModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  PostModel.findById(id)
    .populate('author categories')
    .exec(function(err, post) {
      if (err) {
        next(err);
      } else if (!post) {
        next(new Error('Post not found'));
      } else {
        req.post = post;
        next();
      }
    });
};

exports.get = function(req, res, next) {
  PostModel.find({})
    .populate('author categories')
    .exec(function(err, posts) {
      if (err) {
        next(err);
      } else {
        res.json(posts);
      }
    });
};

exports.getOne = function(req, res, next) {
  var post = req.post;
  res.json(post);
};

exports.put = function(req, res, next ) {
  var post = req.post;
  var update = req.body;
  _.merge(post, update);
  post.save(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  })
};

exports.post = function(req, res, next) {
  var post = new PostModel(req.body);
  post.save(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  })
};

exports.delete = function(req, res, next) {
  req.post.remove(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  })
};