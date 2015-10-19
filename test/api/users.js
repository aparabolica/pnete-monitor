/*
 * Module dependencies
 */
var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../server/server.js'); //path to app.js or server.js
var request = require('supertest');
var helper = require('../helper');

/*
 * Config
 */
var restApiRoot = app.settings.restApiRoot;

/*
 * Test data
 */
var admin1 = app.settings.defaultAdmin;
var admin1Token;
var org1Member1 = {
  email: 'user1@org1.org',
  password: 'mypass'
}


describe('Users endpoints', function() {


  before(function(doneBefore) {
    helper.login(admin1, function(err, token){
      admin1Token = token;
      doneBefore(err);
    });
  });

  describe('POST /users', function(){
    context('deny anonymous', function(){
      it('should return 401', function(doneIt){

        var payload = {
          email: 'theveryfirstuser@email.com'
        }

        request(app)
          .post(restApiRoot + '/users')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);

      });
    });

    context('allow admin', function(){
      it('should return 200', function(doneIt){

        var payload = {
          email: 'theveryfirstuser@email.com'
        }

        request(app)
          .post(restApiRoot + '/users')
          .set('Authorization', admin1Token)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(onResponse);

        /* Verify response */
        function onResponse(err, res) {
          if (err) doneIt(err);

          var body = res.body;

          /* User basic info */
          body.should.have.property('id');
          body.should.have.property('email', payload.email);
          body.should.not.have.property('password');

          org1Member1 = body;

          doneIt();
        }
      });
    });
  });
});
