var app = require('../../server');
var request = require('supertest');
var expect = require('chai').expect;
var UserModel = require('./userModel');
require('colors');

describe('[USER]'.bold.green, function() {
  var user;
  var testData = {
    username: 'test'
  };

  beforeEach(function(done) {
    UserModel.collection.drop();
    request(app)
      .post('/api/users')
      .send(testData)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        user = res.body;
        done();
      });
  });

  describe('#get()'.cyan, function() {
    it('should get all users', function(done) {
      request(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect('Category-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('#post()'.cyan, function() {
    it('should create a new user', function(done) {
      request(app)
        .post('/api/users')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('username', testData.username);
          done();
        });
    });
  });

  describe('#get()'.cyan, function() {
    it('should get a specific user', function(done) {
      request(app)
        .get('/api/users/' + user._id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(user);
          done();
        });
    });
  });

  describe('#put()'.cyan, function() {
    it('should update a specific user', function(done) {
      var update = {
        username: 'updated username'
      };
      request(app)
        .put('/api/users/' + user._id)
        .send(update)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.property('username', update.username);
          done();
        });
    });
  });

  describe('#delete()'.cyan, function() {
    it('should delete a specific user', function(done) {
      request(app)
        .delete('/api/users/' + user._id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(user);
          done();
        });
    });
  });
});
