var app = require('../../server');
var request = require('supertest');
var expect = require('chai').expect;
var CategoryModel = require('./categoryModel');
require('colors');

describe('[CATEGORY]'.bold.green, function() {
  var category = {
    name: 'test'
  };

  beforeEach(function(done) {
    CategoryModel.collection.drop();
    done();
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
        .send(category)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', category.name);
          done();
        });
    });
  });

  describe('#get()'.cyan, function() {
    it('should get a specific category', function(done) {
      request(app)
        .post('/api/categories')
        .send(category)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          var category = res.body;
          request(app)
            .get('/api/categories/' + category._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.eql(category);
              done();
            });
        });
    });
  });

  describe('#put()'.cyan, function() {
    it('should update a specific category', function(done) {
      request(app)
        .post('/api/categories')
        .send(category)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          var category = res.body;
          var update  = {
            name: 'updated test'
          };
          request(app)
            .put('/api/categories/' + category._id)
            .send(update)
            .expect('Category-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.have.property('name', update.name);
              done();
            });
        });
    });
  });

  describe('#delete()'.cyan, function() {
    it('should delete a specific category', function(done) {
      request(app)
        .post('/api/categories')
        .send(category)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          var category = res.body;
          request(app)
            .delete('/api/categories/' + category._id)
            .expect('Category-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.eql(category);
              done();
            });
        });
    });
  });
});