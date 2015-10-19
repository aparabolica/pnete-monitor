/*
 * Module dependencies
 */
var async = require('async');
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
var admin1AccessToken;
var user1Org1;
var user1Org1AccessToken;

describe('Users endpoints', function() {


  before(function(doneBefore) {
    async.series([
      function (doneEach){
        helper.login(admin1, function(err, token){
          admin1AccessToken = token;
          doneEach(err);
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user1Org1 = usr;
          helper.login(user1Org1, function(err, token){
            user1Org1AccessToken = token;
            doneEach(err);
          });
        });
      }
    ], doneBefore);
  });

  describe('POST /organizations', function(){

    var payload = {
      name: 'Organization 1',
      description: 'Organization description'
    }

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/organizations')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny not admin', function(){
      it('should return 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/users')
          .set('Authorization', user1Org1AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('allow admin', function(){
      it('should return 200 and json', function(doneIt){
        request(app)
          .post(restApiRoot + '/organizations')
          .set('Authorization', admin1AccessToken)
          .send(payload)
          // .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('name', payload.name);
            body.should.have.property('description', payload.description);

            doneIt();
          })
      });
    });
  });
});
