var CategoryModel = require('./categoryModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  CategoryModel.findById(id, function(err, category) {
    if (err) {
      next(err);
    } else if (!category) {
      next(new Error('Category not found'));
    } else {
      req.category = category;
      next();
    }
  });
};

exports.get = function(req, res, next) {
  CategoryModel.find({}, function(err, categories) {
    if (err) {
      next(err);
    } else {
      res.json(categories);
    }
  });
};

exports.getOne = function(req, res, next) {
  var category = req.category;
  res.json(category);
};

exports.put = function(req, res, next) {
  var category = req.category;
  var update = req.body;
  _.merge(category, update);
  category.save(function(err, category) {
    if (err) {
      next(err);
    } else {
      res.json(category);
    }
  });
};

exports.post = function(req, res, next) {
  var category = new CategoryModel(req.body);
  category.save(function(err, category) {
    if (err) {
      next(err);
    } else {
      res.json(category);
    }
  });
};

exports.delete = function(req, res, next) {
  req.category.remove(function(err, category) {
    if (err) {
      next(err);
    } else {
      res.json(category);
    }
  });
};