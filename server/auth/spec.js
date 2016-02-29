var app = require('../server');
var request = require('supertest');
var expect = require('chai').expect;
var UserModel = require('../api/user/userModel');

describe('[AUTHENTICATION]', function() {
  var user;
  userData = {
    username: 'test',
    password: 'password'
  };

  beforeEach(function(done) {
    UserModel.collection.drop();
    request(app)
      .post('/api/users')
      .send(userData)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        user = res.body;
        done();
      });
  });

  it('should successfully sign in with valid username and password', function(done) {
    request(app)
      .post('/auth/signin')
      .send(userData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.eql(user);
        done();
      });
  });
});