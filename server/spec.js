var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;
require('colors');

describe('[LIONS]'.bold.green , function() {
  describe('#get()'.cyan, function() {
    it('should get all lions', function(done) {
      request(app)
        .get('/lions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.be.an('array');
          done()
        })
    })
  })

  describe('#post()'.cyan, function() {
    it('should create a lion', function(done) {
      lion = {
        name: 'Simba',
        age: 26,
        gender: 'male'
      }
      request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name', lion.name);
        expect(res.body).to.have.property('age', lion.age);
        expect(res.body).to.have.property('gender', lion.gender);
        done();
      })
    })
  })

  describe('#get()'.cyan, function() {
    it('should get a specific lion', function(done) {
      lion = {
        name: 'Simba',
        age: 26,
        gender: 'male'
      }
      request(app)
        .post('/lions')
        .send(lion)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          var lion = res.body;
          request(app)
          .get('/lions/' + lion.id)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.eql(lion);
            done();
          })
        })
    })
  })

  describe('#put()'.cyan, function() {
    it('should update a specific lion', function(done) {
      lion = {
        name: 'Simba',
        age: 26,
        gender: 'male'
      }
      request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        var lion = res.body
        var updatedLion = {
          name: 'Mufasa'
        }
        request(app)
          .put('/lions/' + lion.id)
          .send(updatedLion)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.have.property('name', updatedLion.name);
            done();
          })
      })
    })
  })

  describe('#delete()'.cyan, function() {
    it('should delete a specific lion', function(done) {
      lion = {
        name: 'Simba',
        age: 26,
        gender: 'male'
      }
      request(app)
        .post('/lions')
        .send(lion)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          var lion = res.body
          request(app)
            .delete('/lions/' + lion.id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.eql(lion);
              done()
            })
        })
    })
  })
});

describe('[TIGERS]'.bold.green, function() {
  describe('#get()'.cyan, function() {
    it('should get all tigers', function(done) {
      request(app)
        .get('/tigers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.be.an('array');
          done();
        })
    })
  })

  describe('#post()'.cyan, function() {
    it('should create a tiger', function(done) {
      tiger = {
        name: 'Tony',
        age: 5,
        gender: 'male'
      }
      request(app)
      .post('/tigers')
      .send(tiger)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.have.property('name', tiger.name);
        expect(res.body).to.have.property('age', tiger.age);
        expect(res.body).to.have.property('gender', tiger.gender);
        done()
      })
    })
  })

  describe('#get()'.cyan, function() {
    it('should get a specific tiger', function(done) {
      tiger = {
        name: 'Tony',
        age: 5,
        gender: 'male'
      }
      request(app)
      .post('/tigers')
      .send(tiger)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        var tiger = res.body;
        request(app)
        .get('/tigers/' + tiger.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(tiger);
          done();
        })
      })
    })
  })

  describe('#put()'.cyan, function() {
    it('should update a specific tiger', function(done) {
      tiger = {
        name: 'Tony',
        age: 5,
        gender: 'male'
      }
      request(app)
        .post('/tigers')
        .send(tiger)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          var tiger = res.body;
          var updatedTiger = {
            name: 'Barney'
          }
          request(app)
            .put('/tigers/' + tiger.id)
            .send(updatedTiger)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.have.property('name', updatedTiger.name);
              done();
            })
        })
    })
  })

  describe('#delete()'.cyan, function() {
    it('deletes a specific tiger', function(done) {
      tiger = {
        name: 'Tony',
        age: 5,
        gender: 'male'
      }
      request(app)
        .post('/tigers')
        .send(tiger)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          var tiger  = res.body;
          request(app)
            .delete('/tigers/' + tiger.id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.eql(tiger);
              done();
            })
        })
    })
  })

});