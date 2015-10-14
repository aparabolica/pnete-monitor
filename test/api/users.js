/*
 * Module dependencies
 */
var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../server/server.js'); //path to app.js or server.js
var request = require('supertest');
var helpers = require('../helpers');

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
    helpers.login(admin1, function(err, token){
      adminToken = token;
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
  });
});
