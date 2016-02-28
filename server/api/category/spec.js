var app = require('../../server');
var request = require('supertest');
var expect = require('chai').expect;
var CategoryModel = require('./categoryModel');
require('colors');

describe('[CATEGORY]'.bold.green, function() {
  var category;
  var testData = {
    name: 'test'
  };

  beforeEach(function(done) {
    CategoryModel.collection.drop();
    request(app)
      .post('/api/categories')
      .send(testData)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        category = res.body;
        done();
      });
  });

  describe('#get()'.cyan, function() {
    it('should get all categories', function(done) {
      request(app)
        .get('/api/categories')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('#post()'.cyan, function() {
    it('should create a new category', function(done) {
      request(app)
        .post('/api/categories')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', testData.name);
          done();
        });
    });
  });

  describe('#get()'.cyan, function() {
    it('should get a specific category', function(done) {
      request(app)
        .get('/api/categories/' + category._id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(category);
          done();
        });
    });
  });

  describe('#put()'.cyan, function() {
    it('should update a specific category', function(done) {
      var update  = {
        name: 'updated test'
      };
      request(app)
        .put('/api/categories/' + category._id)
        .send(update)
        .set('Accept', 'application/json')
        .expect('Category-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.property('name', update.name);
          done();
        });
    });
  });

  describe('#delete()'.cyan, function() {
    it('should delete a specific category', function(done) {
      request(app)
        .delete('/api/categories/' + category._id)
        .set('Accept', 'application/json')
        .expect('Category-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(category);
          done();
        });
    });
  });
});